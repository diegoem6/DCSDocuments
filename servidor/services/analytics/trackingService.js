const UserAnalytics = require('../../models/UserAnalytics');
const predictionService = require('./predictionService');

const trackUserAction = async (userId, action, data) => {
    try {
        console.log('Iniciando trackUserAction:', { userId, action, data });
        
        let analytics = await UserAnalytics.findOne({ userId });
        console.log('Analytics encontrado:', analytics ? 'Sí' : 'No');
        
        if (!analytics) {
            console.log('Creando nuevo registro de analytics para usuario:', userId);
            analytics = new UserAnalytics({
                userId,
                actions: [],
                metrics: {
                    loginCount: 0,
                    sessionDuration: 0,
                    errorRate: 0,
                    featureUsage: {}
                }
            });
        }

        // Registrar la acción
        console.log('Registrando acción:', action);
        analytics.actions.push({
            action,
            data,
            timestamp: new Date()
        });

        // Actualizar métricas
        if (action === 'login') {
            console.log('Actualizando métricas de login');
            analytics.metrics.loginCount += 1;
        } else if (action === 'login_error') {
            console.log('Actualizando métricas de error de login');
            analytics.metrics.errorRate += 1;
        } else if (action.startsWith('feature_')) {
            const feature = action.replace('feature_', '');
            console.log('Actualizando métricas de feature:', feature);
            analytics.metrics.featureUsage[feature] = (analytics.metrics.featureUsage[feature] || 0) + 1;
        }

        console.log('Guardando analytics actualizado');
        await analytics.save();
        console.log('Analytics guardado exitosamente');
    } catch (error) {
        console.error('Error en trackUserAction:', error);
        throw error;
    }
};

const getUserUsabilityScore = async (userId) => {
    try {
        console.log('Obteniendo score de usabilidad para usuario:', userId);
        const analytics = await UserAnalytics.findOne({ userId });
        
        if (!analytics) {
            console.log('No se encontró analytics para el usuario, retornando valor por defecto');
            return { score: 0.5, confidence: 0 }; // Valor por defecto para usuarios nuevos
        }

        // Obtener predicción del modelo
        console.log('Calculando score de usabilidad');
        const prediction = await predictionService.predictUsability(analytics.metrics);
        console.log('Score calculado:', prediction);
        return prediction;
    } catch (error) {
        console.error('Error en getUserUsabilityScore:', error);
        return { score: 0.5, confidence: 0 }; // Valor por defecto en caso de error
    }
};

module.exports = {
    trackUserAction,
    getUserUsabilityScore
}; 