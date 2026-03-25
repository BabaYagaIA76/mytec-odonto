import { useState, useMemo } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import type { Customer } from '@/lib/pricingStorage';
import { Search, Plus, Trash2, X } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  balcao: 'Balcão',
  tecnico: 'Técnico',
  fidelizado: 'Fidelizado',
};

function CustomerForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: Partial<Customer>;
  onSave: (c: Customer) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Customer>>(initial ?? {});

  function save() {
    if (!form.name?.trim()) return;
    onSave({
      id: form.id ?? crypto.randomUUID(),
      name: form.name.trim(),
      phone: form.phone,
      email: form.email,
      cpf: form.cpf,
      birthdate: form.birthdate,
      type: form.type,
      obs: form.obs,
      createdAt: form.createdAt ?? new Date().toISOString(),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900">{form.id ? 'Editar' : 'Novo'} Cliente</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="space-y-3">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Nome *"
            value={form.name ?? ''}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Telefone"
              value={form.phone ?? ''}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="CPF"
              value={form.cpf ?? ''}
              onChange={e => setForm({ ...form, cpf: e.target.value })}
            />
          </div>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="E-mail"
            type="email"
            value={form.email ?? ''}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Data de nascimento"
              type="date"
              value={form.birthdate ?? ''}
              onChange={e => setForm({ ...form, birthdate: e.target.value })}
            />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={form.type ?? ''}
              onChange={e => setForm({ ...form, type: e.target.value as Customer['type'] })}
            >
              <option value="">Tipo de cliente</option>
              <option value="balcao">Balcão</option>
              <option value="tecnico">Técnico</option>
              <option value="fidelizado">Fidelizado</option>
            </select>
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

export default function CRMModule() {
  const { state, addCustomer, updateCustomer, deleteCustomer } = usePricing();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Customer | null>(null);
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return state.customers;
    return state.customers.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        (c.phone ?? '').includes(q) ||
        (c.email ?? '').toLowerCase().includes(q)
    );
  }, [state.customers, search]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm"
            placeholder="Buscar cliente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 bg-[#1A3A6B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#152f58]"
        >
          <Plus size={14} /> Novo Cliente
        </button>
        <span className="text-xs text-gray-400">{filtered.length} clientes</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">
          {state.customers.length === 0 ? 'Nenhum cliente cadastrado.' : 'Nenhum resultado.'}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Nome</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Telefone</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase">Cadastro</th>
                <th className="py-2.5 px-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2.5 px-3">
                    <div className="font-medium text-gray-900">{c.name}</div>
                    {c.email && <div className="text-xs text-gray-400">{c.email}</div>}
                  </td>
                  <td className="py-2.5 px-3 text-gray-500">{c.phone ?? '—'}</td>
                  <td className="py-2.5 px-3">
                    {c.type ? (
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                        {TYPE_LABELS[c.type] ?? c.type}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="py-2.5 px-3 text-gray-400 text-xs">
                    {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => setEditing(c)}
                        className="text-xs text-[#1A3A6B] hover:underline font-medium px-2 py-1"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remover ${c.name}?`)) deleteCustomer(c.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
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

      {adding && (
        <CustomerForm onSave={addCustomer} onClose={() => setAdding(false)} />
      )}
      {editing && (
        <CustomerForm
          initial={editing}
          onSave={updateCustomer}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
