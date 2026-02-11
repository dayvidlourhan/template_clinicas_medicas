import React from 'react';
import { Heart, Baby, User, Bone, Sun, Stethoscope, ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './ui/StaggerReveal';

const Specialties = () => {
    const specialties = [
        { icon: <Heart size={28} />, title: 'Cardiologia' },
        { icon: <Baby size={28} />, title: 'Pediatria' },
        { icon: <User size={28} />, title: 'Ginecologia' },
        { icon: <Bone size={28} />, title: 'Ortopedia' },
        { icon: <Sun size={28} />, title: 'Dermatologia' },
        { icon: <Stethoscope size={28} />, title: 'Clínica Geral' },
    ];

    return (
        <section className="py-24 bg-slate-50" id="especialidades">
            <div className="container mx-auto px-6 lg:px-12 text-center">

                {/* Header */}
                <div className="max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900">
                        Especialidades Médicas
                    </h2>
                    <p className="text-lg text-gray-600">
                        Tudo o que você precisa em um só lugar.
                    </p>
                </div>

                {/* Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-0">
                    {specialties.map((spec, index) => (
                        <StaggerItem
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 transition-all duration-300 group transform border border-gray-100 text-left flex flex-col justify-between h-full relative overflow-hidden card-premium-hover"
                        >
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-xl bg-blue-50 text-priority flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    {React.cloneElement(spec.icon, { size: 32 })}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {spec.title}
                                </h3>
                            </div>

                            <div className="pt-4 flex items-center justify-end w-full">
                                <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                                    <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Bottom CTA */}
                <div className="mt-16">
                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
                        Ver todas as especialidades
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Specialties;
