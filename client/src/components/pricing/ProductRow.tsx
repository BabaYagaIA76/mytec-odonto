import { useState } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import { calcCostWithTax, calcPrice, calcFloor, fmtBRL } from '@/lib/pricingCalc';
import type { Product } from '@/lib/pricingStorage';
import SaleModal from './SaleModal';
import StockEntryModal from './StockEntryModal';
import AdjustmentModal from './AdjustmentModal';
import { ShoppingCart, PackagePlus, SlidersHorizontal } from 'lucide-react';

interface Props {
  product: Product;
}

export default function ProductRow({ product }: Props) {
  const { state } = usePricing();
  const [modal, setModal] = useState<'sale' | 'entry' | 'adjust' | null>(null);

  const costImp = calcCostWithTax(product.cost, product.freight, product.tax);
  const floor = calcFloor(costImp);

  const isLowStock = product.qty <= 3;
  const isOutOfStock = product.qty === 0;

  return (
    <>
      <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm ${isOutOfStock ? 'opacity-50' : ''}`}>
        <td className="py-2 px-3 max-w-[200px]">
          <div className="font-medium text-gray-900 truncate">{product.name}</div>
          {product.ncm && <div className="text-xs text-gray-400">NCM: {product.ncm}</div>}
        </td>
        <td className="py-2 px-3 text-gray-500 whitespace-nowrap">{product.category}</td>
        <td className="py-2 px-3 text-right font-mono text-gray-700">{fmtBRL(costImp)}</td>
        <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{fmtBRL(floor)}</td>
        {state.tiers.map(tier => (
          <td key={tier.id} className="py-2 px-3 text-right font-mono font-semibold whitespace-nowrap" style={{ color: tier.color }}>
            {fmtBRL(calcPrice(costImp, tier.margin))}
          </td>
        ))}
        <td className="py-2 px-3 text-center">
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
            isOutOfStock ? 'bg-red-100 text-red-600' :
            isLowStock ? 'bg-amber-100 text-amber-600' :
            'bg-green-100 text-green-700'
          }`}>
            {product.qty}
          </span>
        </td>
        <td className="py-2 px-3">
          <div className="flex items-center gap-1 justify-end">
            <button
              title="Vender"
              disabled={isOutOfStock}
              onClick={() => setModal('sale')}
              className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-[#10B981] disabled:opacity-30 transition-colors"
            >
              <ShoppingCart size={14} />
            </button>
            <button
              title="Entrada"
              onClick={() => setModal('entry')}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#1A3A6B] transition-colors"
            >
              <PackagePlus size={14} />
            </button>
            <button
              title="Ajuste"
              onClick={() => setModal('adjust')}
              className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors"
            >
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </td>
      </tr>

      {modal === 'sale' && <SaleModal product={product} onClose={() => setModal(null)} />}
      {modal === 'entry' && <StockEntryModal product={product} onClose={() => setModal(null)} />}
      {modal === 'adjust' && <AdjustmentModal product={product} onClose={() => setModal(null)} />}
    </>
  );
}
