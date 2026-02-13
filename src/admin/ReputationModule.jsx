import React from 'react';
import { MessageSquare, Star, ArrowUpRight, AlertTriangle, CheckCircle, Search } from 'lucide-react';

const mockReviews = [
    { id: 1, name: 'Cláudia Martins', rating: 5, date: '10 Fev 2026', content: 'Atendimento excelente! Dr. Lucas foi muito atencioso.', platform: 'Google', sentiment: 'positive' },
    { id: 2, name: 'Paulo Silva', rating: 2, date: '09 Fev 2026', content: 'Demorou muito para ser atendido, mesmo com horário marcado.', platform: 'Internal', sentiment: 'negative' },
    { id: 3, name: 'Carla Gomes', rating: 5, date: '08 Fev 2026', content: 'A clínica é linda e super limpa. Recomendo.', platform: 'Google', sentiment: 'positive' },
    { id: 4, name: 'Roberto Dias', rating: 4, date: '08 Fev 2026', content: 'Gostei bastante, mas o estacionamento estava cheio.', platform: 'Google', sentiment: 'positive' },
    { id: 5, name: 'Mariana Alves', rating: 1, date: '05 Fev 2026', content: 'Não consegui falar no telefone o dia todo.', platform: 'Internal', sentiment: 'negative' },
];

const ReputationModule = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Reputação & Feedback</h2>
                    <p className="text-gray-500 text-sm mt-1">Gerencie o que falam sobre sua clínica.</p>
                </div>

                <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full md:w-64">
                    <Search className="text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar review..."
                        className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    />
                </div>
            </div>

            <div className="divide-y divide-gray-50">
                {mockReviews.map((review) => (
                    <div key={review.id} className={`p-6 transition-colors hover:bg-gray-50 ${review.sentiment === 'negative' ? 'bg-red-50/30' : ''}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-sm ${review.sentiment === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {review.rating}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mb-2 mt-0.5 space-x-2">
                                        <span>{review.date}</span>
                                        <span>•</span>
                                        <span className={`font-medium ${review.platform === 'Google' ? 'text-blue-600' : 'text-gray-600'}`}>{review.platform}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed max-w-2xl">"{review.content}"</p>
                                </div>
                            </div>

                            <div className="hidden md:flex flex-col items-end space-y-2">
                                {review.sentiment === 'negative' ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                        <AlertTriangle className="w-3 h-3 mr-1.5" />
                                        Crítico
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        <CheckCircle className="w-3 h-3 mr-1.5" />
                                        Público
                                    </span>
                                )}
                                {review.sentiment === 'negative' && (
                                    <button className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline">
                                        Responder Privado
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReputationModule;
