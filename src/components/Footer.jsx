import React from 'react';

const Footer = () => {
    return (
        <footer id="contato" className="bg-[#1E3A8A] text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Col 1: Brand */}
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                                {/* Logo Icon */}
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Clinicas Médicas</span>
                        </div>
                        <p className="text-gray-300 max-w-xs">
                            Sua saúde em primeiro lugar com atendimento humanizado e tecnologia de ponta.
                        </p>
                    </div>

                    {/* Col 2: Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-blue-500 pb-2 inline-block">
                            Fale Conosco
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-300">
                                <svg className="w-6 h-6 shrink-0 mt-0.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Rua das Flores, 123 - Centro<br />Goiânia - GO</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <svg className="w-6 h-6 shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>(62) 3333-3333</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <svg className="w-6 h-6 shrink-0 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <a href="https://wa.me/556233333333" className="hover:text-white transition-colors">
                                    Agendar no Zap
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white border-b-2 border-blue-500 pb-2 inline-block">
                            Links Rápidos
                        </h3>
                        <ul className="space-y-3">
                            {['Convênios', 'Sobre Nós', 'Política de Privacidade', 'Trabalhe Conosco'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all">
                                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-blue-700/50 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© 2026 Clínica Médica. Todos os direitos reservados.</p>
                    <p className="mt-2 md:mt-0">Desenvolvido por <span className="text-white font-medium">Dayvid Lourhan</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
