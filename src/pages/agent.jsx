import React, { useState } from 'react';
import { LayoutDashboard, Ticket, MessageSquare, Plus, User, Menu, X, LogOut, Filter, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AgentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterView, setFilterView] = useState('unassigned');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'it'
  });

  const stats = {
    assignedToMe: 8,
    unassigned: 15,
    myTickets: 6,
    resolvedByMe: 45
  };

  const chartData = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aug', value: 1 },
    { month: 'Sept', value: 2 },
    { month: 'Oct', value: 3 },
    { month: 'Nov', value: 3 },
    { month: 'Dec', value: 0 }
  ];

  const [unassignedTickets, setUnassignedTickets] = useState([
    { id: 'T-1024', title: 'Problème de connexion réseau', description: 'Impossible de se connecter au réseau Wi-Fi depuis ce matin.', priority: 'high', createdAt: '2024-10-12', department: 'IT' },
    { id: 'T-1025', title: 'Installation nouveau logiciel', description: 'Besoin d\'installer le logiciel de comptabilité sur 5 postes.', priority: 'medium', createdAt: '2024-10-12', department: 'Support' },
    { id: 'T-1026', title: 'Erreur système de paiement', description: 'Le système affiche une erreur 500 lors des transactions.', priority: 'urgent', createdAt: '2024-10-13', department: 'Finance' },
    { id: 'T-1027', title: 'Mise à jour base de données', description: 'Besoin de migrer les données vers le nouveau serveur.', priority: 'low', createdAt: '2024-10-13', department: 'IT' },
    { id: 'T-1028', title: 'Configuration serveur email', description: 'Configurer les comptes emails pour les nouveaux employés.', priority: 'medium', createdAt: '2024-10-13', department: 'IT' }
  ]);

  const [assignedToMeTickets, setAssignedToMeTickets] = useState([
    { id: 'T-1015', title: 'Réinitialisation mot de passe utilisateur', description: 'L\'utilisateur a oublié son mot de passe et ne peut plus accéder au système.', priority: 'high', status: 'in-progress', assignedAt: '2024-10-10', department: 'Support' },
    { id: 'T-1018', title: 'Problème imprimante bureau 302', description: 'L\'imprimante ne répond plus et affiche un message d\'erreur.', priority: 'medium', status: 'pending', assignedAt: '2024-10-11', department: 'IT' },
    { id: 'T-1020', title: 'Migration données client', description: 'Migration de 10GB de données vers le nouveau système cloud.', priority: 'urgent', status: 'in-progress', assignedAt: '2024-10-12', department: 'IT' },
    { id: 'T-1021', title: 'Formation logiciel comptabilité', description: 'Organiser une session de formation pour 15 employés.', priority: 'low', status: 'pending', assignedAt: '2024-10-12', department: 'Formation' }
  ]);

  const myCreatedTickets = [
    { id: 'T-1030', title: 'Besoin accès admin pour serveur production', description: 'Nécessite les droits administrateur pour effectuer la maintenance.', priority: 'high', status: 'open', createdAt: '2024-10-13', assignedTo: 'Admin Local' },
    { id: 'T-1029', title: 'Demande formation nouveau système', description: 'Formation sur le nouveau système de gestion des tickets.', priority: 'medium', status: 'pending', createdAt: '2024-10-12', assignedTo: 'Super Admin' },
    { id: 'T-1022', title: 'Problème licence logiciel', description: 'La licence Adobe a expiré, besoin de renouvellement.', priority: 'urgent', status: 'resolved', createdAt: '2024-10-10', assignedTo: 'Super Admin', resolvedAt: '2024-10-11', resolvedBy: 'Super Admin' }
  ];

  const userInfo = {
    name: 'Agent Mohammed',
    role: 'AGENT'
  };

  const maxValue = Math.max(...chartData.map(d => d.value)) || 1;

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800 border-red-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'pending': 'bg-amber-700 text-orange-800',
      'resolved': 'bg-green-100 text-green-800'
    };
    return colors[status] || colors.open;
  };

  const getStatusLabel = (status) => {
    const labels = {
      'open': 'Ouvert',
      'in-progress': 'En cours',
      'pending': 'En attente',
      'resolved': 'Résolu'
    };
    return labels[status] || status;
  };

  const handleCreateTicket = () => {
    if (!newTicket.title.trim()) {
      return;
    }

    const createdTicket = {
      id: `T-${Date.now()}`,
      title: newTicket.title,
      description: newTicket.description,
      priority: newTicket.priority,
      status: 'open',
      category: newTicket.category,
      createdAt: new Date().toISOString().split('T')[0],
      assignedTo: 'En attente d\'assignation'
    };

    setSuccessMessage('Ticket créé avec succès! Il sera automatiquement assigné selon le type de problème.');
    setTimeout(() => setSuccessMessage(''), 5000);

    setShowCreateTicket(false);
    setNewTicket({ title: '', description: '', priority: 'medium', category: 'it' });
  };

  const handleTakeTicket = (ticket) => {
    const updatedTicket = { ...ticket, status: 'in-progress', assignedAt: new Date().toISOString().split('T')[0] };
    setAssignedToMeTickets([updatedTicket, ...assignedToMeTickets]);
    setUnassignedTickets(unassignedTickets.filter(t => t.id !== ticket.id));
    setSuccessMessage(`Ticket ${ticket.id} pris en charge avec succès!`);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleResolveTicket = (ticket) => {
    setAssignedToMeTickets(assignedToMeTickets.filter(t => t.id !== ticket.id));
    setSuccessMessage(`Ticket ${ticket.id} marqué comme résolu!`);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-amber-800 overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">TICKET'IH</h1>
          </div>

          <div className="mb-6">
            <p className="text-xs text-amber-200 uppercase mb-3 font-semibold tracking-wide">MENU</p>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-amber-800 text-white' : 'text-white hover:bg-amber-800'}`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === 'tickets' ? 'bg-amber-800 text-white' : 'text-white hover:bg-amber-800'}`}
              >
                <Ticket size={20} />
                <span>Tickets</span>
              </button>
              <button
                onClick={() => setActiveTab('mytickets')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === 'mytickets' ? 'bg-amber-800 text-white' : 'text-white hover:bg-amber-800'}`}
              >
                <MessageSquare size={20} />
                <span>Mes tickets créés</span>
              </button>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-amber-600">
            <button
              onClick={() => {
                if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
                  window.location.href = '/login';
                }
              }}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-amber-800 rounded-lg text-white"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-amber-700 hover:text-amber-600 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'tickets' ? 'Tickets' : 'Mes tickets créés'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateTicket(true)}
              className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center gap-2 font-semibold"
            >
              <Plus size={18} />
              <span>Créer un ticket</span>
            </button>
            <div className="text-right mr-3">
              <p className="text-sm font-semibold text-gray-800">{userInfo.name}</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">{userInfo.role}</p>
            </div>
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-800 transition-colors">
              <User size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gray-50 min-h-full">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                     onClick={() => { setActiveTab('tickets'); setFilterView('assigned'); }}>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <p className="text-gray-700 text-sm font-medium">Assigned to me</p>
                  </div>
                  <p className="text-4xl font-bold text-amber-800">{stats.assignedToMe}</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                     onClick={() => { setActiveTab('tickets'); setFilterView('unassigned'); }}>
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle size={20} className="text-orange-600" />
                    <p className="text-gray-700 text-sm font-medium">Unassigned</p>
                  </div>
                  <p className="text-4xl font-bold text-amber-800">{stats.unassigned}</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                     onClick={() => setActiveTab('mytickets')}>
                  <div className="flex items-center gap-3 mb-2">
                    <Ticket size={20} className="text-blue-600" />
                    <p className="text-gray-700 text-sm font-medium">My Tickets</p>
                  </div>
                  <p className="text-4xl font-bold text-amber-800">{stats.myTickets}</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle size={20} className="text-green-600" />
                    <p className="text-gray-700 text-sm font-medium">Resolved by me</p>
                  </div>
                  <p className="text-4xl font-bold text-amber-800">{stats.resolvedByMe}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Tickets resolved by me this year</h3>
                <div className="relative h-64">
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-4">
                    <span>{Math.ceil(maxValue)}</span>
                    <span>{Math.ceil(maxValue * 0.83)}</span>
                    <span>{Math.ceil(maxValue * 0.67)}</span>
                    <span>{Math.ceil(maxValue * 0.5)}</span>
                    <span>{Math.ceil(maxValue * 0.33)}</span>
                    <span>{Math.ceil(maxValue * 0.17)}</span>
                    <span>0</span>
                  </div>

                  <div className="ml-10 h-full flex items-end justify-between gap-2">
                    {chartData.map((item, index) => {
                      const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group">
                          <div className="relative">
                            {item.value > 0 && (
                              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-amber-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {item.value} ticket{item.value > 1 ? 's' : ''}
                              </div>
                            )}
                            <div
                              className="w-full bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg transition-all duration-300 hover:from-amber-700 hover:to-amber-500 cursor-pointer"
                              style={{ height: height > 0 ? `${height * 2.4}px` : '0px', minHeight: height > 0 ? '4px' : '0px' }}
                            ></div>
                          </div>
                          <div className="mt-2 text-xs text-gray-600 font-medium">{item.month}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'tickets' && (
            <>
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setFilterView('unassigned')}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        filterView === 'unassigned' ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4" />
                        <span>Non assignés ({unassignedTickets.length})</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setFilterView('assigned')}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        filterView === 'assigned' ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Assignés à moi ({assignedToMeTickets.length})</span>
                      </div>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Rechercher un ticket..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm w-64"
                    />
                  </div>
                </div>
              </div>

              {filterView === 'unassigned' && (
                <div className="space-y-4">
                  {unassignedTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-amber-300 transition shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-sm font-mono text-gray-600 font-semibold">{ticket.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.toUpperCase()}
                            </span>
                            <span className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                              {ticket.department}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{ticket.title}</h3>
                          <p className="text-sm text-gray-500">Créé le {ticket.createdAt}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-medium"
                          >
                            Voir détails
                          </button>
                          <button
                            onClick={() => handleTakeTicket(ticket)}
                            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition font-medium"
                          >
                            Prendre en charge
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filterView === 'assigned' && (
                <div className="space-y-4">
                  {assignedToMeTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-amber-300 transition shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-sm font-mono text-gray-600 font-semibold">{ticket.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                              {getStatusLabel(ticket.status)}
                            </span>
                            <span className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                              {ticket.department}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{ticket.title}</h3>
                          <p className="text-sm text-gray-500">Assigné le {ticket.assignedAt}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                          >
                            Voir détails
                          </button>
                          <button
                            onClick={() => handleResolveTicket(ticket)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                          >
                            Marquer résolu
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'mytickets' && (
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Mes tickets créés</h2>
              <p className="text-gray-600 mb-6">Tickets que j'ai créés et qui sont gérés par les administrateurs</p>

              <div className="space-y-4">
                {myCreatedTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 p-6 rounded-lg hover:border-amber-300 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-sm font-mono text-gray-600 font-semibold">{ticket.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                            {getStatusLabel(ticket.status)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">{ticket.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Créé le {ticket.createdAt}</span>
                          <span>•</span>
                          <span>Assigné à: {ticket.assignedTo}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition font-medium"
                      >
                        Voir détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Créer un nouveau ticket</h2>
                <button
                  onClick={() => setShowCreateTicket(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre du ticket *</label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                    placeholder="Décrivez brièvement le problème..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
                  <textarea
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                    placeholder="Fournissez tous les détails nécessaires..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de problème</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent bg-gray-50"
                  >
                    <option value="it">Problème de diplôme</option>
                    <option value="access">Mot de passe oublié du compte académique</option>
                    <option value="access">Mot de passe oublié du compte académique</option>
                    <option value="training">Problème d''accès à la plateforme</option>
                    <option value="equipment">Question administrative</option>
                    <option value="software">Support technique</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Le ticket sera automatiquement assigné à l'administrateur approprié en fonction du type de problème sélectionné.
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateTicket(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateTicket}
                    className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-700 transition font-medium"
                  >
                    Créer le ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;