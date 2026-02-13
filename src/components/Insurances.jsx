import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './ui/StaggerReveal';

const Insurances = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const insurances = [
        { name: "Unimed", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Unimed_logo.svg/2560px-Unimed_logo.svg.png" },
        { name: "Bradesco Saúde", logo: "https://logodownload.org/wp-content/uploads/2019/08/bradesco-saude-logo.png" },
        { name: "Amil", logo: "https://logodownload.org/wp-content/uploads/2016/09/amil-logo.png" },
        { name: "SulAmérica", logo: "https://logodownload.org/wp-content/uploads/2017/09/sulamerica-logo.png" },
        { name: "Ipasgo", logo: "https://logodownload.org/wp-content/uploads/2021/10/ipasgo-logo.png" },
        { name: "Cassi", logo: "https://logodownload.org/wp-content/uploads/2021/03/cassi-logo.png" }, // Placeholder for generic
        { name: "Porto Seguro", logo: "https://logodownload.org/wp-content/uploads/2014/05/porto-seguro-logo.png" },
        { name: "Hapvida", logo: "https://logodownload.org/wp-content/uploads/2017/09/hapvida-logo.png" },
    ];

    const filteredInsurances = insurances.filter(ins =>
        ins.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="convenios" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4 border border-blue-200">
                        PARCEIROS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
                        Convênios Atendidos
                    </h2>

                    {/* Search Filter */}
                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Digite o nome do seu convênio..."
                            className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg shadow-blue-900/5 focus:shadow-xl focus:shadow-blue-900/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder-gray-400 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                {filteredInsurances.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {filteredInsurances.map((ins, index) => (
                            <StaggerItem
                                key={index}
                                className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-center hover:shadow-lg hover:border-blue-100 transition-all duration-300 h-32 group"
                            >
                                <img
                                    src={ins.logo}
                                    alt={ins.name}
                                    className="max-h-12 max-w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    loading="lazy"
                                />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                ) : (
                    /* Zero State */
                    <div className="text-center py-12 animate-in fade-in zoom-in-95">
                        <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Não encontrou?</h3>
                        <p className="text-gray-500 mb-6">
                            Atendemos particular com valor social e ofertas especiais.
                        </p>
                        <a
                            href="https://wa.me/556299999999?text=Olá, não achei meu convênio na lista."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold shadow-lg shadow-green-500/20 transition-all"
                        >
                            Chamar no Zap
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Insurances;
