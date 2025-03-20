import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '../../config/axios';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics debe ser usado dentro de un AnalyticsProvider');
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const [userExperience, setUserExperience] = useState({
        showTutorials: false,
        showTooltips: false,
        showHelp: false,
        adaptiveInterface: false
    });

    const trackUserAction = async (action, data) => {
        try {
            await axiosClient.post('/api/analytics/track', {
                action,
                data,
                timestamp: new Date()
            });
        } catch (error) {
            console.error('Error tracking user action:', error);
        }
    };

    const getUserUsabilityScore = async () => {
        try {
            const response = await axiosClient.get('/api/analytics/usability-score');
            return response.data.score;
        } catch (error) {
            console.error('Error getting usability score:', error);
            return 0.5; // Valor por defecto
        }
    };

    const adaptInterface = async (userId) => {
        try {
            const prediction = await getUserUsabilityScore();
            setUserExperience({
                showTutorials: prediction < 0.3,
                showTooltips: prediction < 0.5,
                showHelp: prediction < 0.7,
                adaptiveInterface: true
            });
        } catch (error) {
            console.error('Error adapting interface:', error);
        }
    };

    return (
        <AnalyticsContext.Provider value={{
            userExperience,
            trackUserAction,
            getUserUsabilityScore,
            adaptInterface
        }}>
            {children}
        </AnalyticsContext.Provider>
    );
}; 