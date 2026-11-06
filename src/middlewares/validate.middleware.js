const Joi = require('joi');

const equipmentValidationSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Le nom est obligatoire.',
        'any.required': 'Le nom est obligatoire.'
    }),
    category: Joi.string().valid('video', 'audio', 'informatique').required().messages({
        'any.only': 'Catégorie invalide (video, audio, informatique).',
        'any.required': 'La catégorie est obligatoire.'
    }),
    serialNumber: Joi.string().trim().required().messages({
        'string.empty': 'Le numéro de série est obligatoire.',
        'any.required': 'Le numéro de série est obligatoire.'
    }),
    status: Joi.string().required().messages({
        'any.required': 'Le statut est obligatoire.'
    }),
    dailyLateFeeCents: Joi.number().integer().min(0).required().messages({
        'number.base': 'Le tarif journalier doit être un nombre.',
        'number.integer': 'Le tarif journalier doit être un nombre entier.',
        'number.min': 'Le tarif journalier doit être positif ou nul.',
        'any.required': 'Le tarif journalier est obligatoire.'
    })
}).options({ stripUnknown: true });
function validateCreateEquipment(req, res, next) {
    const { error, value } = equipmentValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            error: error.details.map(detail => detail.message).join(', ')
        });
    }


    req.body = value;
    next();
}

module.exports = { validateCreateEquipment };