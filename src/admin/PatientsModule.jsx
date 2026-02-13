import React, { useState, useEffect } from 'react';
import { Phone, AlertCircle, Clock, Check, X, ChevronDown, Filter, Trash2, RefreshCw, MessageSquare, Download } from 'lucide-react';
import { leadService } from '../services/leadService';

const statusOptions = ['Novo', 'Contatado', 'Agendado', 'Cancelado'];

const statusStyles = {
    'Novo': 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
    'Contatado': 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200',
    'Agendado': 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
    'Cancelado': 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
};

const urgencyStyles = {
    'high': 'text-red-600 font-bold bg-red-50 border-red-100',
    'medium': 'text-orange-600 font-medium bg-orange-50 border-orange-100',
    'low': 'text-blue-600 bg-blue-50 border-blue-100'
};

const PatientsModule = () => {
    const [patients, setPatients] = useState([]);
    const [filter, setFilter] = useState('Todos');
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        setLoading(true);
        const data = leadService.getAll();
        // Sort by date desc
        setPatients(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
    };

    useEffect(() => {
        loadData();
        // Auto-refresh every 30s
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = (id, newStatus) => {
        leadService.update(id, { status: newStatus });
        setPatients(prev => prev.map(p =>
            p.id === id ? { ...p, status: newStatus } : p
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir permanentemente este lead?')) {
            try {
                leadService.delete(id);
                setPatients(prev => prev.filter(p => p.id !== id));
            } catch (error) {
                alert('Erro ao excluir lead');
                console.error(error);
            }
        }
    };

    const handleAddNote = (id, currentNote) => {
        const newNote = window.prompt('Adicionar/Editar nota:', currentNote || '');
        if (newNote !== null) {
            leadService.update(id, { notes: newNote });
            setPatients(prev => prev.map(p => p.id === id ? { ...p, notes: newNote } : p));
        }
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Nome", "Telefone", "Sintoma", "Nota", "Data", "Status"];
        const rows = patients.map(p => [
            p.id,
            `"${p.name}"`,
            p.phone,
            `"${p.symptom}"`,
            `"${p.notes || ''}"`,
            new Date(p.date).toLocaleString(),
            p.status
        ]);

        const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `medcare_leads_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredPatients = filter === 'Todos'
        ? patients
        : patients.filter(p => p.status === filter);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-800">Pacientes e Check-ins</h2>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{patients.length}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Gerencie os leads vindos do "Fast Check-in"</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <button onClick={loadData} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" title="Atualizar">
                        <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>

                    <div className="relative flex-grow sm:flex-grow-0 min-w-[140px]">
                        <select
                            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow cursor-pointer"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="Todos">Todos os Status</option>
                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <Filter className="h-4 w-4" />
                        </div>
                    </div>

                    <button
                        onClick={handleExportCSV}
                        className="flex-grow sm:flex-grow-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm active:translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Download size={16} />
                        Exportar CSV
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[400px]">
                {patients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <p>Nenhum lead encontrado.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-xs font-semibold uppercase tracking-wider text-left border-b border-gray-100">
                                <th className="p-4 pl-6">Nome / Paciente</th>
                                <th className="p-4">Telefone</th>
                                <th className="p-4">Motivo / Urgência</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 pr-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="group hover:bg-blue-50/30 transition-colors duration-150">
                                    <td className="p-4 pl-6">
                                        <div className="font-medium text-gray-900 group-hover:text-blue-900">{patient.name}</div>
                                        {patient.notes && <div className="text-xs text-gray-500 mt-1 italic max-w-[150px] truncate">Note: {patient.notes}</div>}
                                    </td>
                                    <td className="p-4 font-mono text-gray-500 tracking-tight">{patient.phone}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-700 truncate max-w-[180px]" title={patient.symptom}>{patient.symptom}</span>
                                            {patient.urgency === 'high' && <span className="text-[10px] font-bold text-red-600 uppercase mt-1">Urgente</span>}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 whitespace-nowrap text-xs">
                                        {new Date(patient.date).toLocaleDateString()} <br />
                                        {new Date(patient.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>

                                    {/* Status Dropdown */}
                                    <td className="p-4">
                                        <div className="relative inline-block w-32">
                                            <select
                                                value={patient.status}
                                                onChange={(e) => handleStatusChange(patient.id, e.target.value)}
                                                className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-full text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 transition-all ${statusStyles[patient.status]}`}
                                            >
                                                {statusOptions.map((opt) => (
                                                    <option key={opt} value={opt} className="bg-white text-gray-700 font-medium py-1">
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
                                                <ChevronDown className="h-3 w-3" />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4 pr-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleAddNote(patient.id, patient.notes)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                title="Adicionar Nota"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(patient.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                title="Excluir"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <a
                                                href={`https://wa.me/55${patient.phone.replace(/\D/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm ml-2"
                                            >
                                                <Phone className="w-3.5 h-3.5 mr-1" />
                                                Zap
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>Mostrando {filteredPatients.length} de {patients.length} resultados</span>
                <div className="flex space-x-1">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50" disabled>Anterior</button>
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100">Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default PatientsModule;
