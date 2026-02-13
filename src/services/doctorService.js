import { activityService } from './activityService';

const DOCTORS_KEY = 'medcare_doctors';

const initialDoctors = [
    { id: 1, name: 'Dr. Lucas Ribeiro', specialty: 'Neurologia', online: true, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, name: 'Dra. Camila Nogueira', specialty: 'Dermatologia', online: false, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, name: 'Dr. Fernando Silva', specialty: 'Cardiologia', online: true, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 4, name: 'Dra. Julia Martins', specialty: 'Pediatria', online: true, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200' },
];

export const doctorService = {
    getAll: () => {
        const data = localStorage.getItem(DOCTORS_KEY);
        if (!data) {
            localStorage.setItem(DOCTORS_KEY, JSON.stringify(initialDoctors));
            return initialDoctors;
        }
        return JSON.parse(data);
    },

    create: (doctor) => {
        const doctors = doctorService.getAll();
        const newDoctor = {
            id: Date.now(),
            online: true,
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200', // Default placeholder
            ...doctor
        };
        const updatedDoctors = [...doctors, newDoctor];
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(updatedDoctors));

        activityService.log('Médico Adicionado', `${newDoctor.name} (${newDoctor.specialty}) entrou para a equipe`, 'Admin');

        return newDoctor;
    },

    update: (id, updates) => {
        const doctors = doctorService.getAll();
        const docName = doctors.find(d => d.id === id)?.name || 'Médico';
        const updatedDoctors = doctors.map(doc =>
            doc.id === id ? { ...doc, ...updates } : doc
        );
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(updatedDoctors));

        if (updates.online !== undefined) {
            activityService.log('Status Médico', `${docName} está agora ${updates.online ? 'Online' : 'Offline'}`, 'Admin');
        }

        return updatedDoctors.find(d => d.id === id);
    },

    delete: (id) => {
        const doctors = doctorService.getAll();
        const docToDelete = doctors.find(d => d.id === id);
        const updatedDoctors = doctors.filter(doc => doc.id !== id);
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(updatedDoctors));

        if (docToDelete) {
            activityService.log('Médico Removido', `${docToDelete.name} foi removido do sistema`, 'Admin');
        }
    }
};
