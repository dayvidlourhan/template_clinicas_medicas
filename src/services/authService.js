import { activityService } from './activityService';

const USERS_KEY = 'medcare_users';

export const authService = {
    login: async (email, password) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Hardcoded check for demo purposes
        if (email === 'admin@medica.com' && password === 'admin123') {
            const user = {
                id: 1,
                name: 'Administrador MedCare',
                email: 'admin@medica.com',
                role: 'admin',
                token: 'mock-jwt-token-xyz-123'
            };

            localStorage.setItem('user', JSON.stringify(user));
            activityService.log('Login', `Usuário ${user.name} fez login`, user.name);
            return user;
        }

        throw new Error('Credenciais inválidas');
    },

    logout: () => {
        const user = authService.getCurrentUser();
        if (user) {
            activityService.log('Logout', `Usuário ${user.name} saiu do sistema`, user.name);
        }
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    },

    updateUser: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        activityService.log('Perfil Atualizado', `Usuário atualizou seu perfil`, updatedUser.name);
    }
};
