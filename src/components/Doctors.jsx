import React, { useState } from 'react';
import { StaggerContainer, StaggerItem } from './ui/StaggerReveal';
import { Play } from 'lucide-react';
import DoctorStoryModal from './DoctorStoryModal';

const doctors = [
    {
        name: "Dr. Roberto Silva",
        specialty: "Cardiologista",
        crm: "12345-GO",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        name: "Dra. Ana Costa",
        specialty: "Dermatologista",
        crm: "67890-GO",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        name: "Dr. Carlos Santos",
        specialty: "Ortopedista",
        crm: "11223-GO",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        name: "Dra. Mariana Lima",
        specialty: "Pediatra",
        crm: "44556-GO",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
    }
];

const Doctors = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    return (
        <section id="doctors" className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
                        ESPECIALISTAS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                        Nosso Corpo Clínico
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Médicos experientes e histórias reais. Clique para conhecer.
                    </p>
                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {doctors.map((doctor, index) => (
                        <StaggerItem key={index} className="flex flex-col items-center group relative z-10">

                            {/* Doctor Image Container with decorative background shapes */}
                            {/* Doctor Image Container with decorative background shapes */}
                            <div className="relative mb-6 cursor-pointer" onClick={() => setSelectedDoctor(doctor)}>
                                {/* Gradient Ring Animation */}
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-400 via-cyan-400 to-blue-600 opacity-75 blur-sm animate-pulse group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative w-64 h-64 md:w-full md:aspect-square overflow-hidden rounded-full border-4 border-white shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                        width="300"
                                        height="300"
                                        decoding="async"
                                    />
                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                                </div>

                                {/* Play Button Badge */}
                                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20 bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-50 transform group-hover:scale-110 transition-transform duration-300">
                                    <Play size={20} fill="currentColor" className="ml-1" />
                                </div>
                            </div>

                            {/* Text Info */}
                            <h3 className="text-xl font-bold text-[#1E3A8A] mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                {doctor.name}
                                <div className="bg-blue-100 rounded-full p-0.5" title="Médico Verificado">
                                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </h3>
                            <p className="text-gray-500 font-medium mb-2">
                                {doctor.specialty}
                            </p>
                            <div className="text-xs text-gray-400 border border-gray-100 bg-gray-50 px-3 py-1 rounded-full">
                                CRM: {doctor.crm}
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>

            <DoctorStoryModal
                isOpen={!!selectedDoctor}
                onClose={() => setSelectedDoctor(null)}
                doctor={selectedDoctor}
            />
        </section>
    );
};

export default Doctors;
