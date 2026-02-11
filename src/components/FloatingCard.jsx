import React from 'react';
import { Phone, Clock, Stethoscope, ChevronDown } from 'lucide-react';

const FloatingCard = () => {
    const cardItems = [
        {
            icon: <Phone className="w-6 h-6 text-white" />,
            title: "Emergência",
            content: "(62) 9999-9999",
            subcontent: "Suporte 24h",
            bgClass: "bg-primary text-white", // Solid Primary Color for first card
            iconBg: "bg-white/20",
            isPrimary: true
        },
        {
            icon: <Clock className="w-6 h-6 text-primary" />,
            title: "Horários",
            content: "Seg - Sex: 8:00 - 18:00",
            subcontent: "Sáb: 8:00 - 12:00",
            bgClass: "bg-white text-gray-900",
            iconBg: "bg-primary/10",
            isPrimary: false
        },
        {
            icon: <Stethoscope className="w-6 h-6 text-primary" />,
            title: "Nossos Serviços",
            content: "Cardiologia, Pediatria...",
            subcontent: "Ver Todos",
            bgClass: "bg-white text-gray-900",
            iconBg: "bg-primary/10",
            isPrimary: false,
            hasDropdown: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 relative z-40">
            {cardItems.map((item, index) => (
                <div
                    key={index}
                    className={`
            p-8 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden group border-b md:border-b-0 md:border-r border-gray-100 last:border-0
            ${item.bgClass} 
            ${!item.isPrimary ? 'hover:bg-gray-50' : 'hover:bg-primary-dark'}
          `}
                >
                    {/* Decorative Circle for hover effect */}
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-10 -mt-10 transition-transform duration-500 opacity-10 ${item.isPrimary ? 'bg-white' : 'bg-primary'} scale-0 group-hover:scale-150`}></div>

                    <div className="flex items-start justify-between relative z-10">
                        <div className={`p-3 rounded-xl ${item.iconBg} mb-2`}>
                            {item.icon}
                        </div>
                        {item.hasDropdown && <ChevronDown className="text-gray-400 group-hover:text-primary transition-colors" />}
                    </div>

                    <div className="relative z-10">
                        <h3 className={`font-bold mb-1 ${item.isPrimary ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                        <p className={`font-medium text-lg leading-tight ${item.isPrimary ? 'text-white' : 'text-primary'}`}>{item.content}</p>
                        <p className={`text-sm mt-1 ${item.isPrimary ? 'text-blue-100' : 'text-gray-500'}`}>{item.subcontent}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FloatingCard;
