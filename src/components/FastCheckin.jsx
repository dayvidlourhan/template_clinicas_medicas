import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, ShieldCheck, Clock } from 'lucide-react';
import { leadService } from '../services/leadService';
import { getWhatsAppLink } from '../config/clinic';

const FastCheckin = () => {
    const [status, setStatus] = useState('idle'); // idle, processing, verifying, redirecting, success
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        symptom: '',
        customSymptom: '' // For "Outro" input
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'phone') {
            value = value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            // Mask: (00) 00000-0000
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Stage 1: Processing
        setStatus('processing');
        await new Promise(resolve => setTimeout(resolve, 600));

        // Stage 2: Verifying (Fake "Checking availability")
        setStatus('verifying');
        await new Promise(resolve => setTimeout(resolve, 800));

        // Stage 3: Redirecting
        setStatus('redirecting');
        await new Promise(resolve => setTimeout(resolve, 600));

        // Save to "Database" (LocalStorage)
        try {
            const symptomText = formData.symptom === 'Outro' ? formData.customSymptom : formData.symptom;
            leadService.create({
                name: formData.name,
                phone: formData.phone,
                symptom: symptomText,
                category: formData.symptom === 'Outro' ? 'Outro' : formData.category || 'Geral'
            });
        } catch (error) {
            console.error("Erro ao salvar lead locally", error);
        }

        // Stage 4: Success & Redirect
        setStatus('success');

        const symptomText = formData.symptom === 'Outro' ? formData.customSymptom : formData.symptom;
        const text = `OLÁ MEDCARE:\n- Nome: ${formData.name}\n- WhatsApp: ${formData.phone}\n- Motivo/Sintoma: ${symptomText}\n\nGostaria de agilizar meu atendimento.`;

        // Small delay to show success state before opening window
        setTimeout(() => {
            window.open(getWhatsAppLink(text), '_blank');
            // Reset form after a while
            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', phone: '', symptom: '', customSymptom: '' });
            }, 3000);
        }, 500);
    };

    const getButtonContent = () => {
        switch (status) {
            case 'processing':
                return (
                    <>
                        <Loader2 size={22} className="animate-spin" />
                        Conectando ao sistema...
                    </>
                );
            case 'verifying':
                return (
                    <>
                        <ShieldCheck size={22} className="text-green-200 animate-pulse" />
                        Verificando prioridade...
                    </>
                );
            case 'redirecting':
                return (
                    <>
                        <Send size={22} className="animate-ping" />
                        Abrindo WhatsApp...
                    </>
                );
            case 'success':
                return (
                    <>
                        <CheckCircle2 size={24} className="text-white" />
                        Solicitação Enviada!
                    </>
                );
            default:
                return (
                    <>
                        <Send size={22} className="group-hover:translate-x-1 transition-transform stroke-[3px]" />
                        Chamar no WhatsApp Agora
                    </>
                );
        }
    };

    const getButtonStyles = () => {
        if (status === 'success') return 'bg-green-600 hover:bg-green-700 shadow-green-600/30 scale-[1.02]';
        if (status !== 'idle') return 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 cursor-wait opacity-90';
        return 'bg-[#25D366] hover:bg-[#1ebc57] shadow-green-500/25 hover:shadow-green-600/30';
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 mb-20" id="checkin">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header - Copy Refined for Direct Benefit */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 text-sm font-bold mb-6 rounded-full border border-green-100 shadow-sm animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        ATENDIMENTO PRIORITÁRIO
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-[#1E3A8A] mb-6 tracking-tight">
                        Pule a fila da recepção.
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Preencha apenas 3 campos e inicie seu atendimento via WhatsApp agora mesmo.
                        <span className="font-semibold text-gray-900"> Sem burocracia, sem espera.</span>
                    </p>
                </div>

                {/* Centered White Card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 md:p-12 max-w-xl mx-auto border border-gray-100 relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2 pl-1">Seu Nome</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        disabled={status !== 'idle'}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                        placeholder="Ex: Ana Souza"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2 pl-1">WhatsApp</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    disabled={status !== 'idle'}
                                    maxLength="15"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-lg font-mono disabled:opacity-60 disabled:cursor-not-allowed"
                                    placeholder="(00) 90000-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2 pl-1">Como podemos ajudar?</label>
                                <div className="relative">
                                    <select
                                        name="symptom"
                                        required
                                        disabled={status !== 'idle'}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                        value={formData.symptom}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled hidden>Selecione o motivo...</option>
                                        <option value="Agendar Consulta (Dor/Sintoma)">Estou com Dor / Sintoma</option>
                                        <option value="Check-up / Preventivo">Quero fazer um Check-up</option>
                                        <option value="Exames de Rotina">Agendar Exames</option>
                                        <option value="Retorno Médico">Marcar Retorno</option>
                                        <option value="Renovar Receita">Renovar Receita</option>
                                        <option value="Dúvida sobre Convênio">Dúvida sobre Convênios</option>
                                        <option value="Outro">Outro Motivo</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none text-gray-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Conditional "Check-in" details if "Outro" is selected */}
                            {formData.symptom === 'Outro' && (
                                <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                                    <label className="block text-sm font-bold text-gray-800 mb-2 pl-1">Descreva brevemente:</label>
                                    <input
                                        type="text"
                                        name="customSymptom"
                                        required
                                        disabled={status !== 'idle'}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 bg-white"
                                        placeholder="Ex: Preciso de um atestado..."
                                        value={formData.customSymptom}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className={`w-full mt-6 text-white font-extrabold text-xl py-5 rounded-2xl shadow-xl active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden disabled:cursor-not-allowed ${getButtonStyles()}`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {getButtonContent()}
                            </span>
                            {/* Shine effect */}
                            {status === 'idle' && (
                                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine" />
                            )}
                        </button>

                        <div className="text-center space-y-2">
                            <p className="text-xs font-medium text-gray-400 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                                <Clock size={12} className="text-blue-500" />
                                Tempo médio de resposta: <span className="text-blue-600 font-bold">~3 minutos</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default FastCheckin;
