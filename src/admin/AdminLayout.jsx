import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Star, Settings, Bell, Search, User, Trash2, Menu, X } from 'lucide-react';
import { notificationService } from '../services/notificationService';

const AdminLayout = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
        { name: 'Pacientes', path: '/admin/pacientes', icon: Users },
        { name: 'Médicos', path: '/admin/medicos', icon: UserPlus },
        { name: 'Avaliações', path: '/admin/avaliacoes', icon: Star },
        { name: 'Configurações', path: '/admin/configuracoes', icon: Settings },
    ];

    const loadNotifications = () => {
        const data = notificationService.getAll();
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
    };

    useEffect(() => {
        loadNotifications();

        // Listen for system events
        const handleUpdate = () => loadNotifications();
        window.addEventListener('notification-update', handleUpdate);

        // Poll as backup
        const interval = setInterval(loadNotifications, 5000);

        return () => {
            window.removeEventListener('notification-update', handleUpdate);
            clearInterval(interval);
        };
    }, []);

    const handleMarkAsRead = (id) => {
        notificationService.markAsRead(id);
    };

    const handleDeleteNotification = (e, id) => {
        e.stopPropagation();
        notificationService.delete(id);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 border-r border-blue-800 flex-shrink-0 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-blue-800">
                    <span className="text-xl font-bold text-white tracking-tight">Medica Admin</span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${isActive
                                    ? 'bg-blue-800 text-white'
                                    : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5 mr-3 opacity-75 group-hover:opacity-100 transition-opacity" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-blue-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold text-white">
                            JD
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">João Doutor</p>
                            <p className="text-xs text-blue-200">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm z-30 relative">
                    <div className="flex items-center flex-1">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="max-w-md w-full relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Buscar pacientes, médicos..."
                            />
                        </div>
                    </div>

                    <div className="ml-4 flex items-center md:ml-6 space-x-4 relative">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative transition-colors"
                            >
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-6 w-6" />
                                {unreadCount > 0 && (
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                                        <h3 className="text-sm font-semibold text-gray-700">Notificações ({unreadCount})</h3>
                                        {unreadCount > 0 && (
                                            <span
                                                onClick={() => handleMarkAsRead('all')}
                                                className="text-xs text-blue-600 cursor-pointer hover:underline"
                                            >
                                                Marcar todas lidas
                                            </span>
                                        )}
                                    </div>
                                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <p className="text-xs text-gray-400 text-center py-4">Nenhuma notificação.</p>
                                        ) : (
                                            notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    onClick={() => handleMarkAsRead(n.id)}
                                                    className={`px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer flex gap-3 ${!n.read ? 'bg-blue-50/30' : ''}`}
                                                >
                                                    <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                                    <div className="flex-1">
                                                        <p className={`text-sm text-gray-800 ${!n.read ? 'font-semibold' : ''}`}>{n.title}</p>
                                                        <p className="text-xs text-gray-500">{n.message}</p>
                                                        <p className="text-[10px] text-gray-400 mt-1">
                                                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                    <button onClick={(e) => handleDeleteNotification(e, n.id)} className="text-gray-300 hover:text-red-500">
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="px-4 py-2 border-t border-gray-50 text-center">
                                        <NavLink to="/admin" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Ver todas</NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative ml-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowProfileMenu(!showProfileMenu);
                                }}
                                className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform active:scale-95"
                            >
                                <User className="h-5 w-5" />
                            </button>

                            {showProfileMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowProfileMenu(false)}
                                    />
                                    <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 origin-top-right">
                                        <div className="px-4 py-3 border-b border-gray-50">
                                            <p className="text-sm font-semibold text-gray-900">João Doutor</p>
                                            <p className="text-xs text-gray-500 truncate">admin@medica.com</p>
                                        </div>
                                        <NavLink
                                            to="/admin/configuracoes"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Configurações
                                        </NavLink>
                                        <button
                                            onClick={() => {
                                                window.location.href = '/login';
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Sair do Sistema
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-0">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-blue-900 border-r border-blue-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-blue-800">
                    <span className="text-xl font-bold text-white tracking-tight">Medica Admin</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-blue-200 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.exact}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${isActive
                                    ? 'bg-blue-800 text-white'
                                    : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5 mr-3 opacity-75 group-hover:opacity-100 transition-opacity" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-blue-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold text-white">
                            JD
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">João Doutor</p>
                            <p className="text-xs text-blue-200">Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
