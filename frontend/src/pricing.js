// Precios base de Websy en USD y referencias comerciales en moneda local.
// Las conversiones son orientativas y se redondean para no mostrar una falsa precisión.
// Actualizar `usdRate` cuando cambie de forma material el tipo de cambio.

export const PRICING_UPDATED_AT = 'octubre de 2026';

export const MARKET_PRICING = {
  AR: { country: 'Argentina', currency: 'ARS', locale: 'es-AR', usdRate: 1462.5, roundTo: 10000, payment: 'Mercado Pago o Naranja X' },
  CO: { country: 'Colombia', currency: 'COP', locale: 'es-CO', usdRate: 3800, roundTo: 100000, payment: 'Dólar App o Binance' },
  MX: { country: 'México', currency: 'MXN', locale: 'es-MX', usdRate: 18.5, roundTo: 500, payment: 'Dólar App o Binance' },
  US: { country: 'Estados Unidos', currency: 'USD', locale: 'es-US', usdRate: 1, roundTo: 1, payment: 'Dólar App o Binance' },
  CL: { country: 'Chile', currency: 'CLP', locale: 'es-CL', usdRate: 950, roundTo: 10000, payment: 'Dólar App o Binance' },
  PE: { country: 'Perú', currency: 'PEN', locale: 'es-PE', usdRate: 3.75, roundTo: 50, payment: 'Dólar App o Binance' },
  UY: { country: 'Uruguay', currency: 'UYU', locale: 'es-UY', usdRate: 41, roundTo: 1000, payment: 'Dólar App o Binance' },
  PY: { country: 'Paraguay', currency: 'PYG', locale: 'es-PY', usdRate: 7900, roundTo: 100000, payment: 'Dólar App o Binance' },
  BO: { country: 'Bolivia', currency: 'BOB', locale: 'es-BO', usdRate: 6.9, roundTo: 100, payment: 'Dólar App o Binance' },
  EC: { country: 'Ecuador', currency: 'USD', locale: 'es-EC', usdRate: 1, roundTo: 1, payment: 'Dólar App o Binance' },
  ES: { country: 'España', currency: 'EUR', locale: 'es-ES', usdRate: 0.92, roundTo: 50, payment: 'transferencia internacional' },
};

export const DEFAULT_MARKET = 'AR';

export const PLAN_PRICES = {
  estandar: { min: 800, max: 1500 },
  comercio: { min: 1800, max: 3500 },
  pymes: { min: 4000, max: 8000 },
  corpo: { min: 10000 },
};

export const SEO_MONTHLY_PRICE_USD = 200;
export const SEO_PRICING_UPDATED_AT = '19 de octubre de 2026';

// Equivalencias comerciales del plan SEO mensual, redondeadas a partir de referencias
// de bancos centrales del 19/10/2026. Se muestran como orientación y se confirman al contratar.
const SEO_LOCAL_PRICES = {
  AR: 310000,
  CO: 635000,
  MX: 3700,
};

export const seoLocalAmount = (countryCode) => SEO_LOCAL_PRICES[countryCode]
  || localAmount(SEO_MONTHLY_PRICE_USD, countryCode);

const roundCommercial = (value, step) => Math.round(value / step) * step;

export const getMarket = (countryCode) => MARKET_PRICING[countryCode] || {
  country: 'tu país', currency: 'USD', locale: 'es-419', usdRate: 1, roundTo: 1, payment: 'Dólar App o Binance',
};

export const localAmount = (usd, countryCode) => {
  const market = getMarket(countryCode);
  return roundCommercial(usd * market.usdRate, market.roundTo);
};

export const formatLocalAmount = (usd, countryCode) => {
  const market = getMarket(countryCode);
  return new Intl.NumberFormat(market.locale, {
    style: 'currency',
    currency: market.currency,
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(localAmount(usd, countryCode)).replace(/\s+/g, ' ');
};

export const formatUsdAmount = (usd) => `USD ${new Intl.NumberFormat('es-AR').format(usd)}`;

export const formatSeoMonthlyPrice = (countryCode) => {
  const market = getMarket(countryCode);
  const amount = seoLocalAmount(countryCode);
  return `${new Intl.NumberFormat(market.locale, {
    style: 'currency',
    currency: market.currency,
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/\s+/g, ' ')}/mes`;
};

export const formatPrice = ({ min, max }, countryCode, { includeUsd = false } = {}) => {
  const market = getMarket(countryCode);
  const prefix = max ? '' : 'Desde ';
  const local = max
    ? `${formatLocalAmount(min, countryCode)} a ${formatLocalAmount(max, countryCode)}`
    : `${prefix}${formatLocalAmount(min, countryCode)}`;

  if (!includeUsd || market.currency === 'USD') return local;
  const usd = max ? `${formatUsdAmount(min)} a ${formatUsdAmount(max)}` : `${prefix}${formatUsdAmount(min)}`;
  return `${local} (aprox. ${usd})`;
};

export const pricingNote = (countryCode) => {
  const market = getMarket(countryCode);
  if (market.currency === 'USD') return 'Precios en dólares estadounidenses. El alcance y el precio final quedan cerrados por escrito antes de empezar.';
  return `Valores orientativos en ${market.currency}, actualizados en ${PRICING_UPDATED_AT}. El presupuesto se acuerda en moneda local con su equivalencia en USD y queda cerrado por escrito antes de empezar.`;
};
