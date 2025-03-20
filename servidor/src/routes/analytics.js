const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/auth');
const { trackUserAction, getUserUsabilityScore } = require('../services/analytics/trackingService');

// Ruta para tracking de acciones del usuario
router.post('/track', checkAuth, async (req, res) => {
    try {
        const { action, data } = req.body;
        const userId = req.user.id;

        await trackUserAction(userId, action, data);
        res.json({ message: 'Acción registrada correctamente' });
    } catch (error) {
        console.error('Error en tracking:', error);
        res.status(500).json({ message: 'Error al registrar la acción' });
    }
});

// Ruta para obtener el score de usabilidad
router.get('/usability-score', checkAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const score = await getUserUsabilityScore(userId);
        res.json({ score });
    } catch (error) {
        console.error('Error al obtener score:', error);
        res.status(500).json({ message: 'Error al obtener el score de usabilidad' });
    }
});

module.exports = router; 