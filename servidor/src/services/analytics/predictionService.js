const tf = require('@tensorflow/tfjs-node');

// Función simple para calcular el score de usabilidad basado en métricas
const predictUsability = async (analytics) => {
    try {
        console.log('Calculando score de usabilidad para analytics:', analytics);
        
        // Métricas básicas
        const loginCount = analytics.metrics.loginCount;
        const errorRate = analytics.metrics.errorRate;
        const featureUsage = Object.keys(analytics.metrics.featureUsage).length;
        
        // Fórmula simple para el score
        // Score = (loginCount * 0.3 + featureUsage * 0.4 + (1 - errorRate) * 0.3)
        const score = Math.min(1, Math.max(0, 
            (loginCount * 0.3) + 
            (featureUsage * 0.4) + 
            ((1 - errorRate) * 0.3)
        ));
        
        console.log('Score calculado:', score);
        return score;
    } catch (error) {
        console.error('Error en predictUsability:', error);
        return 0.5; // Valor por defecto en caso de error
    }
};

module.exports = {
    predictUsability
}; 