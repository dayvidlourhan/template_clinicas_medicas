import React from 'react';
import { X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '../config/clinic';

const DoctorStoryModal = ({ isOpen, onClose, doctor }) => {
    if (!doctor) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8">
                    {/* Backdrop Trigger */}
                    <div className="absolute inset-0" onClick={onClose}></div>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-sm md:max-w-md bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-800 aspect-[9/16] flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
                        >
                            <X size={20} />
                        </button>

                        {/* Story Progress Bar Simulation */}
                        <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
                            <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 15, ease: "linear" }} // Simulated 15s story
                                    className="h-full bg-white"
                                />
                            </div>
                        </div>

                        {/* Video/Image Placeholder */}
                        <div className="relative flex-1 bg-gray-800">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                            {/* Play Button Simulation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                </div>
                            </div>

                            {/* Info & CTA */}
                            <div className="absolute bottom-0 left-0 w-full p-6 pb-8 z-20 text-center">
                                <div className="inline-block px-3 py-1 bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                                    Conheça o Especialista
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 font-display">
                                    {doctor.name}
                                </h3>
                                <p className="text-blue-200 mb-6 font-medium">
                                    {doctor.specialty}
                                </p>

                                <a
                                    href={getWhatsAppLink(`Olá, gostaria de agendar uma consulta com ${doctor.name}`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <Calendar size={20} />
                                    Agendar Consulta Agora
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DoctorStoryModal;
