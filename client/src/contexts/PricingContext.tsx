import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import {
  loadProducts,
  saveProducts,
  loadMovements,
  saveMovements,
  loadCustomers,
  saveCustomers,
  loadLocacoes,
  saveLocacoes,
  loadTiers,
  saveTiers,
  loadMeta,
  saveMeta,
  getTVChannelInstance,
  DEFAULT_TIERS,
  type Product,
  type Movement,
  type Customer,
  type Locacao,
  type Tier,
} from '../lib/pricingStorage';
import { INITIAL_PRODUCTS } from '../lib/initialData';

// ── State ─────────────────────────────────────────────────────────────────────
interface PricingState {
  products: Product[];
  movements: Movement[];
  customers: Customer[];
  locacoes: Locacao[];
  tiers: Tier[];
  meta: number;
  taxRate: number;
  tvConnected: boolean;
}

// ── Actions ───────────────────────────────────────────────────────────────────
type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_MOVEMENTS'; payload: Movement[] }
  | { type: 'SET_CUSTOMERS'; payload: Customer[] }
  | { type: 'SET_LOCACOES'; payload: Locacao[] }
  | { type: 'SET_TIERS'; payload: Tier[] }
  | { type: 'SET_META'; payload: number }
  | { type: 'SET_TAX_RATE'; payload: number }
  | { type: 'SET_TV_CONNECTED'; payload: boolean }
  | { type: 'RESET_ALL' };

