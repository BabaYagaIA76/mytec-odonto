import { useMemo, useState } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import { fmtBRL } from '@/lib/pricingCalc';

const TYPE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  venda: { label: 'Venda', color: 'text-green-700', bg: 'bg-green-100' },
  entrada: { label: 'Entrada', color: 'text-blue-700', bg: 'bg-blue-100' },
  ajuste: { label: 'Ajuste', color: 'text-amber-700', bg: 'bg-amber-100' },
};

export default function MovementHistory() {
  const { state } = usePricing();
  const [filter, setFilter] = useState<'all' | 'venda' | 'entrada' | 'ajuste'>('all');
  const [limit, setLimit] = useState(50);

  const movements = useMemo(() => {
    const filtered = filter === 'all'
      ? state.movements
      : state.movements.filter(m => m.type === filter);
    return filtered.slice(0, limit);
  }, [state.movements, filter, limit]);

  const totalVendas = useMemo(
    () => state.movements.filter(m => m.type === 'venda').reduce((s, m) => s + (m.total ?? 0), 0),
    [state.movements]
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-green-700">{fmtBRL(totalVendas)}</div>
          <div className="text-xs text-green-600 mt-0.5">Total em Vendas</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-blue-700">
            {state.movements.filter(m => m.type === 'venda').length}
          </div>
          <div className="text-xs text-blue-600 mt-0.5">Vendas Realizadas</div>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-gray-700">{state.movements.length}</div>
          <div className="text-xs text-gray-500 mt-0.5">Total de Movimentos</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(['all', 'venda', 'entrada', 'ajuste'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === f
                ? 'bg-[#1A3A6B] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Todos' : TYPE_LABELS[f].label}
          </button>
        ))}
      </div>

      {movements.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">Nenhum movimento registrado.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Produto</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Qtd</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Obs</th>
              </tr>
            </thead>
            <tbody>
              {movements.map(m => {
                const meta = TYPE_LABELS[m.type];
                return (
                  <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(m.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${meta.bg} ${meta.color}`}>
                        {meta.label}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-700 max-w-[180px] truncate">{m.productName}</td>
                    <td className="py-2 px-3 text-gray-500 text-xs">{m.client ?? '—'}</td>
                    <td className="py-2 px-3 text-right font-mono text-gray-700">{m.qty > 0 ? `+${m.qty}` : m.qty}</td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-gray-900">
                      {m.total != null ? fmtBRL(m.total) : '—'}
                    </td>
                    <td className="py-2 px-3 text-gray-400 text-xs">{m.obs ?? '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {state.movements.length > limit && (
        <div className="text-center mt-4">
          <button
            onClick={() => setLimit(l => l + 50)}
            className="text-sm text-[#1A3A6B] hover:underline font-medium"
          >
            Carregar mais ({state.movements.length - limit} restantes)
          </button>
        </div>
      )}
    </div>
  );
}
