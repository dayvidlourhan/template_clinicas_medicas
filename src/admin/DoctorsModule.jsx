import React, { useState, useEffect } from 'react';
import { Camera, Edit2, Shield, User, RefreshCw, Plus, X } from 'lucide-react';
import { doctorService } from '../services/doctorService';

const DoctorsModule = () => {
    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', image: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = () => {
        setDoctors(doctorService.getAll());
    };

    const toggleOnline = (id) => {
        const doc = doctors.find(d => d.id === id);
        if (doc) {
            doctorService.update(id, { online: !doc.online });
            setDoctors(doctors.map(d => d.id === id ? { ...d, online: !d.online } : d));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Remover médico?')) {
            doctorService.delete(id);
            setDoctors(doctors.filter(d => d.id !== id));
        }
    };

    const handleAddDoctor = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate "upload" or processing
        setTimeout(() => {
            const added = doctorService.create({
                ...newDoctor,
                image: newDoctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200'
            });
            setShowModal(false);
            setNewDoctor({ name: '', specialty: '', image: '' });
            setDoctors([...doctors, added]);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Médicos & Stories</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition-all group active:scale-95"
                >
                    <span className="flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>Adicionar Médico</span>
                    </span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                    <div key={doc.id} className={`bg-white rounded-2xl shadow-sm border ${doc.online ? 'border-gray-100' : 'border-red-100 bg-red-50/50'} overflow-hidden transition-all duration-300 hover:shadow-md`}>
                        {/* Header Image */}
                        <div className="relative h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={doc.image}
                                alt={doc.name}
                                className={`w-full h-full object-cover transition-all duration-500 ${doc.online ? 'group-hover:scale-105' : 'grayscale opacity-70'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-blue-600 hover:bg-white hover:shadow-lg transition-all transform hover:scale-110">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm p-2 rounded-full text-white hover:bg-red-600 hover:shadow-lg transition-all transform hover:scale-110 opacity-0 group-hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="w-full text-white">
                                    <h3 className="font-bold text-lg leading-tight">{doc.name}</h3>
                                    <p className="opacity-90 text-sm font-light">{doc.specialty}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 space-y-5">
                            <div className="flex items-center justify-between">
                                <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${doc.online ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                    {doc.online ? 'Online' : 'Offline / Férias'}
                                </span>

                                {/* Toggle Switch */}
                                <label className="flex items-center cursor-pointer select-none">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={doc.online}
                                            onChange={() => toggleOnline(doc.id)}
                                        />
                                        <div className={`block w-11 h-6 rounded-full transition-colors duration-300 ease-in-out ${doc.online ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ease-in-out transform ${doc.online ? 'translate-x-5' : 'translate-x-0'
                                            }`}></div>
                                    </div>
                                </label>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                                <button className="w-full flex items-center justify-center space-x-2 border border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl transition-all hover:shadow-sm font-medium text-sm group-hover:border-blue-400">
                                    <Camera className="w-4 h-4" />
                                    <span>Atualizar Story</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Add Doctor */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Novo Médico</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddDoctor} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Médico</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Dr. João Silva"
                                    value={newDoctor.name}
                                    onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Cardiologia"
                                    value={newDoctor.specialty}
                                    onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Foto</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="https://..."
                                    value={newDoctor.image}
                                    onChange={e => setNewDoctor({ ...newDoctor, image: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">Deixe em branco para usar placeholder</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all mt-4"
                            >
                                {loading ? 'Salvando...' : 'Cadastrar Médico'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorsModule;
