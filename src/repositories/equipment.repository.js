const Equipment = require('../models/Equipment');

class EquipmentRepository {
    async create(equipmentData) {
        const equipment = new Equipment(equipmentData);
        return await equipment.save();
    }

    async findAll(filter = {}) {
        return await Equipment.find(filter);
    }

    async findById(id) {
        return await Equipment.findById(id);
    }

    async updateById(id, updateData) {
        return await Equipment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async deleteById(id) {
        return await Equipment.findByIdAndDelete(id);
    }

    async countDocuments(filter = {}) {
        return await Equipment.countDocuments(filter);
    }
}

module.exports = new EquipmentRepository();