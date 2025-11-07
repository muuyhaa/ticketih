import React, { useState } from 'react';
import { LayoutDashboard, Ticket, Users, AlertCircle, FileText, Settings, LogOut, Download, Plus, Edit, Trash2, Search, BarChart3, UserCog } from 'lucide-react';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [myTickets, setMyTickets] = useState([]);
  const [newMyTicket, setNewMyTicket] = useState({
    subject: '',
    type: '',
    description: ''
  });
const [services, setServices] = useState([
  { id: 1, name: 'Département IT' },
  { id: 2, name: 'Département RH' },
  { id: 3, name: 'Département Financier' },
  { id: 4, name: 'Département Administratif' }
]);

const [ticketTypes, setTicketTypes] = useState([
  { id: 1, name: 'Problème d\'accès au compte académique' },
  { id: 2, name: 'Problème de diplôme' },
  { id: 3, name: 'Papiers demandés' },
  { id: 4, name: 'Carte étudiant perdue' },
  { id: 5, name: 'Mot de passe oublié' }
]);

const [showNewServiceModal, setShowNewServiceModal] = useState(false);
const [showNewTypeModal, setShowNewTypeModal] = useState(false);
const [newServiceName, setNewServiceName] = useState('');
const [newTypeName, setNewTypeName] = useState('');

  // Organisation de l'admin (simulé - viendra du backend après authentification)
  const adminOrganization = 'ENSA';
  
  const ticketStats = {
    waiting: 4,
    inProgress: 3,
    resolved: 42,
    avgTime: '2.8h'
  };

  const agentPerformance = [
    { name: 'Fatima Zahra', dept: 'Administratif', resolved: 38, avgTime: '2.2h' },
    { name: 'Youssef Alaoui', dept: 'IT', resolved: 28, avgTime: '2.5h' },
    { name: 'Sara Benjelloun', dept: 'Financier', resolved: 32, avgTime: '2.1h' }
  ];

  const monthlyData = [
    { month: 'Jan', tickets: 0 },
    { month: 'Fév', tickets: 0 },
    { month: 'Mar', tickets: 0 },
    { month: 'Avr', tickets: 0 },
    { month: 'Mai', tickets: 0 },
    { month: 'Juin', tickets: 0 },
    { month: 'Juil', tickets: 0 },
    { month: 'Août', tickets: 8 },
    { month: 'Sept', tickets: 15 },
    { month: 'Oct', tickets: 19 },
    { month: 'Nov', tickets: 16 }
  ];

  const agents = [
    { id: 1, name: 'Fatima Zahra', dept: 'Administratif', role: 'Agent', status: 'Actif' },
    { id: 2, name: 'Youssef Alaoui', dept: 'IT', role: 'Agent', status: 'Actif' },
    { id: 3, name: 'Sara Benjelloun', dept: 'Financier', role: 'Agent', status: 'Actif' },
    { id: 4, name: 'Karim Tazi', dept: 'IT', role: 'Agent', status: 'Inactif' }
  ];

  const priorities = [
    { level: 'Faible', value: 1, color: 'text-green-700' },
    { level: 'Moyen', value: 5, color: 'text-orange-700' },
    { level: 'Fort', value: 9, color: 'text-red-700' }
  ];

  const otherTickets = [
    { id: 1, subject: 'Demande d\'accès au laboratoire', user: 'etudiant1@ensa.ma', createdAt: '15/10/2025' },
    { id: 2, subject: 'Question sur l\'emploi du temps', user: 'etudiant2@ensa.ma', createdAt: '14/10/2025' },
    { id: 3, subject: 'Problème de connexion wifi', user: 'etudiant3@ensa.ma', createdAt: '14/10/2025' }
  ];

  const handleCreateMyTicket = () => {
    if (newMyTicket.subject && newMyTicket.type && newMyTicket.description) {
      const ticket = {
        id: myTickets.length + 1,
        subject: newMyTicket.subject,
        type: newMyTicket.type,
        description: newMyTicket.description,
        status: 'Ouvert',
        createdAt: new Date().toLocaleDateString('fr-FR'),
        updatedAt: 'À l\'instant'
      };
      setMyTickets([ticket, ...myTickets]);
      setNewMyTicket({ subject: '', type: '', description: '' });
      setShowNewTicketModal(false);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
          <p className="text-gray-600 mt-1">Organisation: {adminOrganization}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
          <Download size={18} />
          Exporter en PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Tickets en attente</h3>
          <p className="text-4xl font-bold text-gray-800">{ticketStats.waiting}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Tickets en cours</h3>
          <p className="text-4xl font-bold text-gray-800">{ticketStats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Tickets résolus</h3>
          <p className="text-4xl font-bold text-gray-800">{ticketStats.resolved}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Temps moyen de résolution</h3>
          <p className="text-4xl font-bold text-gray-800">{ticketStats.avgTime}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Tickets ouverts cette année - {adminOrganization}</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm">
            <Download size={16} />
            Exporter
          </button>
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {monthlyData.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-amber-600 rounded-t-lg transition-all hover:bg-amber-700"
                style={{ height: `${(data.tickets / 20) * 100}%`, minHeight: data.tickets > 0 ? '8px' : '0' }}
              />
              <span className="text-xs text-gray-600 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Performance des agents - {adminOrganization}</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm">
            <Download size={16} />
            Exporter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Département</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tickets résolus</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Temps moyen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agentPerformance.map((agent, idx) => (
                <tr key={idx} className="hover:bg-amber-50">
                  <td className="px-4 py-3 text-gray-800">{agent.name}</td>
                  <td className="px-4 py-3 text-gray-600">{agent.dept}</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">{agent.resolved}</td>
                  <td className="px-4 py-3 text-gray-600">{agent.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Gestion des tickets</h2>
        <p className="text-gray-600 mt-1">Organisation: {adminOrganization}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">En attente</h3>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">{ticketStats.waiting}</span>
          </div>
          <p className="text-gray-600 text-sm">Tickets nécessitant une action</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">En cours</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{ticketStats.inProgress}</span>
          </div>
          <p className="text-gray-600 text-sm">Tickets en traitement</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Résolus</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{ticketStats.resolved}</span>
          </div>
          <p className="text-gray-600 text-sm">Tickets terminés</p>
        </div>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Agents</h2>
          <p className="text-gray-600 mt-1">Organisation: {adminOrganization}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
          <Plus size={18} />
          Nouvel agent
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Département</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rôle</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.map(agent => (
              <tr key={agent.id} className="hover:bg-amber-50">
                <td className="px-6 py-4 text-gray-800">{agent.name}</td>
                <td className="px-6 py-4 text-gray-600">{agent.dept}</td>
                <td className="px-6 py-4 text-gray-600">{agent.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    agent.status === 'Actif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-amber-700 hover:bg-amber-50 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOtherTickets = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Autres tickets</h2>
        <p className="text-gray-600 mt-1">Tickets sans type prédéfini - {adminOrganization}</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {otherTickets.length === 0 ? (
          <div className="p-6">
            <p className="text-gray-600">Aucun ticket en attente d'assignation</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Objet</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Utilisateur</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Créé le</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {otherTickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 text-gray-800 font-medium">{ticket.subject}</td>
                    <td className="px-6 py-4 text-gray-600">{ticket.user}</td>
                    <td className="px-6 py-4 text-gray-600">{ticket.createdAt}</td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm">
                        Assigner
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderMyTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Mes tickets</h2>
        <button 
          onClick={() => setShowNewTicketModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
        >
          <Plus size={18} />
          Nouveau ticket
        </button>
      </div>

      {myTickets.length === 0 ? (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-gray-600">Aucun ticket personnel pour le moment</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Objet</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Créé le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-amber-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{ticket.subject}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{ticket.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{ticket.type}</td>
                  <td className="px-6 py-4 text-gray-700">{ticket.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">Créer un nouveau ticket</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Objet du ticket <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newMyTicket.subject}
                  onChange={(e) => setNewMyTicket({ ...newMyTicket, subject: e.target.value })}
                  placeholder="Ex: Problème d'accès à mon compte"
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Type de ticket <span className="text-red-500">*</span>
                </label>
                <select
                  value={newMyTicket.type}
                  onChange={(e) => setNewMyTicket({ ...newMyTicket, type: e.target.value })}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Problème de diplôme">Problème de diplôme</option>
                  <option value="Mot de passe oublié du compte académique">Mot de passe oublié du compte académique</option>
                  <option value="Problème d'accès à la plateforme">Problème d'accès à la plateforme</option>
                  <option value="Question administrative">Question administrative</option>
                  <option value="Support technique">Support technique</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Descriptif du problème <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newMyTicket.description}
                  onChange={(e) => setNewMyTicket({ ...newMyTicket, description: e.target.value })}
                  placeholder="Décrivez votre problème en détail..."
                  rows="6"
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewTicketModal(false);
                  setNewMyTicket({ subject: '', type: '', description: '' });
                }}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateMyTicket}
                disabled={!newMyTicket.subject || !newMyTicket.type || !newMyTicket.description}
                className="px-6 py-2.5 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Envoyer le ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Paramètres</h2>
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Organisation</label>
            <input type="text" className="w-full px-4 py-2 border border-amber-300 rounded-lg bg-gray-50" value={adminOrganization} disabled />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email de contact</label>
            <input type="email" className="w-full px-4 py-2 border border-amber-300 rounded-lg" defaultValue={`admin@${adminOrganization.toLowerCase()}.ma`} />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nom complet</label>
            <input type="text" className="w-full px-4 py-2 border border-amber-300 rounded-lg" defaultValue="Admin Local" />
          </div>
          <button className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
  
   const handleAddService = () => {
  if (newServiceName.trim()) {
    setServices([...services, { id: services.length + 1, name: newServiceName }]);
    setNewServiceName('');
    setShowNewServiceModal(false);
  }
};

const handleDeleteService = (id) => {
  setServices(services.filter(s => s.id !== id));
};

const handleAddType = () => {
  if (newTypeName.trim()) {
    setTicketTypes([...ticketTypes, { id: ticketTypes.length + 1, name: newTypeName }]);
    setNewTypeName('');
    setShowNewTypeModal(false);
  }
};

const handleDeleteType = (id) => {
  setTicketTypes(ticketTypes.filter(t => t.id !== id));
};

  const renderServices = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">Services / Départements</h2>
      <button 
        onClick={() => setShowNewServiceModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
      >
        <Plus size={18} />
        Nouveau service
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-amber-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom du service</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {services.map(service => (
            <tr key={service.id} className="hover:bg-amber-50">
              <td className="px-6 py-4 text-gray-800 font-medium">{service.name}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleDeleteService(service.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {showNewServiceModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Ajouter un nouveau service</h3>
          </div>
          
          <div className="p-6">
            <label className="block text-gray-700 font-medium mb-2">
              Nom du service <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newServiceName}
              onChange={(e) => setNewServiceName({ ...newMyTicket, subject: e.target.value })}
              placeholder="Ex: Département IT"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowNewServiceModal(false);
                setNewServiceName('');
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              onClick={handleAddService}
              disabled={!newServiceName.trim()}
              className="px-6 py-2.5 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

const renderTicketTypes = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">Types de tickets</h2>
      <button 
        onClick={() => setShowNewTypeModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
      >
        <Plus size={18} />
        Nouveau type
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-amber-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type de ticket</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ticketTypes.map(type => (
            <tr key={type.id} className="hover:bg-amber-50">
              <td className="px-6 py-4 text-gray-800 font-medium">{type.name}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleDeleteType(type.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {showNewTypeModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Ajouter un nouveau type</h3>
          </div>
          
          <div className="p-3"> 
            <label className="block text-gray-700 font-medium mb-2">
              Type de ticket <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              placeholder="Ex: Problème d'accès au compte académique"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="p-3">
            <label className="block text-gray-700 font-medium mb-2">
              Priorité <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              placeholder="Ex: Faible, Moyenne, Elevée, Critique"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="p-3">
            <label className="block text-gray-700 font-medium mb-2">
              Service <span className="text-red-500">*</span>
            </label>
                <select
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none bg-white"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Département Administratif">Département Administratif</option>
                  <option value="Département Financier">Département Financier</option>
                  <option value="Département RH">Département RH</option>
                  <option value="Département IT">Département IT</option>
                </select>
              </div>

          <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowNewTypeModal(false);
                setNewTypeName('');
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              onClick={handleAddType}
              disabled={!newTypeName.trim()}
              className="px-6 py-2.5 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard': return renderDashboard();
      case 'Tickets': return renderTickets();
      case 'Agents': return renderAgents();
      case 'Services': return renderServices();  // services
      case 'Types': return renderTicketTypes(); // tickets types
      case 'Autres Tickets': return renderOtherTickets();
      case 'Mes tickets': return renderMyTickets();
      case 'Paramètres': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gradient-to-b from-amber-900 to-amber-800 text-white">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center font-bold text-xl">
            T
          </div>
          <h1 className="text-xl font-bold">TICKET'IH</h1>
        </div>

        <nav className="mt-6">
          <div className="px-4 mb-2">
            <p className="text-amber-200 text-xs font-semibold uppercase tracking-wider">Général</p>
          </div>
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: Ticket, label: 'Tickets' },
            { icon: AlertCircle, label: 'Autres Tickets' },
            { icon: FileText, label: 'Mes tickets' }
          ].map(item => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-amber-700 transition-colors ${
                activeMenu === item.label ? 'bg-amber-700 border-r-4 border-white' : ''
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}

          <div className="px-4 mt-6 mb-2">

            <p className="text-amber-200 text-xs font-semibold uppercase tracking-wider">Administration</p>

          </div>

          {[

            { icon: Users, label: 'Agents' },
            { icon: Settings, label: 'Services' },
            { icon: FileText, label: 'Types' }
            
            ].map(item => (

            <button

              key={item.label}

              onClick={() => setActiveMenu(item.label)}

              className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-amber-700 transition-colors ${

                activeMenu === item.label ? 'bg-amber-700 border-r-4 border-white' : ''

              }`}

            >

              <item.icon size={20} />

              {item.label}

            </button>

          ))}

        </nav>

      </aside>



      <div className="flex-1 flex flex-col">

        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">

          <h1 className="text-2xl font-bold text-gray-800">{activeMenu}</h1>

         

          <div className="relative">

            <button

              onClick={() => setShowUserMenu(!showUserMenu)}

              className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"

            >

              <UserCog size={24} />

            </button>



            {showUserMenu && (

              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">

                <div className="px-4 py-3 border-b border-gray-100">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white">

                      <UserCog size={20} />

                    </div>

                    <div>

                      <p className="font-semibold text-gray-800">Super Admin</p>

                      <p className="text-sm text-gray-500">admin@presidence.ma</p>

                    </div>

                  </div>

                </div>


                <button

                  onClick={() => setActiveMenu('Paramètres')}

                  className="w-full px-4 py-2.5 text-left hover:bg-amber-50 flex items-center gap-3 text-gray-700"

                >

                  <Settings size={18} />

                  Paramètres

                </button>

                <button className="w-full px-4 py-2.5 text-left hover:bg-amber-50 flex items-center gap-3 text-gray-700">

                  <LogOut size={18} />

                  Se déconnecter

                </button>

              </div>

            )}

          </div>

        </header>



        <main className="flex-1 p-8 overflow-y-auto">

          {renderContent()}

        </main>

      </div>

    </div>

  );

}