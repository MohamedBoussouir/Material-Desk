const equipmentRepository = require('../repositories/equipment.repository');

async function getAllEquipments(req, res, next) {
    try {
        const filter = {};
        filter.isArchived = false;

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const equipments = await equipmentRepository.findAll(filter);
        return res.status(200).json(equipments);
    } catch (error) {
        next(error);
    }
}

async function getEquipmentById(req, res, next) {
    try {
        const equipment = await equipmentRepository.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({ error: 'Équipement non trouvé' });
        }
        if (equipment.isArchived) {
            return res.status(404).json({ error: 'Équipement archivé' });
        }
        return res.status(200).json(equipment);
    } catch (error) {
        next(error);
    }
}

async function createEquipment(req, res, next) {
    try {
        const savedEquipment = await equipmentRepository.create(req.body);

        return res.status(201).json({
            message: 'Équipement créé avec succès !',
            equipment: savedEquipment
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Un équipement avec ce code existe déjà.' });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        next(error);
    }
}

async function updateEquipment(req, res, next) {
    try {
        const updated = await equipmentRepository.updateById(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Équipement non trouvé' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

async function deleteEquipment(req, res, next) {
    try {
        const deleted = await equipmentRepository.deleteById(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Équipement non trouvé' });
        }
        return res.status(200).json({ message: 'Équipement supprimé avec succès' });
    } catch (error) {
        next(error);
    }
}

async function getEquipmentStats(req, res, next) {
    try {
        const count = await equipmentRepository.countDocuments({ isArchived: false });
        return res.status(200).json({ count });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllEquipments,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getEquipmentStats
};