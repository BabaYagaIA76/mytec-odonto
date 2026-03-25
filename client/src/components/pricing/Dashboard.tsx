import { useMemo } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import { fmtBRL } from '@/lib/pricingCalc';

export default function Dashboard() {
  const { state } = usePricing();

  const stats = useMemo(() => {
    const vendas = state.movements.filter(m => m.type === 'venda');
    const totalVendas = vendas.reduce((s, m) => s + (m.total ?? 0), 0);
    const qtdVendida = vendas.reduce((s, m) => s + m.qty, 0);
    const totalEstoque = state.products.reduce((s, p) => s + p.qty, 0);
    const estoqueBaixo = state.products.filter(p => p.qty <= 3 && p.qty > 0).length;
    const semEstoque = state.products.filter(p => p.qty === 0).length;
    const metaPct = state.meta > 0 ? Math.min(100, (totalVendas / state.meta) * 100) : 0;
    return { totalVendas, qtdVendida, totalEstoque, estoqueBaixo, semEstoque, metaPct };
  }, [state]);

  const topProducts = useMemo(() => {
    const map = new Map<string, { name: string; qty: number; total: number }>();
    for (const m of state.movements) {
      if (m.type !== 'venda') continue;
      const cur = map.get(m.productId) ?? { name: m.productName, qty: 0, total: 0 };
      map.set(m.productId, { name: m.productName, qty: cur.qty + m.qty, total: cur.total + (m.total ?? 0) });
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total).slice(0, 5);
  }, [state.movements]);

  const recentSales = useMemo(
    () => state.movements.filter(m => m.type === 'venda').slice(0, 8),
    [state.movements]
  );

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Faturamento Total', value: fmtBRL(stats.totalVendas), color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Qtd Vendida', value: String(stats.qtdVendida), color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Itens em Estoque', value: String(stats.totalEstoque), color: 'text-[#1A3A6B]', bg: 'bg-blue-50/50' },
          { label: 'Sem Estoque', value: String(stats.semEstoque), color: 'text-red-600', bg: 'bg-red-50' },
        ].map(k => (
          <div key={k.label} className={`${k.bg} rounded-2xl p-4 border border-white`}>
            <div className={`text-2xl font-black ${k.color}`}>{k.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Meta anual */}
      {state.meta > 0 && (
        <div className="bg-gradient-to-r from-[#1A3A6B] to-[#0D2B4E] rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold">Meta Anual</span>
            <span className="text-[#10B981] font-black">{stats.metaPct.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-[#10B981] h-3 rounded-full transition-all"
              style={{ width: `${stats.metaPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-blue-200">
            <span>{fmtBRL(stats.totalVendas)} realizado</span>
            <span>{fmtBRL(state.meta)} meta</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top produtos */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Top 5 Produtos (por faturamento)</h3>
          {topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">Nenhuma venda registrada ainda.</p>
          ) : (
            <div className="space-y-2">
              {topProducts.map((p, i) => {
                const maxTotal = topProducts[0].total;
                const pct = maxTotal > 0 ? (p.total / maxTotal) * 100 : 0;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-700 truncate max-w-[180px]">{p.name}</span>
                      <span className="font-semibold text-[#1A3A6B]">{fmtBRL(p.total)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-[#1A3A6B] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Vendas recentes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Vendas Recentes</h3>
          {recentSales.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">Nenhuma venda registrada ainda.</p>
          ) : (
            <div className="space-y-2">
              {recentSales.map(m => (
                <div key={m.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="font-medium text-gray-700 truncate max-w-[180px]">{m.productName}</div>
                    <div className="text-gray-400">{m.client ?? 'Balcão'} · {new Date(m.date).toLocaleDateString('pt-BR')}</div>
                  </div>
                  <div className="font-bold text-green-600 whitespace-nowrap">{fmtBRL(m.total ?? 0)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Estoque crítico */}
      {stats.estoqueBaixo > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-800 mb-3 text-sm">⚠️ Estoque Crítico ({stats.estoqueBaixo} produtos)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {state.products.filter(p => p.qty <= 3 && p.qty > 0).map(p => (
              <div key={p.id} className="bg-white rounded-lg px-3 py-2 border border-amber-100">
                <div className="text-xs font-medium text-gray-700 truncate">{p.name}</div>
                <div className="text-amber-600 font-bold text-xs">Estoque: {p.qty}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
