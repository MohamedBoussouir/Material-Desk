const Account = require('../models/Account');
const { verifyToken, generateToken } = require('../utils/jwt.util');
const bcrypt = require('bcrypt');

// -------------------------------------------------------------------------register
async function register(req, res) {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Veuillez fournir un email et un mot de passe.' });
        }
        const existingUser = await Account.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAccount = new Account({
            email,
            password: hashedPassword,
            role: role || 'member'
        });
        await newAccount.save();

        let Token = generateToken({
            id: newAccount._id,
            email: newAccount.email,
            role: newAccount.role,
        })
        return res.status(201).json({
            message: 'Compte créé avec succès !',
            user: {
                id: newAccount._id,
                email: newAccount.email,
                role: newAccount.role,
                Token: Token
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erreur interne du serveur.' + error });
    }
}



// -------------------------------------------------------------------------login

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Veuillez fournir un email et un mot de passe.' });
        }

        const user = await Account.findOne({ email });


        const isPasswordValid = await bcrypt.compare(password, user.password);


        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
        }

        const token = generateToken({ userId: user._id, role: user.role });

        return res.status(200).json({
            message: 'Connexion réussie !',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        return res.status(500).json({ error: 'Erreur interne du serveur.' + error });
    }
}

module.exports = {
    register, login
}