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
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-ping">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
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
                    <div className="flex items-center gap-3 text-left">
                        <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors shrink-0">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-lg md:text-xl font-black uppercase leading-none tracking-tight">Chamar no WhatsApp</span>
                            <span className="text-[10px] md:text-xs opacity-90 font-bold uppercase tracking-widest mt-1">Atendimento Prioritário Agora</span>
                        </div>
                    </div>
                );
        }
    };

    const getButtonStyles = () => {
        if (status === 'success') return 'bg-green-600 hover:bg-green-700 shadow-green-600/30 scale-[1.02]';
        if (status !== 'idle') return 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 cursor-wait opacity-90';
        return 'bg-gradient-to-r from-[#25D366] to-[#1ebc57] hover:shadow-green-500/40';
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
                            className={`w-full mt-6 text-white py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all duration-300 flex items-center justify-center group relative overflow-hidden disabled:cursor-not-allowed ${getButtonStyles()}`}
                        >
                            <div className="relative z-10">
                                {getButtonContent()}
                            </div>
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
