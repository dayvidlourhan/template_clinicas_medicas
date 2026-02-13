import React, { useState } from 'react';
import { StaggerContainer, StaggerItem } from './ui/StaggerReveal';
import ReviewModal from './ReviewModal';

const testimonials = [
    {
        name: "Maria Aparecida",
        text: "O atendimento foi excelente, as doutoras são muito atenciosas e o ambiente é super acolhedor. Recomendo demais!",
        stars: 5,
        initials: "MA"
    },
    {
        name: "João Oliveira",
        text: "Fiquei impressionado com a agilidade e o profissionalismo. Consegui marcar minha consulta super rápido pelo WhatsApp.",
        stars: 5,
        initials: "JO"
    },
    {
        name: "Fernanda Souza",
        text: "Melhor clínica da região! Levei meu filho para o pediatra e fomos muito bem tratados do início ao fim.",
        stars: 5,
        initials: "FS"
    }
];

const Testimonials = () => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    return (
        <section id="testimonials" className="py-20 bg-[#EFF6FF]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4 border border-blue-200">
                        FEEDBACK
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
                        Depoimentos
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        O que dizem sobre nós
                    </p>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <StaggerItem
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-blue-50"
                        >
                            {/* Stars */}
                            <div className="flex mb-4">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-400 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Text Content - Flex grow ensures footer aligns at bottom */}
                            <blockquote className="text-gray-700 mb-8 flex-grow leading-relaxed">
                                "{testimonial.text}"
                            </blockquote>

                            {/* User Avatar & Name */}
                            <div className="flex items-center pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold text-sm mr-3 shrink-0 uppercase tracking-wide">
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <div className="font-bold text-[#1E3A8A] text-sm md:text-base">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Paciente Verificado
                                    </div>
                                </div>
                            </div>

                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-100 text-blue-800 font-bold hover:bg-blue-200 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        Avalie sua Experiência
                    </button>
                </div>
            </div>

            <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />
        </section>
    );
};

export default Testimonials;
