import React, { useState } from 'react';
import { Calculator, ChevronRight, DollarSign } from 'lucide-react';
import { clinicConfig, getWhatsAppLink } from '../config/clinic';

const procedures = [
    { id: 1, name: "Consulta Médica", price: 300 },
    { id: 2, name: "Check-up Completo", price: 500 },
    { id: 3, name: "Exames Laboratoriais", price: 200 },
    { id: 4, name: "Tratamento Estético", price: 1200 },
    { id: 5, name: "Pequena Cirurgia", price: 2500 }
];

const InstallmentSimulator = () => {
    const [selectedId, setSelectedId] = useState(2); // Default to Check-up

    const selectedProcedure = procedures.find(p => p.id === Number(selectedId));

    const [installments, setInstallments] = useState(12); // Default to 12x



    // Logic: Split into selected installments
    const pricePerMonth = (selectedProcedure.price / installments).toFixed(2).replace('.', ',');

    const handleSchedule = () => {
        const text = `Olá, fiz uma simulação no site para o procedimento "${selectedProcedure.name}" (${installments}x de R$ ${pricePerMonth}). Gostaria de agendar.`;
        window.open(getWhatsAppLink(text), '_blank');
    }

    return (
        <section className="py-16 bg-[#EFF6FF] border-y border-blue-100/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden flex flex-col md:flex-row">

                    {/* Header / Left Side */}
                    <div className="bg-[#1E3A8A] p-8 md:w-1/3 flex flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-fullblur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center mb-4">
                                <Calculator className="text-blue-200" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold font-display leading-tight mb-2">Planeje seu Tratamento</h3>
                            <p className="text-blue-200 text-sm">
                                Simule valores e veja como cabe no seu bolso.
                            </p>
                        </div>
                    </div>

                    {/* Calculator Body */}
                    <div className="p-8 md:w-2/3 flex flex-col gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                Selecione o Procedimento
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer transition-all"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                >
                                    {procedures.map(proc => (
                                        <option key={proc.id} value={proc.id}>
                                            {proc.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <ChevronRight size={20} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Installments Slider */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide flex justify-between">
                                <span>Parcelamento</span>
                                <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-md font-bold text-sm border border-blue-200">{installments}x</span>
                            </label>
                            <div className="relative group">
                                <input
                                    type="range"
                                    min="1"
                                    max="12"
                                    value={installments}
                                    onChange={(e) => setInstallments(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all hover:h-4"
                                />
                                <div
                                    className="absolute -top-10 -ml-3 bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    style={{ left: `${(installments - 1) * (100 / 11)}%` }}
                                >
                                    {installments}x
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium px-1">
                                <span>À vista</span>
                                <span>6x</span>
                                <span>12x</span>
                            </div>
                        </div>

                        {/* Result Display */}
                        <div className="flex items-center justify-between bg-blue-50/50 p-5 rounded-2xl border border-blue-100 transition-colors hover:bg-blue-50">
                            <div>
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Valor da Parcela</span>
                                <div key={installments} className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A] flex items-baseline gap-1.5 animate-in slide-in-from-bottom-1 fade-in duration-300">
                                    <span className="text-lg font-bold text-gray-400">{installments}x</span>
                                    R$ {pricePerMonth}
                                </div>
                                <div className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                                    <DollarSign size={12} />
                                    Condição especial no cartão
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSchedule}
                            className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                        >
                            Agendar esse Procedimento
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstallmentSimulator;
