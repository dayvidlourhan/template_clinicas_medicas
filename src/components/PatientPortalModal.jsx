import React, { useState } from 'react';
import { X, User, Lock, ArrowRight, Activity, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '../config/clinic';

const PatientPortalModal = ({ isOpen, onClose }) => {

    // UX States
    const [isLoading, setIsLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState('idle'); // 'idle', 'loading', 'error'
    const [formData, setFormData] = useState({ cpf: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();

        // 1. Start Simulation
        setIsLoading(true);
        setLoginStatus('loading');

        // 2. Simulate API Call delay (2 seconds)
        setTimeout(() => {
            setIsLoading(false);
            setLoginStatus('error');
        }, 2000);
    };

    const handleWhatsAppActivation = () => {
        const text = `Olá, tentei acessar o Portal do Paciente (CPF: ${formData.cpf}) e apareceu que meu cadastro não está ativo. Poderiam ativar para mim?`;
        window.open(getWhatsAppLink(text), '_blank');
        onClose();
    };

    // Reset when closing
    const handleClose = () => {
        setLoginStatus('idle');
        setFormData({ cpf: '', password: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
                    >
                        {/* Header Gradient */}
                        <div className="bg-[#1E3A8A] p-8 text-center relative overflow-hidden">
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-blue-600/30 to-cyan-400/30 animate-spin-slow pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-inner ring-1 ring-white/20">
                                    <Activity className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white font-display">Portal do Paciente</h3>
                                <p className="text-blue-100 text-sm mt-2">Acesse seus exames e histórico.</p>
                            </div>

                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Login Form */}
                        <div className="p-8">
                            <form className="space-y-5" onSubmit={handleLogin}>

                                {/* Error Message - Appears after simulation */}
                                <AnimatePresence>
                                    {loginStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex gap-3 border border-red-100"
                                        >
                                            <AlertCircle size={20} className="shrink-0 text-red-500" />
                                            <div>
                                                <p className="font-bold">Acesso não ativado.</p>
                                                <p className="mt-1 text-red-600/80">Seu CPF ainda não possui acesso web liberado.</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">CPF ou Carteirinha</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.cpf}
                                            onChange={e => setFormData({ ...formData, cpf: e.target.value })}
                                            disabled={isLoading || loginStatus === 'error'}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-gray-900 disabled:opacity-50"
                                            placeholder="000.000.000-00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                            disabled={isLoading || loginStatus === 'error'}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 text-gray-900 disabled:opacity-50"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        {loginStatus !== 'error' && (
                                            <a
                                                href={getWhatsAppLink("Olá, esqueci minha senha do Portal do Paciente.")}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Esqueceu a senha?
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Primary Button Swaps based on State */}
                                {loginStatus === 'error' ? (
                                    <button
                                        type="button"
                                        onClick={handleWhatsAppActivation}
                                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 animate-in fade-in zoom-in"
                                    >
                                        Solicitar Liberação no WhatsApp
                                        <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-wait"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Verificando Acesso...
                                            </>
                                        ) : (
                                            <>
                                                Acessar Portal
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                )}
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500">
                                    Não tem cadastro? <a href="#checkin" onClick={handleClose} className="text-blue-600 font-bold hover:underline">Faça seu pré-cadastro</a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PatientPortalModal;
