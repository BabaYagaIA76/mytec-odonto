import { useState } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import type { Tier } from '@/lib/pricingStorage';

export default function TierConfig() {
  const { state, updateTiers } = usePricing();
  const [editing, setEditing] = useState<Tier | null>(null);

  function save() {
    if (!editing) return;
    const next = state.tiers.map(t => (t.id === editing.id ? editing : t));
    updateTiers(next);
    setEditing(null);
  }

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Tabelas de Preço</h3>
      {state.tiers.map(tier => (
        <div
          key={tier.id}
          className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: tier.color }}
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900">{tier.name}</div>
            <div className="text-xs text-gray-500">
              Margem: {tier.margin}%
              {tier.discount ? ` · Desconto: ${tier.discount}%` : ''}
            </div>
          </div>
          <button
            onClick={() => setEditing({ ...tier })}
            className="text-xs text-[#1A3A6B] hover:underline font-medium"
          >
            Editar
          </button>
        </div>
      ))}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-black text-gray-900 mb-4">Editar Tabela — {editing.name}</h3>
            <label className="block mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase">Nome</span>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editing.name}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
              />
            </label>
            <label className="block mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase">Margem (%)</span>
              <input
                type="number"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editing.margin}
                onChange={e => setEditing({ ...editing, margin: Number(e.target.value) })}
              />
            </label>
            <label className="block mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase">Desconto (%)</span>
              <input
                type="number"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editing.discount ?? 0}
                onChange={e => setEditing({ ...editing, discount: Number(e.target.value) })}
              />
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={save}
                className="flex-1 bg-[#1A3A6B] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#152f58]"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
