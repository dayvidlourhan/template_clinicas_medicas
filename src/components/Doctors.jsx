import React from 'react';
import { StaggerContainer, StaggerItem } from './ui/StaggerReveal';

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
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Médicos experientes prontos para cuidar de você.
                    </p>
                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {doctors.map((doctor, index) => (
                        <StaggerItem key={index} className="flex flex-col items-center group relative z-10">

                            {/* Doctor Image Container with decorative background shapes */}
                            <div className="relative mb-6">
                                {/* Decorative Square (Rotated) */}
                                <div className="absolute top-4 -right-4 w-full h-full border-2 border-blue-100 rounded-2xl -z-10 group-hover:rotate-6 transition-transform duration-500"></div>

                                {/* Decorative Dots */}
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 opacity-30 -z-10">
                                    <div className="w-full h-full bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:6px_6px]"></div>
                                </div>

                                {/* Decorative Circle Blur (Subtle Glow) */}
                                <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>

                                <div className="w-64 h-64 md:w-full md:aspect-square overflow-hidden rounded-2xl shadow-sm transition-all duration-300 bg-gray-50 card-premium-hover">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                        width="300"
                                        height="300"
                                        decoding="async"
                                    />
                                </div>
                            </div>

                            {/* Text Info */}
                            <h3 className="text-xl font-bold text-[#1E3A8A] mb-1 group-hover:text-blue-600 transition-colors">
                                {doctor.name}
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
        </section>
    );
};

export default Doctors;
