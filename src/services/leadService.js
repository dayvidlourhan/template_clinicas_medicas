import { activityService } from './activityService';
import { notificationService } from './notificationService';

const LEADS_KEY = 'medcare_leads';

const initialLeads = [
    { id: 1, name: 'João Silva', phone: '11999999999', symptom: 'Dor de cabeça constante', category: 'Neurologia', date: new Date().toISOString(), status: 'Novo', urgency: 'medium' },
    { id: 2, name: 'Maria Oliveira', phone: '11988888888', symptom: 'Manchas na pele', category: 'Dermatologia', date: new Date(Date.now() - 86400000).toISOString(), status: 'Contatado', urgency: 'low' },
    { id: 3, name: 'Carlos Santos', phone: '11977777777', symptom: 'Dor no peito forte', category: 'Cardiologia', date: new Date(Date.now() - 172800000).toISOString(), status: 'Novo', urgency: 'high' },
];

const calculateUrgency = (symptom) => {
    const s = symptom.toLowerCase();
    if (s.includes('peito') || s.includes('falta de ar') || s.includes('desmaio') || s.includes('sangramento')) return 'high';
    if (s.includes('dor') || s.includes('febre') || s.includes('tontura')) return 'medium';
    return 'low';
};

export const leadService = {
    getAll: () => {
        const data = localStorage.getItem(LEADS_KEY);
        if (!data) {
            localStorage.setItem(LEADS_KEY, JSON.stringify(initialLeads));
            return initialLeads;
        }
        return JSON.parse(data);
    },

    create: (lead) => {
        const leads = leadService.getAll();
        const newLead = {
            id: Date.now(),
            status: 'Novo',
            date: new Date().toISOString(),
            notes: '',
            urgency: calculateUrgency(lead.symptom),
            ...lead
        };

        const updatedLeads = [newLead, ...leads];
        localStorage.setItem(LEADS_KEY, JSON.stringify(updatedLeads));

        // Side effects
        activityService.log('Novo Lead', `Novo paciente: ${newLead.name} (${newLead.category})`, 'Sistema');
        notificationService.add('Novo Lead Recebido', `${newLead.name} está solicitando atendimento para ${newLead.category}.`, 'info');

        return newLead;
    },

    update: (id, updates) => {
        const leads = leadService.getAll();
        const oldLead = leads.find(l => l.id === id);
        const updatedLeads = leads.map(l =>
            l.id === id ? { ...l, ...updates } : l
        );
        localStorage.setItem(LEADS_KEY, JSON.stringify(updatedLeads));

        if (updates.status && oldLead.status !== updates.status) {
            activityService.log('Status Alterado', `Lead ${oldLead.name} alterado para ${updates.status}`, 'Admin');
        }

        if (updates.notes) {
            activityService.log('Nota Adicionada', `Nova nota para ${oldLead.name}`, 'Admin');
        }

        return updatedLeads.find(l => l.id === id);
    },

    delete: (id) => {
        const leads = leadService.getAll();
        const leadToDelete = leads.find(l => l.id === id);
        const updatedLeads = leads.filter(l => l.id !== id);
        localStorage.setItem(LEADS_KEY, JSON.stringify(updatedLeads));

        if (leadToDelete) {
            activityService.log('Lead Removido', `Paciente ${leadToDelete.name} removido do sistema`, 'Admin');
        }
    },

    getStats: () => {
        const leads = leadService.getAll();
        const today = new Date().toISOString().split('T')[0];

        return {
            total: leads.length,
            today: leads.filter(l => l.date.startsWith(today)).length,
            pending: leads.filter(l => l.status === 'Novo').length,
            converted: leads.filter(l => l.status === 'Agendado').length
        };
    }
};
