
import React from 'react';
import { Phone, Calendar } from 'lucide-react';

const StickyCTA = () => {
    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
            <div className="flex items-center gap-3 p-2 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl ring-1 ring-black/5">
                <a href="tel:+5511999999999" className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-50/50 hover:bg-gray-100/50 text-gray-900 font-medium rounded-xl transition-all active:scale-95 border border-transparent hover:border-gray-200">
                    <Phone size={18} className="text-gray-600" />
                    <span className="text-sm">Ligar</span>
                </a>
                <a href="#agendar" className="flex-[2] flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Calendar size={18} />
                    <span className="text-sm">Agendar</span>
                </a>
            </div>
        </div>
    );
};

export default StickyCTA;