function reducer(state: PricingState, action: Action): PricingState {
  switch (action.type) {
    case 'SET_PRODUCTS': return { ...state, products: action.payload };
    case 'SET_MOVEMENTS': return { ...state, movements: action.payload };
    case 'SET_CUSTOMERS': return { ...state, customers: action.payload };
    case 'SET_LOCACOES': return { ...state, locacoes: action.payload };
    case 'SET_TIERS': return { ...state, tiers: action.payload };
    case 'SET_META': return { ...state, meta: action.payload };
    case 'SET_TAX_RATE': return { ...state, taxRate: action.payload };
    case 'SET_TV_CONNECTED': return { ...state, tvConnected: action.payload };
    case 'RESET_ALL':
      return {
        ...state,
        products: INITIAL_PRODUCTS,
        movements: [],
        customers: [],
        locacoes: [],
        tiers: DEFAULT_TIERS,
        meta: 0,
      };
    default: return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
interface PricingContextValue {
  state: PricingState;
  // Products
  updateProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  // Movements
  addMovement: (movement: Movement) => void;
  // Customers
  updateCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  // Locações
  updateLocacoes: (locacoes: Locacao[]) => void;
  addLocacao: (locacao: Locacao) => void;
  updateLocacao: (locacao: Locacao) => void;
  deleteLocacao: (id: string) => void;
  // Tiers
  updateTiers: (tiers: Tier[]) => void;
  // Meta
  updateMeta: (meta: number) => void;
  // Tax
  updateTaxRate: (rate: number) => void;
  // Reset
  resetAll: () => void;
}

const PricingContext = createContext<PricingContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function PricingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    movements: [],
    customers: [],
    locacoes: [],
    tiers: DEFAULT_TIERS,
    meta: 0,
    taxRate: 12,
    tvConnected: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const products = loadProducts();
    dispatch({ type: 'SET_PRODUCTS', payload: products.length > 0 ? products : INITIAL_PRODUCTS });
    dispatch({ type: 'SET_MOVEMENTS', payload: loadMovements() });
    dispatch({ type: 'SET_CUSTOMERS', payload: loadCustomers() });
    dispatch({ type: 'SET_LOCACOES', payload: loadLocacoes() });
    dispatch({ type: 'SET_TIERS', payload: loadTiers() });
    dispatch({ type: 'SET_META', payload: loadMeta() });
  }, []);

  // BroadcastChannel — listen for TV pong
  useEffect(() => {
    const ch = getTVChannelInstance();
    if (!ch) return;

    const handler = (e: MessageEvent) => {
      if (e.data?.key === '__pong__') {
        dispatch({ type: 'SET_TV_CONNECTED', payload: true });
        // Auto-disconnect after 10s of silence
        clearTimeout((handler as any)._t);
        (handler as any)._t = setTimeout(() => {
          dispatch({ type: 'SET_TV_CONNECTED', payload: false });
        }, 10000);
      }
    };

    ch.addEventListener('message', handler);
    // Ping the TV panel on mount
    ch.postMessage({ key: '__ping__', ts: Date.now() });
    const interval = setInterval(() => {
      ch.postMessage({ key: '__ping__', ts: Date.now() });
    }, 5000);

    return () => {
      ch.removeEventListener('message', handler);
      clearInterval(interval);
    };
  }, []);

  // Always-current state ref so callbacks don't capture stale closures
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const updateProducts = useCallback((products: Product[]) => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
    saveProducts(products);
  }, []);

  const addProduct = useCallback((product: Product) => {
    const next = [product, ...stateRef.current.products];
    saveProducts(next);
    dispatch({ type: 'SET_PRODUCTS', payload: next });
  }, []);

  const updateProduct = useCallback((product: Product) => {
    const next = stateRef.current.products.map(p => p.id === product.id ? product : p);
    saveProducts(next);
    dispatch({ type: 'SET_PRODUCTS', payload: next });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    const next = stateRef.current.products.filter(p => p.id !== id);
    saveProducts(next);
    dispatch({ type: 'SET_PRODUCTS', payload: next });
  }, []);

  const addMovement = useCallback((movement: Movement) => {
    const next = [movement, ...stateRef.current.movements];
    saveMovements(next);
    dispatch({ type: 'SET_MOVEMENTS', payload: next });
  }, []);

  const updateCustomers = useCallback((customers: Customer[]) => {
    dispatch({ type: 'SET_CUSTOMERS', payload: customers });
    saveCustomers(customers);
  }, []);

  const addCustomer = useCallback((customer: Customer) => {
    const next = [customer, ...stateRef.current.customers];
    saveCustomers(next);
    dispatch({ type: 'SET_CUSTOMERS', payload: next });
  }, []);

  const updateCustomer = useCallback((customer: Customer) => {
    const next = stateRef.current.customers.map(c => c.id === customer.id ? customer : c);
    saveCustomers(next);
    dispatch({ type: 'SET_CUSTOMERS', payload: next });
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    const next = stateRef.current.customers.filter(c => c.id !== id);
    saveCustomers(next);
    dispatch({ type: 'SET_CUSTOMERS', payload: next });
  }, []);

  const updateLocacoes = useCallback((locacoes: Locacao[]) => {
    dispatch({ type: 'SET_LOCACOES', payload: locacoes });
    saveLocacoes(locacoes);
  }, []);

  const addLocacao = useCallback((locacao: Locacao) => {
    const next = [locacao, ...stateRef.current.locacoes];
    saveLocacoes(next);
    dispatch({ type: 'SET_LOCACOES', payload: next });
  }, []);

  const updateLocacao = useCallback((locacao: Locacao) => {
    const next = stateRef.current.locacoes.map(l => l.id === locacao.id ? locacao : l);
    saveLocacoes(next);
    dispatch({ type: 'SET_LOCACOES', payload: next });
  }, []);

  const deleteLocacao = useCallback((id: string) => {
    const next = stateRef.current.locacoes.filter(l => l.id !== id);
    saveLocacoes(next);
    dispatch({ type: 'SET_LOCACOES', payload: next });
  }, []);

  const updateTiers = useCallback((tiers: Tier[]) => {
    dispatch({ type: 'SET_TIERS', payload: tiers });
    saveTiers(tiers);
  }, []);

  const updateMeta = useCallback((meta: number) => {
    dispatch({ type: 'SET_META', payload: meta });
    saveMeta(meta);
  }, []);

  const updateTaxRate = useCallback((rate: number) => {
    dispatch({ type: 'SET_TAX_RATE', payload: rate });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
    saveProducts(INITIAL_PRODUCTS);
    saveMovements([]);
    saveCustomers([]);
    saveLocacoes([]);
    saveTiers(DEFAULT_TIERS);
    saveMeta(0);
  }, []);

  const value: PricingContextValue = {
    state,
    updateProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    addMovement,
    updateCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    updateLocacoes,
    addLocacao,
    updateLocacao,
    deleteLocacao,
    updateTiers,
    updateMeta,
    updateTaxRate,
    resetAll,
  };

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error('usePricing must be used within PricingProvider');
  return ctx;
}
