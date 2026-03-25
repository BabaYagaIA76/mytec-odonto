import { useState } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import type { Product } from '@/lib/pricingStorage';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function AIImportModal({ onClose }: Props) {
  const { addProduct } = usePricing();
  const [text, setText] = useState('');
  const [parsed, setParsed] = useState<Partial<Product>[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function parse() {
    setError('');
    setLoading(true);
    try {
      const apiKey = (import.meta as any).env?.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        // Fallback: try simple line parsing
        const lines = text.trim().split('\n').filter(Boolean);
        const products: Partial<Product>[] = lines.map((line, i) => {
          const parts = line.split(/[,;\t]+/).map(s => s.trim());
          return {
            name: parts[0] ?? `Produto ${i + 1}`,
            supplier: parts[1] ?? 'Importado',
            category: parts[2] ?? 'Geral',
            cost: parseFloat(parts[3]) || 0,
            freight: parseFloat(parts[4]) || 0,
            tax: parseFloat(parts[5]) || 12,
            qty: parseInt(parts[6]) || 0,
          };
        });
        setParsed(products);
        setLoading(false);
        return;
      }

      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: `Extraia produtos deste texto e retorne um array JSON com os campos: name, supplier, category, cost (número), freight (número), tax (número, porcentagem ICMS), qty (número inteiro). Retorne SOMENTE o JSON, sem explicação.\n\nTexto:\n${text}`,
            },
          ],
        }),
      });

      if (!resp.ok) throw new Error(`API error ${resp.status}`);
      const data = await resp.json();
      const raw = data.content?.[0]?.text ?? '';
      const match = raw.match(/\[[\s\S]*\]/);
      if (!match) throw new Error('Não foi possível extrair JSON da resposta.');
      setParsed(JSON.parse(match[0]));
    } catch (e: any) {
      setError(e.message ?? 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  }

  function importAll() {
    if (!parsed) return;
    for (const p of parsed) {
      addProduct({
        id: crypto.randomUUID(),
        name: p.name ?? 'Produto',
        supplier: p.supplier ?? 'Importado',
        category: p.category ?? 'Geral',
        cost: p.cost ?? 0,
        freight: p.freight ?? 0,
        tax: p.tax ?? 12,
        qty: p.qty ?? 0,
      });
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#10B981]" />
            <h3 className="font-black text-gray-900">Importar com IA</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        {!parsed ? (
          <>
            <p className="text-sm text-gray-500 mb-3">
              Cole uma lista de produtos (texto livre, planilha, nota fiscal, etc.) e a IA irá extrair e cadastrar automaticamente.
            </p>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[180px] mb-4"
              placeholder="Ex: Turbina NSK, NSK, Alta Rotação, 120.00, 15.00, 12, 5&#10;Cabo de fibra óptica Kavo, Kavo, Acessórios, 85.00, 10.00, 12, 3"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm mb-3 bg-red-50 rounded-lg px-3 py-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium">Cancelar</button>
              <button
                onClick={parse}
                disabled={!text.trim() || loading}
                className="flex-1 bg-[#10B981] hover:bg-[#0ea572] disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-bold"
              >
                {loading ? 'Processando...' : 'Extrair Produtos'}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-3">
              {parsed.length} produto(s) extraído(s). Revise antes de importar:
            </p>
            <div className="max-h-64 overflow-y-auto border border-gray-100 rounded-xl mb-4">
              {parsed.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2 border-b border-gray-50 last:border-0 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.supplier} · {p.category}</div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    Custo: R$ {p.cost?.toFixed(2)} · Qtd: {p.qty}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setParsed(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium">Voltar</button>
              <button onClick={importAll} className="flex-1 bg-[#1A3A6B] hover:bg-[#152f58] text-white py-2.5 rounded-xl text-sm font-bold">
                Importar {parsed.length} produto(s)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
