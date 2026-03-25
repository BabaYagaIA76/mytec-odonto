import { useState, type ReactNode } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import { Link } from 'react-router-dom';
import { Wifi, WifiOff, LayoutDashboard, Package, History, Users, ClipboardList, Tv, Settings, Sparkles } from 'lucide-react';
import AIImportModal from './AIImportModal';

interface Tab {
  id: string;
  label: string;
  icon: ReactNode;
}

const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'products', label: 'Produtos', icon: <Package size={16} /> },
  { id: 'movements', label: 'Histórico', icon: <History size={16} /> },
  { id: 'crm', label: 'Clientes', icon: <Users size={16} /> },
  { id: 'rental', label: 'Locações', icon: <ClipboardList size={16} /> },
  { id: 'tv', label: 'Painel TV', icon: <Tv size={16} /> },
  { id: 'settings', label: 'Config.', icon: <Settings size={16} /> },
];

interface Props {
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
}

export default function PricingLayout({ activeTab, onTabChange, children }: Props) {
  const { state } = usePricing();
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-[#0D1B3E] text-white px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦷</span>
          <div>
            <div className="font-black text-sm leading-none">My Tec Odonto</div>
            <div className="text-blue-300 text-xs">Sistema de Precificação</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'text-blue-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAI(true)}
            className="flex items-center gap-1.5 bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#10B981] border border-[#10B981]/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <Sparkles size={13} />
            Importar IA
          </button>
          <div className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg ${
            state.tvConnected
              ? 'bg-[#10B981]/20 text-[#10B981]'
              : 'bg-white/5 text-gray-400'
          }`}>
            {state.tvConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
            <span className="hidden sm:inline">TV</span>
          </div>
          <Link
            to="/"
            className="text-blue-300 hover:text-white text-xs font-medium px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            ← Site
          </Link>
        </div>
      </header>

      {/* Mobile tab bar */}
      <div className="md:hidden bg-white border-b border-gray-200 flex overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-2.5 text-[10px] font-semibold flex-shrink-0 transition-colors ${
              activeTab === tab.id
                ? 'text-[#1A3A6B] border-b-2 border-[#1A3A6B]'
                : 'text-gray-400'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>

      {showAI && <AIImportModal onClose={() => setShowAI(false)} />}
    </div>
  );
}
