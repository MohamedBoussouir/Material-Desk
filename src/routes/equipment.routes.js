const express = require('express');
const router = express.Router();


const authenticate  = require('../middlewares/authenticate');
const { requireRole } = require('../middlewares/require-role');
const { validateCreateEquipment } = require('../middlewares/validate.middleware');
const { getAllEquipments, getEquipmentStats, getEquipmentById, createEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipment.controller');

router.get('/', getAllEquipments);
router.get('/stats', getEquipmentStats);
router.get('/:id', getEquipmentById);

router.post('/', authenticate, requireRole(['admin']), validateCreateEquipment, createEquipment);
router.put('/:id', authenticate, requireRole(['admin']), updateEquipment);
router.delete('/:id', authenticate, deleteEquipment);

module.exports = router;