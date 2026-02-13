const ACTIVITIES_KEY = 'medcare_activities';

export const activityService = {
    getAll: () => {
        try {
            const data = localStorage.getItem(ACTIVITIES_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error fetching activities:', error);
            return [];
        }
    },

    log: (action, description, user = 'Sistema') => {
        try {
            const activities = activityService.getAll();
            const newActivity = {
                id: Date.now(),
                action,
                description,
                user,
                timestamp: new Date().toISOString()
            };
            // Keep only last 100 activities
            const updatedActivities = [newActivity, ...activities].slice(0, 100);
            localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updatedActivities));
            return newActivity;
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    },

    clear: () => {
        localStorage.removeItem(ACTIVITIES_KEY);
    }
};
