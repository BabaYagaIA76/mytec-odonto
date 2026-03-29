import { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePricing } from '@/contexts/PricingContext';
import type { Product } from '@/lib/pricingStorage';
import { X } from 'lucide-react';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function AdjustmentModal({ product, onClose }: Props) {
  const { addMovement, updateProduct } = usePricing();
  const [newQty, setNewQty] = useState(product.qty);
  const [newCost, setNewCost] = useState(product.cost);
  const [newFreight, setNewFreight] = useState(product.freight);
  const [newTax, setNewTax] = useState(product.tax);
  const [obs, setObs] = useState('');

  function confirm() {
    const diff = newQty - product.qty;
    addMovement({
      id: crypto.randomUUID(),
      type: 'ajuste',
      productId: product.id,
      productName: product.name,
      qty: diff,
      obs: obs || `Ajuste manual — estoque ${product.qty} → ${newQty}`,
      date: new Date().toISOString(),
    });
    updateProduct({ ...product, qty: newQty, cost: newCost, freight: newFreight, tax: newTax });
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900">Ajuste de Produto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100">
          <div className="font-semibold text-sm text-gray-900">{product.name}</div>
          <div className="text-xs text-gray-400">{product.supplier}</div>
        </div>

        <div className="space-y-3 mb-5">
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Estoque</span>
            <input
              type="number"
              min={0}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newQty}
              onChange={e => setNewQty(Math.max(0, Number(e.target.value)))}
            />
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="block">
              <span className="text-xs font-semibold text-gray-500 uppercase">Custo</span>
              <input
                type="number"
                step="0.01"
                min={0}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={newCost}
                onChange={e => setNewCost(Number(e.target.value))}
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-gray-500 uppercase">Frete</span>
              <input
                type="number"
                step="0.01"
                min={0}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={newFreight}
                onChange={e => setNewFreight(Number(e.target.value))}
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-gray-500 uppercase">Imp %</span>
              <input
                type="number"
                step="0.1"
                min={0}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={newTax}
                onChange={e => setNewTax(Number(e.target.value))}
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Motivo do Ajuste</span>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Inventário, devolução, etc."
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
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl text-sm font-bold"
          >
            Aplicar Ajuste
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
