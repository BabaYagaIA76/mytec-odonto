import { useState } from 'react';
import { PricingProvider } from '@/contexts/PricingContext';
import PricingLayout from '@/components/pricing/PricingLayout';
import Dashboard from '@/components/pricing/Dashboard';
import ProductTable from '@/components/pricing/ProductTable';
import MovementHistory from '@/components/pricing/MovementHistory';
import CRMModule from '@/components/pricing/CRMModule';
import RentalModule from '@/components/pricing/RentalModule';
import TVPanel from '@/components/pricing/TVPanel';
import SettingsPanel from '@/components/pricing/SettingsPanel';

const TAB_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  products: 'Tabela de Preços',
  movements: 'Histórico de Movimentos',
  crm: 'CRM — Clientes',
  rental: 'Locações',
  tv: 'Painel TV',
  settings: 'Configurações',
};

function PricingContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <PricingLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="mb-5">
        <h1 className="text-xl font-black text-gray-900">{TAB_TITLES[activeTab]}</h1>
      </div>

      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'products' && <ProductTable />}
      {activeTab === 'movements' && <MovementHistory />}
      {activeTab === 'crm' && <CRMModule />}
      {activeTab === 'rental' && <RentalModule />}
      {activeTab === 'tv' && <TVPanel />}
      {activeTab === 'settings' && <SettingsPanel />}
    </PricingLayout>
  );
}

export default function PricingSystem() {
  return (
    <PricingProvider>
      <PricingContent />
    </PricingProvider>
  );
}
