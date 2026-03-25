/**
 * localStorage helpers with BroadcastChannel integration.
 * Every write notifies the TV Panel (public/tv.html) in real time.
 */

export const STORAGE_KEYS = {
  products: 'mytec_products',
  movements: 'mytec_movements',
  customers: 'mytec_customers',
  locacoes: 'mytec_locacoes',
  tiers: 'mytec_tiers',
  meta: 'mytec_meta_anual',
} as const;

// BroadcastChannel to the TV Panel
let _tvChannel: BroadcastChannel | null = null;

function getTVChannel(): BroadcastChannel | null {
  if (!_tvChannel) {
    try {
      _tvChannel = new BroadcastChannel('mytec_tv');
    } catch {
      _tvChannel = null;
    }
  }
  return _tvChannel;
}

function broadcast(key: string) {
  try {
    getTVChannel()?.postMessage({ key, ts: Date.now() });
  } catch {
    // ignore
  }
}

// Generic load
function loadItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Generic save
function saveItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  broadcast(key);
}

// ── Products ──────────────────────────────────────────────────────────────────
export function loadProducts(): Product[] {
  return loadItem<Product[]>(STORAGE_KEYS.products, []);
}
export function saveProducts(data: Product[]) {
  saveItem(STORAGE_KEYS.products, data);
}

// ── Movements ─────────────────────────────────────────────────────────────────
export function loadMovements(): Movement[] {
  return loadItem<Movement[]>(STORAGE_KEYS.movements, []);
}
export function saveMovements(data: Movement[]) {
  saveItem(STORAGE_KEYS.movements, data);
}

// ── Customers ─────────────────────────────────────────────────────────────────
export function loadCustomers(): Customer[] {
  return loadItem<Customer[]>(STORAGE_KEYS.customers, []);
}
export function saveCustomers(data: Customer[]) {
  saveItem(STORAGE_KEYS.customers, data);
}

// ── Locações ──────────────────────────────────────────────────────────────────
export function loadLocacoes(): Locacao[] {
  return loadItem<Locacao[]>(STORAGE_KEYS.locacoes, []);
}
export function saveLocacoes(data: Locacao[]) {
  saveItem(STORAGE_KEYS.locacoes, data);
}

// ── Tiers ─────────────────────────────────────────────────────────────────────
export function loadTiers(): Tier[] {
  return loadItem<Tier[]>(STORAGE_KEYS.tiers, DEFAULT_TIERS);
}
export function saveTiers(data: Tier[]) {
  saveItem(STORAGE_KEYS.tiers, data);
}

// ── Meta anual ────────────────────────────────────────────────────────────────
export function loadMeta(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.meta);
    if (!raw) return 0;
    return parseFloat(JSON.parse(raw)) || 0;
  } catch {
    return 0;
  }
}
export function saveMeta(value: number) {
  localStorage.setItem(STORAGE_KEYS.meta, JSON.stringify(value));
  broadcast(STORAGE_KEYS.meta);
}

// ── TV Channel management ─────────────────────────────────────────────────────
export function sendTVPing() {
  broadcast('__ping__');
}
export function sendTVSync() {
  broadcast('__sync__');
}
export function closeTVChannel() {
  _tvChannel?.close();
  _tvChannel = null;
}
export function getTVChannelInstance() {
  return getTVChannel();
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  supplier: string;
  category: string;
  cost: number;
  freight: number;
  tax: number;
  qty: number;
  ncm?: string;
  obs?: string;
}

export interface Tier {
  id: string;
  name: string;
  margin: number;
  discount?: number;
  color: string;
}

export interface Movement {
  id: string;
  type: 'venda' | 'entrada' | 'ajuste';
  productId: string;
  productName: string;
  qty: number;
  price?: number;
  total?: number;
  client?: string;
  tierId?: string;
  tierName?: string;
  pay?: string;
  date: string;
  obs?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  cpf?: string;
  birthdate?: string;
  type?: 'balcao' | 'tecnico' | 'fidelizado';
  obs?: string;
  createdAt: string;
}

export interface Locacao {
  id: string;
  client: string;
  equipment: string;
  startDate: string;
  endDate?: string;
  value: number;
  status: 'ativo' | 'encerrado';
  obs?: string;
}

export const DEFAULT_TIERS: Tier[] = [
  { id: 't1', name: 'Balcão', margin: 119, color: '#5C9EFF' },
  { id: 't2', name: 'Técnico', margin: 101, discount: 15, color: '#00C9A7' },
  { id: 't3', name: 'Fidelizado', margin: 90, discount: 20, color: '#B48AFF' },
];
