const tf = require('@tensorflow/tfjs');

class PredictionService {
    constructor() {
        this.model = null;
        this.isTraining = false;
    }

    async trainModel(userData) {
        if (this.isTraining) {
            throw new Error('El modelo ya está en entrenamiento');
        }

        try {
            this.isTraining = true;

            // Preparar datos de entrenamiento
            const features = userData.map(user => [
                user.loginCount,
                user.errorRate,
                user.featureUsage.length
            ]);
            const labels = userData.map(user => user.usabilityScore);

            // Crear y compilar el modelo
            this.model = tf.sequential({
                layers: [
                    tf.layers.dense({ inputShape: [3], units: 8, activation: 'relu' }),
                    tf.layers.dense({ units: 4, activation: 'relu' }),
                    tf.layers.dense({ units: 1 })
                ]
            });

            this.model.compile({
                optimizer: tf.train.adam(0.001),
                loss: 'meanSquaredError',
                metrics: ['mse']
            });

            // Convertir datos a tensores
            const xs = tf.tensor2d(features);
            const ys = tf.tensor2d(labels, [labels.length, 1]);

            // Entrenar el modelo
            await this.model.fit(xs, ys, {
                epochs: 100,
                batchSize: 32,
                validationSplit: 0.2,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        console.log(`Epoch ${epoch + 1} of 100`);
                        console.log(`Loss: ${logs.loss}`);
                    }
                }
            });

            // Liberar memoria
            xs.dispose();
            ys.dispose();

            return { success: true, message: 'Modelo entrenado exitosamente' };
        } catch (error) {
            console.error('Error al entrenar el modelo:', error);
            throw error;
        } finally {
            this.isTraining = false;
        }
    }

    async predictUsability(userAnalytics) {
        if (!this.model) {
            throw new Error('El modelo no está entrenado');
        }

        try {
            // Preparar datos de entrada
            const input = tf.tensor2d([[
                userAnalytics.loginCount,
                userAnalytics.errorRate,
                userAnalytics.featureUsage.length
            ]]);

            // Realizar predicción
            const prediction = this.model.predict(input);
            const score = await prediction.data();

            // Liberar memoria
            input.dispose();
            prediction.dispose();

            return {
                score: score[0],
                confidence: this.calculateConfidence(userAnalytics)
            };
        } catch (error) {
            console.error('Error al realizar predicción:', error);
            throw error;
        }
    }

    calculateConfidence(userAnalytics) {
        // Calcular confianza basada en la cantidad de datos disponibles
        const totalFeatures = 10; // Número total de características posibles
        const availableFeatures = Object.keys(userAnalytics).length;
        return Math.min(availableFeatures / totalFeatures, 1);
    }

    getRecommendations(userAnalytics) {
        const recommendations = [];

        // Recomendaciones basadas en métricas
        if (userAnalytics.errorRate > 0.1) {
            recommendations.push({
                type: 'error',
                message: 'Considera revisar las acciones que causan errores frecuentes',
                priority: 'high'
            });
        }

        if (userAnalytics.featureUsage.length < 5) {
            recommendations.push({
                type: 'usage',
                message: 'Podrías explorar más funcionalidades del sistema',
                priority: 'medium'
            });
        }

        if (userAnalytics.sessionDuration < 300) { // menos de 5 minutos
            recommendations.push({
                type: 'engagement',
                message: 'Las sesiones son muy cortas, considera revisar la usabilidad',
                priority: 'medium'
            });
        }

        return recommendations;
    }
}

module.exports = new PredictionService(); 