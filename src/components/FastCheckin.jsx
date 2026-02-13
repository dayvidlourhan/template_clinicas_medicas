import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const FastCheckin = () => {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        symptom: ''
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'cpf') {
            // Remove everything that is not a digit
            value = value.replace(/\D/g, '');
            // Limit to 11 digits
            if (value.length > 11) value = value.slice(0, 11);

            // Apply CPF Mask: 000.000.000-00
            value = value
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneNumber = "556299999999"; // Replace with actual number
        const text = `PRÉ-CADASTRO:\n- Nome: ${formData.name}\n- CPF: ${formData.cpf}\n- Sintoma: ${formData.symptom}`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 mb-20" id="checkin">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold mb-4 rounded-full border border-blue-100">
                        AGILIZE SEU ATENDIMENTO
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-[#1E3A8A] mb-4">
                        Check-in Digital
                    </h2>
                    <p className="text-lg text-gray-600">
                        Preencha seus dados antecipadamente e reduza seu tempo de espera na recepção.
                        <br className="hidden md:block" /> Seus dados estão seguros e criptografados.
                    </p>
                </div>

                {/* Centered White Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-2xl mx-auto border border-gray-100 relative overflow-hidden">

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white"
                                        placeholder="Digite seu nome"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">CPF</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    required
                                    maxLength="14"
                                    className="w-full px-4 py-3.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Sintoma Principal</label>
                                <div className="relative">
                                    <select
                                        name="symptom"
                                        required
                                        className="w-full px-4 py-3.5 rounded-lg border border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white appearance-none cursor-pointer"
                                        value={formData.symptom}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Dor">Dor</option>
                                        <option value="Febre">Febre</option>
                                        <option value="Retorno">Retorno</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
                        >
                            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                            Enviar Pré-Cadastro
                        </button>

                        <div className="text-center">
                            <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
                                <CheckCircle2 size={12} className="text-green-500" />
                                Seus dados serão enviados via WhatsApp Seguro
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default FastCheckin;
