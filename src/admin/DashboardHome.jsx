import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, LayoutDashboard, Star, DollarSign, MessageCircle, Activity } from 'lucide-react';
import { leadService } from '../services/leadService';
import { activityService } from '../services/activityService';
// import { reputationService } from '../services/reputationService'; // Future integration

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-all hover:shadow-md">
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('500', '100')} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
    </div>
);

const DashboardHome = () => {
    const [stats, setStats] = useState({
        totalLeads: 0,
        leadsToday: 0,
        pending: 0,
        revenue: 0 // Mocked for now
    });
    const [activities, setActivities] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        loadDashboardData();
        const interval = setInterval(loadDashboardData, 10000); // Live update
        return () => clearInterval(interval);
    }, []);

    const loadDashboardData = () => {
        // 1. Get Lead Stats
        const leadStats = leadService.getStats();

        // 2. Get Activities
        const recentActivities = activityService.getAll().slice(0, 5);
        setActivities(recentActivities);

        // 3. Prepare Chart Data (Mocking daily distribution based on total for visual effect)
        // In a real app, we would aggregate leads by date from leadService.getAll()
        const allLeads = leadService.getAll();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        const chart = last7Days.map(date => ({
            name: new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' }),
            leads: allLeads.filter(l => l.date.startsWith(date)).length
        }));
        setChartData(chart);

        setStats({
            totalLeads: leadStats.total,
            leadsToday: leadStats.today,
            pending: leadStats.pending,
            revenue: leadStats.converted * 150 // Assuming R$ 150 per consultation for estimation
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Leads Hoje"
                    value={stats.leadsToday}
                    icon={Users}
                    color="text-blue-500"
                    subtext={`${stats.totalLeads} total acumulado`}
                />
                <StatCard
                    title="Pendentes"
                    value={stats.pending}
                    icon={MessageCircle}
                    color="text-green-500"
                    subtext="Aguardando retorno"
                />
                <StatCard
                    title="Avaliação Média"
                    value="4.8"
                    icon={Star}
                    color="text-yellow-500"
                    subtext="Baseado em 12 reviews"
                />
                <StatCard
                    title="Faturamento Est."
                    value={`R$ ${stats.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-purple-500"
                    subtext="Baseado em agendamentos"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Fluxo de Leads (Últimos 7 dias)</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#1F2937' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="leads"
                                    stroke="#2563EB"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                    animationDuration={1000}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Atividade Recente</h3>
                        <Activity className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {activities.length === 0 ? (
                            <p className="text-sm text-center text-gray-400 py-8">Nenhuma atividade recente.</p>
                        ) : (
                            activities.map((item) => (
                                <div key={item.id} className="flex items-start space-x-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0 animate-in slide-in-from-right-2 duration-300">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0 shadow-sm" />
                                    <div>
                                        <p className="text-sm text-gray-800">
                                            <span className="font-semibold">{item.user}</span>: {item.action}
                                        </p>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">
                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
