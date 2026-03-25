import { useState } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import { calcCostWithTax, calcPrice, fmtBRL } from '@/lib/pricingCalc';
import type { Product } from '@/lib/pricingStorage';
import { X } from 'lucide-react';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function SaleModal({ product, onClose }: Props) {
  const { state, addMovement, updateProduct } = usePricing();
  const [tierId, setTierId] = useState(state.tiers[0]?.id ?? '');
  const [qty, setQty] = useState(1);
  const [client, setClient] = useState('');
  const [pay, setPay] = useState('dinheiro');
  const [obs, setObs] = useState('');

  const tier = state.tiers.find(t => t.id === tierId) ?? state.tiers[0];
  const costImp = calcCostWithTax(product.cost, product.freight, product.tax);
  const price = calcPrice(costImp, tier?.margin ?? 119);
  const total = price * qty;

  function confirm() {
    if (!tier || qty < 1 || qty > product.qty) return;

    addMovement({
      id: crypto.randomUUID(),
      type: 'venda',
      productId: product.id,
      productName: product.name,
      qty,
      price,
      total,
      client: client || 'Balcão',
      tierId: tier.id,
      tierName: tier.name,
      pay,
      obs,
      date: new Date().toISOString(),
    });

    updateProduct({ ...product, qty: product.qty - qty });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900">Registrar Venda</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100">
          <div className="font-semibold text-sm text-gray-900">{product.name}</div>
          <div className="text-xs text-gray-400">{product.supplier} · Estoque: {product.qty}</div>
        </div>

        <div className="space-y-3 mb-5">
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Tabela de Preço</span>
            <select
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={tierId}
              onChange={e => setTierId(e.target.value)}
            >
              {state.tiers.map(t => (
                <option key={t.id} value={t.id}>{t.name} — {fmtBRL(calcPrice(costImp, t.margin))}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-semibold text-gray-500 uppercase">Quantidade</span>
              <input
                type="number"
                min={1}
                max={product.qty}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={qty}
                onChange={e => setQty(Math.max(1, Math.min(product.qty, Number(e.target.value))))}
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-gray-500 uppercase">Pagamento</span>
              <select
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={pay}
                onChange={e => setPay(e.target.value)}
              >
                <option value="dinheiro">Dinheiro</option>
                <option value="pix">PIX</option>
                <option value="cartao_debito">Cartão Débito</option>
                <option value="cartao_credito">Cartão Crédito</option>
                <option value="boleto">Boleto</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Cliente</span>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Nome do cliente (opcional)"
              value={client}
              onChange={e => setClient(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Observação</span>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Opcional"
              value={obs}
              onChange={e => setObs(e.target.value)}
            />
          </label>
        </div>

        <div className="bg-[#1A3A6B]/5 rounded-xl p-3 mb-5 flex items-center justify-between">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-xl font-black text-[#1A3A6B]">{fmtBRL(total)}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={confirm}
            disabled={qty < 1 || qty > product.qty}
            className="flex-1 bg-[#10B981] hover:bg-[#0ea572] disabled:opacity-40 text-white py-2.5 rounded-xl text-sm font-bold"
          >
            Confirmar Venda
          </button>
        </div>
      </div>
    </div>
  );
}
