const NOTIFICATIONS_KEY = 'medcare_notifications';

export const notificationService = {
    getAll: () => {
        try {
            const data = localStorage.getItem(NOTIFICATIONS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return [];
        }
    },

    getUnreadCount: () => {
        const notifications = notificationService.getAll();
        return notifications.filter(n => !n.read).length;
    },

    add: (title, message, type = 'info') => {
        try {
            const notifications = notificationService.getAll();
            const newNotification = {
                id: Date.now(),
                title,
                message,
                type, // info, success, warning, error
                read: false,
                timestamp: new Date().toISOString()
            };
            const updatedNotifications = [newNotification, ...notifications].slice(0, 50);
            localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
            // Dispatch event for real-time updates if needed
            window.dispatchEvent(new Event('notification-update'));
            return newNotification;
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    },

    markAsRead: (id) => {
        try {
            const notifications = notificationService.getAll();
            const updatedNotifications = notifications.map(n =>
                (id === 'all' || n.id === id) ? { ...n, read: true } : n
            );
            localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
            window.dispatchEvent(new Event('notification-update'));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    },

    delete: (id) => {
        try {
            const notifications = notificationService.getAll();
            const updatedNotifications = notifications.filter(n => n.id !== id);
            localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
            window.dispatchEvent(new Event('notification-update'));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }
};
