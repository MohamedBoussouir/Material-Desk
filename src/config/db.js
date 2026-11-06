const mongoose = require('mongoose');

const uri = "mongodb://127.0.0.1:27017/Material-Desk";

const connectDB = () => {
  mongoose.connect(uri)
    .then(() => {
      console.log('Connexion à la base de données réussie avec succès !');
    })
    .catch((error) => {
      console.error('Erreur lors de la connexion à la base de données :', error);
    });
}




module.exports = connectDB