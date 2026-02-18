import React from 'react';
import { X, Calendar, FileText, Stethoscope, ChevronRight } from 'lucide-react';
import { getWhatsAppLink } from '../config/clinic';

const WhatsAppModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const options = [
        {
            icon: <Calendar size={24} />,
            label: "Agendar Consulta",
            text: "Olá, gostaria de agendar uma consulta.",
            color: "bg-blue-100 text-blue-600",
            sub: "Resposta em ~5 min"
        },
        {
            icon: <FileText size={24} />,
            label: "Convênios e Planos",
            text: "Olá, gostaria de saber sobre os convênios atendidos.",
            color: "bg-green-100 text-green-600",
            sub: "Lista de 2026"
        },
        {
            icon: <Stethoscope size={24} />,
            label: "Resultado de Exames",
            text: "Olá, gostaria de verificar o resultado dos meus exames.",
            color: "bg-purple-100 text-purple-600",
            sub: "Portal do Paciente"
        }
    ];

    const handleOptionClick = (message) => {
        window.open(getWhatsAppLink(message), '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-[#1E3A8A] p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <h3 className="text-xl font-bold font-display">Olá! Como podemos te ajudar hoje?</h3>
                    <p className="text-blue-100 text-sm mt-1">Escolha uma opção para atendimento rápido.</p>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option.text)}
                            className="w-full flex items-center gap-4 p-4 rounded-xl border border-blue-100 bg-white hover:bg-blue-50 transition-all duration-200 group text-left shadow-sm hover:shadow-md hover:border-blue-300"
                        >
                            <div className={`p-3 rounded-full bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300 border border-blue-100`}>
                                {option.icon}
                            </div>
                            <div className="flex-1">
                                <span className="font-bold text-[#1E3A8A] group-hover:text-blue-700 transition-colors block text-lg">
                                    {option.label}
                                </span>
                                <span className="text-xs text-gray-500 group-hover:text-blue-600/70">
                                    {index === 0 ? 'Resposta em ~2 min' : index === 1 ? 'Lista 2026 atualizada' : 'Acesse agora'}
                                </span>
                            </div>
                            <div className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                                <ChevronRight size={20} a />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 text-center text-xs text-gray-400">
                    Atendimento via WhatsApp Oficial MedCare
                </div>
            </div>
        </div>
    );
};

export default WhatsAppModal;
