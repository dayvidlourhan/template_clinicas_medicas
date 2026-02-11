import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import FloatingCard from './FloatingCard';

const Hero = () => {
    return (
        <section id="inicio" className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 z-20">
            {/* Ambient Background Glows (The "Expensive" feel) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left Column: Content */}
                    <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl relative z-20">

                        {/* 2026 Trust Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-semibold text-gray-600 tracking-wide">Aceitando Novos Pacientes</span>
                        </motion.div>

                        {/* Massive Typography */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-display font-bold text-gray-900 leading-[1.1] tracking-tight"
                        >
                            Saúde de elite para <br className="hidden lg:block" />
                            <span className="text-gradient relative inline-block">
                                quem você ama.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
                        >
                            Medicina de precisão com atendimento humanizado. A tecnologia dos grandes centros, perto de você.
                        </motion.p>

                        {/* CTA Group */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-blue-700/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer">
                                <ShieldCheck size={20} />
                                Agendar Consulta
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                                Conhecer Corpo Clínico
                                <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Social Proof Stack */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="pt-6 flex items-center justify-center lg:justify-start gap-4"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Patient" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-left">
                                <div className="flex text-yellow-400 text-sm">
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                </div>
                                <p className="text-sm text-gray-600 font-medium"><span className="text-gray-900 font-bold">4.9/5</span> de 2,300+ avaliações</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual with Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative w-full max-w-md lg:max-w-full z-10"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 aspect-[4/5] lg:aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2664&auto=format&fit=crop"
                                alt="Medical Team"
                                className="w-full h-full object-cover object-center scale-105"
                            />

                            {/* Glass Badge - The "Premium" Detail */}
                            <div className="absolute bottom-6 left-6 right-6 glass-panel p-5 rounded-2xl flex items-center gap-4">
                                <div className="bg-blue-600/10 p-3 rounded-xl text-blue-700">
                                    <Stethoscope size={28} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">Excelência Médica</p>
                                    <p className="text-sm text-gray-500">Top 10 Melhores Clínicas 2025</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Card Bridge */}
            <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-30 px-4">
                <div className="container mx-auto max-w-6xl">
                    <FloatingCard />
                </div>
            </div>
        </section>
    );
};

export default Hero;
