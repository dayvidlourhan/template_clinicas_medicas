// ✅ CENTRAL DE CONFIGURAÇÃO DA CLÍNICA
// Altere apenas aqui e todo o site será atualizado.

export const clinicConfig = {
    // 📞 WhatsApp Principal (Recepação/Agendamento)
    // Formato: 55 + DDD + Número (ex: 5562999999999)
    whatsapp: "5594999999999",

    // ⭐ Link do Google Maps para Avaliações
    // Pesquise sua empresa no Google, clique em "Pedir Avaliações" e cole o link aqui.
    googleMapsLink: "https://www.google.com/maps",

    // 📍 Endereço e Contato
    email: "contato@medcarebelem.com",
    address: "Av. Visconde de Souza Franco, 1234 - Umarizal, Belém - PA",
    phoneDisplay: "(94) 99999-9999", // Número fixo para exibir na tela

    // 📧 E-mail para currículos
    careersEmail: "rh@medcare.com"
};

// 🛠️ Função auxiliar para gerar link do WhatsApp
export const getWhatsAppLink = (message, number = clinicConfig.whatsapp) => {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
