import { useState, useMemo } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import ProductRow from './ProductRow';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

export default function ProductTable() {
  const { state } = usePricing();
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return state.products;
    return state.products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [state.products, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const p of filtered) {
      if (!map.has(p.supplier)) map.set(p.supplier, []);
      map.get(p.supplier)!.push(p);
    }
    return map;
  }, [filtered]);

  function toggleGroup(supplier: string) {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(supplier)) next.delete(supplier);
      else next.add(supplier);
      return next;
    });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm"
            placeholder="Buscar produto, fornecedor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs text-gray-400">{filtered.length} produtos</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Custo Imp.</th>
              <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Piso</th>
              {state.tiers.map(t => (
                <th
                  key={t.id}
                  className="text-right py-2.5 px-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: t.color }}
                >
                  {t.name}
                </th>
              ))}
              <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qtd</th>
              <th className="py-2.5 px-3" />
            </tr>
          </thead>
          <tbody>
            {Array.from(grouped.entries()).map(([supplier, products]) => (
              <>
                <tr
                  key={`group-${supplier}`}
                  className="bg-[#1A3A6B]/5 border-b border-[#1A3A6B]/10 cursor-pointer hover:bg-[#1A3A6B]/10"
                  onClick={() => toggleGroup(supplier)}
                >
                  <td colSpan={5 + state.tiers.length + 2} className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      {collapsed.has(supplier)
                        ? <ChevronRight size={14} className="text-[#1A3A6B]" />
                        : <ChevronDown size={14} className="text-[#1A3A6B]" />
                      }
                      <span className="font-bold text-[#1A3A6B] text-xs uppercase tracking-wider">
                        {supplier}
                      </span>
                      <span className="text-xs text-[#1A3A6B]/60">({products.length})</span>
                    </div>
                  </td>
                </tr>
                {!collapsed.has(supplier) && products.map(p => (
                  <ProductRow key={p.id} product={p} />
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
