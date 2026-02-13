import React, { useState } from 'react';
import { Save, User, Lock, Phone, Smartphone, Globe } from 'lucide-react';
import { authService } from '../services/authService';

const SettingsModule = () => {
    const [user, setUser] = useState(authService.getCurrentUser() || {});
    const [clinicInfo, setClinicInfo] = useState({
        name: 'MedCare Clínica Médica',
        phone: '(11) 99999-9999',
        address: 'Av. Paulista, 1000 - São Paulo, SP',
        whatsapp: '5511999999999'
    });

    const handleSaveUser = (e) => {
        e.preventDefault();
        alert('Perfil atualizado com sucesso (Simulação)');
        // In real app: authService.updateUser(user);
    };

    const handleSaveClinic = (e) => {
        e.preventDefault();
        alert('Informações da clínica salvas!');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Configurações & Perfil</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* User Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center space-x-2 mb-6 text-blue-800 border-b border-blue-50 pb-2">
                        <User className="w-5 h-5" />
                        <h3 className="text-lg font-bold">Meu Perfil</h3>
                    </div>

                    <form onSubmit={handleSaveUser} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>

                {/* Security Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center space-x-2 mb-6 text-purple-800 border-b border-purple-50 pb-2">
                        <Lock className="w-5 h-5" />
                        <h3 className="text-lg font-bold">Segurança</h3>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-gray-700 font-medium">Alterar Senha</span>
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Recomendado</span>
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                            <span className="text-gray-700 font-medium">Autenticação de 2 Fatores</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ativado</span>
                        </button>
                    </div>
                </div>

                {/* Clinic Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
                    <div className="flex items-center space-x-2 mb-6 text-green-800 border-b border-green-50 pb-2">
                        <Globe className="w-5 h-5" />
                        <h3 className="text-lg font-bold">Dados da Clínica</h3>
                    </div>

                    <form onSubmit={handleSaveClinic} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Clínica</label>
                            <input
                                type="text"
                                value={clinicInfo.name}
                                onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Oficial</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    value={clinicInfo.phone}
                                    onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                                    className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-100 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Admin</label>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    value={clinicInfo.whatsapp}
                                    onChange={(e) => setClinicInfo({ ...clinicInfo, whatsapp: e.target.value })}
                                    className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-100 outline-none"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                            <input
                                type="text"
                                value={clinicInfo.address}
                                onChange={(e) => setClinicInfo({ ...clinicInfo, address: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-100 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2 pt-2 flex justify-end">
                            <button type="submit" className="bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2">
                                <Save className="w-4 h-4" />
                                <span>Salvar Dados da Clínica</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsModule;
