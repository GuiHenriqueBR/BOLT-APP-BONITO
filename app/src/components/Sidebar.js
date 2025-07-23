import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Dashboard</div>
      <nav>
        <ul>
          <li className="active"><span role="img" aria-label="dashboard">🏠</span> Dashboard</li>
          <li><span role="img" aria-label="clientes">👤</span> Clientes</li>
          <li><span role="img" aria-label="propostas">📄</span> Propostas</li>
          <li><span role="img" aria-label="apolices">📑</span> Apólices</li>
          <li><span role="img" aria-label="pagamentos">💳</span> Pagamentos</li>
          <li><span role="img" aria-label="renovacoes">🔄</span> Renovações</li>
          <li><span role="img" aria-label="relatorios">📊</span> Relatórios</li>
          <li><span role="img" aria-label="configuracoes">⚙️</span> Configurações</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;