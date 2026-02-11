import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Início', href: '#inicio' },
        { name: 'Sobre', href: '#sobre' },
        { name: 'Especialidades', href: '#especialidades' },
        { name: 'Médicos', href: '#doctors' },
        { name: 'Contato', href: '#contato' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
            {/* Top Bar - Optional Trust Builder */}
            <div className="hidden md:flex justify-between items-center px-6 lg:px-12 py-2 bg-gray-50 border-b border-gray-100 text-xs text-gray-600 font-medium">
                <div className="flex gap-6">
                    <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                        <Phone size={14} className="text-secondary" /> (62) 9999-9999
                    </span>
                    <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                        <Mail size={14} className="text-secondary" /> contato@medcare.com
                    </span>
                </div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-primary transition-colors">Carreiras</a>
                    <a href="#" className="hover:text-primary transition-colors">Portal do Paciente</a>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M12 6v12m-6-6h12" />
                        </svg>
                    </div>
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
                            className="text-gray-600 hover:text-primary font-medium text-sm transition-colors relative group py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                        Agendar Consulta
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-600 hover:text-primary font-medium py-2 border-b border-gray-50 last:border-0"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-lg shadow-primary/20 mt-2">
                        Agendar Consulta
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
