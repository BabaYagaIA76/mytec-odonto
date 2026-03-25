/**
 * Pure pricing calculation functions, mirroring the original HTML logic.
 */

/** Rounds a value up to the nearest multiple of 5 */
function roundToFive(val: number): number {
  return Math.ceil(val / 5) * 5;
}

/** Cost with tax: (cost + freight) / (1 - tax%) */
export function calcCostWithTax(cost: number, freight: number, taxPct: number): number {
  const base = cost + freight;
  if (taxPct >= 100) return base;
  return base / (1 - taxPct / 100);
}

/** Price from cost + margin, rounded to nearest R$5 */
export function calcPrice(costImp: number, marginPct: number): number {
  const raw = costImp / (1 - marginPct / 100);
  return roundToFive(raw);
}

/** Floor price = costImp × 1.3, rounded to R$5 */
export function calcFloor(costImp: number): number {
  return roundToFive(costImp * 1.3);
}

/** Effective margin after rounding: (price - costImp) / price × 100 */
export function calcMarginAfter(price: number, costImp: number): number {
  if (price <= 0) return 0;
  return ((price - costImp) / price) * 100;
}

/** Format as Brazilian currency string */
export function fmtBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

/** Format as short BRL: R$ 1.234,56 */
export function fmtBRLShort(value: number): string {
  return 'R$ ' + (value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
