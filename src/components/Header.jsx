import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import PatientPortalModal from './PatientPortalModal';
import { clinicConfig } from '../config/clinic';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPortalOpen, setIsPortalOpen] = useState(false);

    const navLinks = [
        { name: 'Início', href: '#inicio' },
        { name: 'Sobre', href: '#sobre' },
        { name: 'Especialidades', href: '#especialidades' },
        { name: 'Médicos', href: '#doctors' },
        { name: 'Contato', href: '#contato' },
    ];

    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const handleCarreiras = (e) => {
        e.preventDefault();
        window.location.href = `mailto:${clinicConfig.careersEmail}?subject=Currículo pelo Site`;
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-white/95 md:bg-white/90 backdrop-blur-none md:backdrop-blur-md shadow-sm transition-all duration-300">
                {/* Top Bar - Optional Trust Builder */}
                <div className="hidden md:flex justify-between items-center px-6 lg:px-12 py-2 bg-gray-50 border-b border-gray-100 text-xs text-gray-600 font-medium">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                            <Phone size={14} className="text-secondary" /> {clinicConfig.phoneDisplay}
                        </span>
                        <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                            <Mail size={14} className="text-secondary" /> {clinicConfig.email}
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" onClick={handleCarreiras} className="hover:text-primary transition-colors">Carreiras</a>
                        <button onClick={() => setIsPortalOpen(true)} className="hover:text-primary transition-colors">Portal do Paciente</button>
                    </div>
                </div>

                {/* Main Navbar */}
                <div className="container mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img src="/favicon.svg" alt="MedCare Logo" className="w-12 h-12 object-contain" />
                        <span className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                            Med<span className="text-primary">Care</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="text-gray-600 hover:text-primary font-medium text-sm transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={(e) => handleScroll(e, '#checkin')}
                            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Agendar Consulta
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 min-h-screen">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="text-gray-700 hover:text-primary font-bold text-lg py-3 border-b border-gray-50 last:border-0 flex justify-between items-center group"
                            >
                                {link.name}
                                <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
                            </a>
                        ))}

                        <div className="mt-4 space-y-3">
                            <button
                                onClick={(e) => handleScroll(e, '#checkin')}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Agendar Consulta
                            </button>

                            <button
                                onClick={() => { setIsMenuOpen(false); setIsPortalOpen(true); }}
                                className="w-full bg-gray-50 text-gray-700 py-4 rounded-xl font-bold text-lg border border-gray-200 hover:bg-gray-100 transition-all"
                            >
                                Portal do Paciente
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 mt-4 pt-6 border-t border-gray-100 text-sm text-gray-500">
                            <a href="#" onClick={handleCarreiras} className="flex items-center gap-2 py-2 hover:text-primary transition-colors">
                                <Mail size={16} /> Trabalhe Conosco
                            </a>
                            <div className="flex items-center gap-2 py-2">
                                <Phone size={16} /> {clinicConfig.phoneDisplay}
                            </div>
                        </div>

                        {/* Extra padding for bottom safe area */}
                        <div className="pb-24"></div>
                    </div>
                )}
            </header>

            <PatientPortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
        </>
    );
};

export default Header;
