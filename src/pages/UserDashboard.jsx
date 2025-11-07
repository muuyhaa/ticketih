import React, { useState } from 'react';
import { Ticket, Plus, User, Menu, X, LogOut, Clock, CheckCircle, History } from 'lucide-react';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('unresolved');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'Moyenne',
    Service: 'Support IT'
  });

  const userInfo = {
    name: 'Utilisateur Mohammed',
    role: 'UTILISATEUR'
  };

  const [unresolvedTickets, setUnresolvedTickets] = useState([
    {
      id: 'T-2045',
      title: "Problème d'accès au système",
      description: "Je n'arrive pas à me connecter au système depuis ce matin. Message d'erreur: accès refusé.",
      priority: 'Haute',
      status: 'En cours',
      Service: 'Gestion des accès',
      createdAt: '2024-10-14'
    },
    {
      id: 'T-2042',
      title: 'Demande de formation logiciel',
      description: 'Je souhaite suivre une formation sur le nouveau logiciel de gestion.',
      priority: 'Moyenne',
      status: 'Ouvert',
      Service: 'Formation',
      createdAt: '2024-10-13'
    },
    {
      id: 'T-2038',
      title: 'Installation nouvel équipement',
      description: "Demande d'installation d'un nouvel ordinateur dans le bureau 205.",
      priority: 'Basse',
      status: 'En attente',
      Service: 'Équipement',
      createdAt: '2024-10-12'
    }
  ]);

  const historyTickets = [
    {
      id: 'T-2035',
      title: 'Réinitialisation mot de passe',
      description: 'Mot de passe oublié, besoin de réinitialisation urgente.',
      priority: 'Haute',
      status: 'Résolu',
      Service: 'Support IT',
      createdAt: '2024-10-10',
      resolvedAt: '2024-10-10',
      resolvedBy: 'Agent Ahmed'
    },
    {
      id: 'T-2030',
      title: 'Problème imprimante',
      description: "L'imprimante du 3ème étage ne fonctionne plus.",
      priority: 'Moyenne',
      status: 'Résolu',
      Service: 'Équipement',
      createdAt: '2024-10-08',
      resolvedAt: '2024-10-09',
      resolvedBy: 'Agent Fatima'
    },
    {
      id: 'T-2025',
      title: 'Demande licence logiciel',
      description: 'Besoin d\'une licence pour Adobe Photoshop.',
      priority: 'Moyenne',
      status: 'Résolu',
      Service: 'Logiciel',
      createdAt: '2024-10-05',
      resolvedAt: '2024-10-07',
      resolvedBy: 'Agent Mohammed'
    },
    {
      id: 'T-2020',
      title: 'Configuration email',
      description: 'Configuration de la messagerie professionnelle sur le nouveau téléphone.',
      priority: 'Basse',
      status: 'Résolu',
      Service: 'Support IT',
      createdAt: '2024-10-01',
      resolvedAt: '2024-10-02',
      resolvedBy: 'Agent Sarah'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      Urgente: 'bg-red-100 text-red-800 border-red-300',
      Haute: 'bg-amber-100 text-orange-800 border-orange-300',
      Moyenne: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      Basse: 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return colors[priority] || colors['Moyenne'];
  };

  const getStatusColor = (status) => {
    const colors = {
      Ouvert: 'bg-blue-100 text-blue-800',
      'En cours': 'bg-yellow-100 text-yellow-800',
      'En attente': 'bg-amber-100 text-orange-800',
      Résolu: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors['Ouvert'];
  };

  const generateTicketId = () => {
    const maxId = Math.max(...unresolvedTickets.map((t) => parseInt(t.id.split('-')[1])), 2000);
    return `T-${maxId + 1}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleCreateTicket = () => {
    if (!newTicket.title.trim()) {
      return;
    }

    const createdTicket = {
      id: generateTicketId(),
      title: newTicket.title,
      description: newTicket.description,
      priority: newTicket.priority,
      status: 'Ouvert',
      Service: newTicket.Service,
      createdAt: getCurrentDate()
    };

    setUnresolvedTickets([createdTicket, ...unresolvedTickets]);
    setSuccessMessage('Ticket créé avec succès!');
    setTimeout(() => setSuccessMessage(''), 5000);

    setShowCreateTicket(false);
    setNewTicket({ title: '', description: '', priority: 'Moyenne', Service: 'Support IT' });
    setActiveView('unresolved');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-amber-800 overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">TICKET'IH</h1>
          </div>

          <div className="mb-6">
            <p className="text-xs text-orange-200 uppercase mb-3 font-semibold tracking-wide">GENERAL</p>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveView('unresolved')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${
                  activeView === 'unresolved' ? 'bg-amber-800 text-white' : 'text-white hover:bg-amber-800'
                }`}
              >
                <Clock size={20} />
                <span>Mes Tickets</span>
              </button>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-orange-600">
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
              className="text-orange-700 hover:text-orange-600 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Mes Tickets</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateTicket(true)}
              className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <Plus size={18} />
              <span>Créer un ticket</span>
            </button>
            <div className="text-right mr-3">
              <p className="text-sm font-semibold text-gray-800">{userInfo.name}</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">{userInfo.role}</p>
            </div>
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors">
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

          {/* Tabs */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveView('unresolved')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${
                  activeView === 'unresolved' ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>Tickets non résolus ({unresolvedTickets.length})</span>
              </button>
              <button
                onClick={() => setActiveView('history')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${
                  activeView === 'history' ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <History className="w-5 h-5" />
                <span>Historique ({historyTickets.length})</span>
              </button>
            </div>
          </div>

          {/* Unresolved */}
          {activeView === 'unresolved' && (
            <div className="space-y-4">
              {unresolvedTickets.length === 0 ? (
                <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
                  <CheckCircle size={48} className="mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600">Aucun ticket non résolu</p>
                </div>
              ) : (
                unresolvedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white p-6 rounded-lg border border-gray-200 hover:border-orange-300 transition shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-sm font-mono text-gray-600 font-semibold">{ticket.id}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">{ticket.title}</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Service:</span>
                            <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium">
                              {ticket.Service}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Créé le:</span>
                            <span className="text-gray-700 font-medium">{ticket.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="bg-amber-700 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition font-medium"
                      >
                        Voir détails
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* History */}
          {activeView === 'history' && (
            <div className="space-y-4">
              {historyTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 transition shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-sm font-mono text-gray-600 font-semibold">{ticket.id}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 inline mr-1" /> Résolu
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{ticket.title}</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Service:</span>
                          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium">
                            {ticket.Service}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Résolu par:</span>
                          <span className="text-gray-700 font-medium">{ticket.resolvedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Créé le:</span>
                          <span className="text-gray-700 font-medium">{ticket.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Résolu le:</span>
                          <span className="text-green-700 font-medium">{ticket.resolvedAt}</span>
                        </div>
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
          )}
        </div>
      </div>

      {/* Modal Create Ticket */}
      {showCreateTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Créer un nouveau ticket</h2>
                <button onClick={() => setShowCreateTicket(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre du ticket *</label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Décrivez brièvement le problème..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
                  <textarea
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    placeholder="Fournissez tous les détails nécessaires..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service de problème</label>
                  <select
                    value={newTicket.Service}
                    onChange={(e) => setNewTicket({ ...newTicket, Service: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-gray-50"
                  >
                    <option value="Support IT">Problème de diplôme</option>
                    <option value="Gestion des accès">Mot de passe oublié du compte académique</option>
                    <option value="Formation">Problème d'accès à la plateforme</option>
                    <option value="Équipement">Question administrative</option>
                    <option value="Logiciel">Support technique</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateTicket(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
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

      {/* Modal Ticket Details */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Détails du ticket</h2>
                <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Ticket ID and Status */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <span className="text-lg font-mono text-gray-800 font-bold">{selectedTicket.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                      selectedTicket.priority
                    )}`}
                  >
                    {selectedTicket.priority}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      selectedTicket.status
                    )}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Titre</label>
                  <p className="text-lg font-semibold text-gray-800">{selectedTicket.title}</p>
                </div>

                {/* Description */}
                {selectedTicket.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {selectedTicket.description}
                    </p>
                  </div>
                )}

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Service</label>
                  <span className="inline-block px-3 py-1 rounded bg-gray-100 text-gray-700 font-medium">
                    {selectedTicket.Service}
                  </span>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Date de création</label>
                    <p className="text-gray-800 font-medium">{selectedTicket.createdAt}</p>
                  </div>
                  {selectedTicket.resolvedAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Date de résolution</label>
                      <p className="text-green-700 font-medium">{selectedTicket.resolvedAt}</p>
                    </div>
                  )}
                </div>

                {/* Resolved By */}
                {selectedTicket.resolvedBy && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Résolu par</label>
                    <p className="text-gray-800 font-medium">{selectedTicket.resolvedBy}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;