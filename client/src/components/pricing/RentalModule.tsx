import { useState, useMemo } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import type { Locacao } from '@/lib/pricingStorage';
import { fmtBRL } from '@/lib/pricingCalc';
import { Plus, Trash2, X } from 'lucide-react';

function LocacaoForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: Partial<Locacao>;
  onSave: (l: Locacao) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Locacao>>(initial ?? { status: 'ativo' });

  function save() {
    if (!form.client?.trim() || !form.equipment?.trim() || !form.startDate) return;
    onSave({
      id: form.id ?? crypto.randomUUID(),
      client: form.client.trim(),
      equipment: form.equipment.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      value: form.value ?? 0,
      status: form.status ?? 'ativo',
      obs: form.obs,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900">{form.id ? 'Editar' : 'Nova'} Locação</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="space-y-3">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Cliente *"
            value={form.client ?? ''}
            onChange={e => setForm({ ...form, client: e.target.value })}
          />
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Equipamento *"
            value={form.equipment ?? ''}
            onChange={e => setForm({ ...form, equipment: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Início *</label>
              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.startDate ?? ''}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Fim</label>
              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.endDate ?? ''}
                onChange={e => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Valor Mensal (R$)</label>
              <input
                type="number"
                step="0.01"
                min={0}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.value ?? ''}
                onChange={e => setForm({ ...form, value: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Status</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.status ?? 'ativo'}
                onChange={e => setForm({ ...form, status: e.target.value as Locacao['status'] })}
              >
                <option value="ativo">Ativo</option>
                <option value="encerrado">Encerrado</option>
              </select>
            </div>
          </div>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Observações"
            rows={2}
            value={form.obs ?? ''}
            onChange={e => setForm({ ...form, obs: e.target.value })}
          />
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium">Cancelar</button>
          <button onClick={save} className="flex-1 bg-[#1A3A6B] text-white py-2.5 rounded-xl text-sm font-bold">Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default function RentalModule() {
  const { state, addLocacao, updateLocacao, deleteLocacao } = usePricing();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Locacao | null>(null);

  const totalMensal = useMemo(
    () => state.locacoes.filter(l => l.status === 'ativo').reduce((s, l) => s + l.value, 0),
    [state.locacoes]
  );

  const ativas = state.locacoes.filter(l => l.status === 'ativo');
  const encerradas = state.locacoes.filter(l => l.status === 'encerrado');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-2 text-center">
            <div className="text-lg font-black text-green-700">{ativas.length}</div>
            <div className="text-xs text-green-600">Ativas</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-center">
            <div className="text-lg font-black text-blue-700">{fmtBRL(totalMensal)}</div>
            <div className="text-xs text-blue-600">Recorrência Mensal</div>
          </div>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 bg-[#1A3A6B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#152f58]"
        >
          <Plus size={14} /> Nova Locação
        </button>
      </div>

      {state.locacoes.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">Nenhuma locação registrada.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Equipamento</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Período</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Valor/mês</th>
                <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="py-2.5 px-3" />
              </tr>
            </thead>
            <tbody>
              {[...ativas, ...encerradas].map(l => (
                <tr key={l.id} className={`border-b border-gray-100 hover:bg-gray-50 ${l.status === 'encerrado' ? 'opacity-50' : ''}`}>
                  <td className="py-2.5 px-3 font-medium text-gray-900">{l.client}</td>
                  <td className="py-2.5 px-3 text-gray-600">{l.equipment}</td>
                  <td className="py-2.5 px-3 text-xs text-gray-400">
                    {new Date(l.startDate).toLocaleDateString('pt-BR')}
                    {l.endDate && ` – ${new Date(l.endDate).toLocaleDateString('pt-BR')}`}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-gray-900">{fmtBRL(l.value)}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      l.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {l.status === 'ativo' ? 'Ativo' : 'Encerrado'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => setEditing(l)} className="text-xs text-[#1A3A6B] hover:underline font-medium px-2 py-1">Editar</button>
                      <button
                        onClick={() => { if (confirm(`Remover locação de ${l.client}?`)) deleteLocacao(l.id); }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {adding && <LocacaoForm onSave={addLocacao} onClose={() => setAdding(false)} />}
      {editing && <LocacaoForm initial={editing} onSave={updateLocacao} onClose={() => setEditing(null)} />}
    </div>
  );
}
