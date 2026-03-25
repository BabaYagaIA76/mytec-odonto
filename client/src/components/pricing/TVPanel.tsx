import { usePricing } from '@/contexts/PricingContext';
import { Tv, Wifi, WifiOff, ExternalLink } from 'lucide-react';

export default function TVPanel() {
  const { state } = usePricing();

  return (
    <div className="max-w-md">
      <div className="bg-gradient-to-br from-[#1A3A6B] to-[#0D1B3E] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-5">
          <Tv size={24} className="text-[#10B981]" />
          <div>
            <h3 className="font-black text-lg">Painel TV</h3>
            <p className="text-blue-300 text-xs">Dashboard em tempo real</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          {state.tvConnected ? (
            <>
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <Wifi size={14} className="text-[#10B981]" />
              <span className="text-[#10B981] text-sm font-semibold">Painel Conectado</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <WifiOff size={14} className="text-gray-400" />
              <span className="text-gray-400 text-sm">Painel não detectado</span>
            </>
          )}
        </div>

        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
            <span className="text-blue-200">Produtos</span>
            <span className="font-bold">{state.products.length}</span>
          </div>
          <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
            <span className="text-blue-200">Movimentos</span>
            <span className="font-bold">{state.movements.length}</span>
          </div>
          <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
            <span className="text-blue-200">Clientes</span>
            <span className="font-bold">{state.customers.length}</span>
          </div>
        </div>

        <a
          href="/tv.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#10B981] hover:bg-[#0ea572] text-white font-bold py-3 rounded-xl transition-colors"
        >
          <ExternalLink size={16} />
          Abrir Painel TV
        </a>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">Como usar</p>
        <ol className="list-decimal list-inside space-y-1 text-xs text-blue-600">
          <li>Clique em "Abrir Painel TV" para abrir numa nova aba</li>
          <li>Coloque o painel em tela cheia na TV (F11)</li>
          <li>Continue operando o sistema normalmente — o painel atualiza sozinho</li>
        </ol>
      </div>
    </div>
  );
}
