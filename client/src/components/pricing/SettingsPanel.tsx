import { useState } from 'react';
import { usePricing } from '@/contexts/PricingContext';
import TierConfig from './TierConfig';
import { Lock } from 'lucide-react';

const PASSWORD = '12345';

export default function SettingsPanel() {
  const { state, updateMeta, updateTaxRate, resetAll } = usePricing();
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdErr, setPwdErr] = useState(false);
  const [meta, setMeta] = useState(state.meta);
  const [taxRate, setTaxRate] = useState(state.taxRate);

  function tryUnlock() {
    if (pwd === PASSWORD) {
      setUnlocked(true);
      setPwdErr(false);
    } else {
      setPwdErr(true);
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto mt-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#1A3A6B]/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-[#1A3A6B]" />
          </div>
          <h3 className="font-black text-gray-900 mb-1">Área Restrita</h3>
          <p className="text-gray-400 text-sm mb-5">Digite a senha para acessar as configurações.</p>
          <input
            type="password"
            className={`w-full border rounded-xl px-4 py-3 text-center text-lg tracking-widest mb-3 ${pwdErr ? 'border-red-400' : 'border-gray-200'}`}
            placeholder="• • • • •"
            value={pwd}
            onChange={e => { setPwd(e.target.value); setPwdErr(false); }}
            onKeyDown={e => e.key === 'Enter' && tryUnlock()}
          />
          {pwdErr && <p className="text-red-500 text-xs mb-3">Senha incorreta.</p>}
          <button
            onClick={tryUnlock}
            className="w-full bg-[#1A3A6B] hover:bg-[#152f58] text-white font-bold py-2.5 rounded-xl"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Configurações Gerais</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Meta Anual de Vendas (R$)</span>
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={meta}
                onChange={e => setMeta(Number(e.target.value))}
              />
              <button
                onClick={() => updateMeta(meta)}
                className="bg-[#1A3A6B] text-white px-3 rounded-lg text-sm font-semibold hover:bg-[#152f58]"
              >
                Salvar
              </button>
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase">Alíquota ICMS Padrão (%)</span>
            <div className="flex gap-2 mt-1">
              <input
                type="number"
                step="0.1"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={taxRate}
                onChange={e => setTaxRate(Number(e.target.value))}
              />
              <button
                onClick={() => updateTaxRate(taxRate)}
                className="bg-[#1A3A6B] text-white px-3 rounded-lg text-sm font-semibold hover:bg-[#152f58]"
              >
                Salvar
              </button>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <TierConfig />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="font-bold text-red-800 mb-2">Zona de Perigo</h3>
        <p className="text-red-600 text-sm mb-4">
          Limpa todos os dados do sistema (produtos voltam ao padrão, movimentos e clientes são apagados).
          Esta ação não pode ser desfeita.
        </p>
        <button
          onClick={() => {
            if (confirm('Tem certeza? Todos os dados serão perdidos!')) {
              resetAll();
              setMeta(0);
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Resetar Todos os Dados
        </button>
      </div>
    </div>
  );
}
