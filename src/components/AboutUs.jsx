import React from 'react';
import { CheckCircle } from 'lucide-react';

const AboutUs = () => {
    return (
        <section className="pt-72 pb-24 lg:pt-64 lg:pb-32 bg-white overflow-hidden" id="sobre">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Column: Image with Shapes */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                        {/* Main Image Container */}
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 aspect-[4/3] group">
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2653&auto=format&fit=crop"
                                alt="Equipe da Clínica"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Geometric Shapes - Squares & Dots */}
                        {/* Top Left: Blue Dot Pattern */}
                        <div className="absolute -top-12 -left-12 w-24 h-24 pb-4 pr-4 flex flex-wrap gap-2 opacity-20 -z-10 rotate-3">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-secondary rounded-full"></div>
                            ))}
                        </div>

                        {/* Bottom Right: Solid Blue Block */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-3xl -rotate-6 -z-10"></div>

                        {/* Floating Circle Blur */}
                        <div className="absolute top-1/2 -right-12 w-24 h-24 bg-blue-400/20 rounded-full blur-xl -z-10"></div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex-1 space-y-8">
                        <div className="inline-block">
                            <span className="text-primary font-bold tracking-wider text-sm uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                                Quem Somos
                            </span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 leading-tight">
                            Excelência e humanização em <span className="text-primary">cada atendimento.</span>
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Há mais de 10 anos, nossa clínica é referência em saúde na região. Unimos tecnologia de ponta com um corpo clínico acolhedor, focado em resolver o problema da sua família com rapidez e carinho.
                        </p>

                        <ul className="space-y-4 pt-4">
                            {[
                                "Equipe Multidisciplinar",
                                "Estrutura Moderna e Acessível",
                                "Resultados de exames online"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                        <CheckCircle size={16} strokeWidth={3} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
