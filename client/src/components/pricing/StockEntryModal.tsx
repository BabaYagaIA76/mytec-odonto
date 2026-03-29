import { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePricing } from '@/contexts/PricingContext';
import type { Product } from '@/lib/pricingStorage';
import { X } from 'lucide-react';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function StockEntryModal({ product, onClose }: Props) {
  const { addMovement, updateProduct } = usePricing();
  const [qty, setQty] = useState(1);
  const [cost, setCost] = useState(product.cost);
  const [obs, setObs] = useState('');

  function confirm() {
    if (qty < 1) return;
    addMovement({
      id: crypto.randomUUID(),
      type: 'entrada',
      productId: product.id,
      productName: product.name,
      qty,
      obs,
      date: new Date().toISOString(),
    });
    updateProduct({ ...product, qty: product.qty + qty, cost });
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900">Entrada de Estoque</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100">
          <div className="font-semibold text-sm text-gray-900">{product.name}</div>
          <div className="text-xs text-gray-400">{product.supplier} · Estoque atual: {product.qty}</div>
        </div>

        <div className="space-y-3 mb-5">
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Quantidade a Entrada</span>
            <input
              type="number"
              min={1}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={qty}
              onChange={e => setQty(Math.max(1, Number(e.target.value)))}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Custo Unitário (R$)</span>
            <input
              type="number"
              step="0.01"
              min={0}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={cost}
              onChange={e => setCost(Number(e.target.value))}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Observação</span>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="NF, fornecedor, etc."
              value={obs}
              onChange={e => setObs(e.target.value)}
            />
          </label>
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
            className="flex-1 bg-[#1A3A6B] hover:bg-[#152f58] text-white py-2.5 rounded-xl text-sm font-bold"
          >
            Confirmar Entrada
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
