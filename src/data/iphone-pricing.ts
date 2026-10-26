/** Valores de demonstração para protótipo. Substituir antes de divulgar a loja. */
export type PhoneCondition = 'lacrado' | 'usado';
export const demoIphonePrices: Record<string, Record<PhoneCondition, Record<string, number>>> = {
  'iphone-x': { lacrado: { '64 GB': 1899, '256 GB': 2199 }, usado: { '64 GB': 1199, '256 GB': 1499 } },
  'iphone-xs': { lacrado: { '64 GB': 2099, '256 GB': 2399 }, usado: { '64 GB': 1399, '256 GB': 1699 } },
  'iphone-xs-max': { lacrado: { '64 GB': 2299, '256 GB': 2599 }, usado: { '64 GB': 1599, '256 GB': 1899 } },
  'iphone-xr': { lacrado: { '64 GB': 1799, '128 GB': 1999 }, usado: { '64 GB': 1099, '128 GB': 1299 } },
  'iphone-11': { lacrado: { '64 GB': 2199, '128 GB': 2399 }, usado: { '64 GB': 1499, '128 GB': 1699 } },
  'iphone-11-pro': { lacrado: { '64 GB': 2599, '256 GB': 2899 }, usado: { '64 GB': 1799, '256 GB': 2099 } },
  'iphone-11-pro-max': { lacrado: { '64 GB': 2899, '256 GB': 3199 }, usado: { '64 GB': 1999, '256 GB': 2299 } },
  'iphone-12': { lacrado: { '64 GB': 2499, '128 GB': 2699 }, usado: { '64 GB': 1699, '128 GB': 1899 } },
  'iphone-12-mini': { lacrado: { '64 GB': 2299, '128 GB': 2499 }, usado: { '64 GB': 1499, '128 GB': 1699 } },
  'iphone-12-pro': { lacrado: { '128 GB': 2999, '256 GB': 3299 }, usado: { '128 GB': 2099, '256 GB': 2399 } },
  'iphone-12-pro-max': { lacrado: { '128 GB': 3299, '256 GB': 3599 }, usado: { '128 GB': 2299, '256 GB': 2599 } },
  'iphone-13': { lacrado: { '128 GB': 3299, '256 GB': 3599, '512 GB': 3999 }, usado: { '128 GB': 2399, '256 GB': 2699, '512 GB': 3099 } },
  'iphone-13-mini': { lacrado: { '128 GB': 2999, '256 GB': 3299 }, usado: { '128 GB': 2199, '256 GB': 2499 } },
  'iphone-13-pro': { lacrado: { '128 GB': 3899, '256 GB': 4199, '512 GB': 4599 }, usado: { '128 GB': 2899, '256 GB': 3199, '512 GB': 3599 } },
  'iphone-13-pro-max': { lacrado: { '128 GB': 4299, '256 GB': 4599, '512 GB': 4999 }, usado: { '128 GB': 3199, '256 GB': 3499, '512 GB': 3899 } },
  'iphone-14': { lacrado: { '128 GB': 3799, '256 GB': 4099, '512 GB': 4499 }, usado: { '128 GB': 2799, '256 GB': 3099, '512 GB': 3499 } },
  'iphone-14-plus': { lacrado: { '128 GB': 4199, '256 GB': 4499 }, usado: { '128 GB': 3099, '256 GB': 3399 } },
  'iphone-14-pro': { lacrado: { '128 GB': 4699, '256 GB': 4999, '512 GB': 5399 }, usado: { '128 GB': 3599, '256 GB': 3899, '512 GB': 4299 } },
  'iphone-14-pro-max': { lacrado: { '128 GB': 5099, '256 GB': 5399, '512 GB': 5799 }, usado: { '128 GB': 3899, '256 GB': 4199, '512 GB': 4599 } },
  'iphone-15': { lacrado: { '128 GB': 4299, '256 GB': 4599, '512 GB': 4999 }, usado: { '128 GB': 3299, '256 GB': 3599, '512 GB': 3999 } },
  'iphone-15-plus': { lacrado: { '128 GB': 4699, '256 GB': 4999 }, usado: { '128 GB': 3599, '256 GB': 3899 } },
  'iphone-15-pro': { lacrado: { '128 GB': 5299, '256 GB': 5599, '512 GB': 5999 }, usado: { '128 GB': 4099, '256 GB': 4399, '512 GB': 4799 } },
  'iphone-15-pro-max': { lacrado: { '256 GB': 5899, '512 GB': 6299, '1 TB': 6699 }, usado: { '256 GB': 4599, '512 GB': 4999, '1 TB': 5399 } },
  'iphone-16': { lacrado: { '128 GB': 4999, '256 GB': 5299, '512 GB': 5699 }, usado: { '128 GB': 3899, '256 GB': 4199, '512 GB': 4599 } },
  'iphone-16-plus': { lacrado: { '128 GB': 5399, '256 GB': 5699 }, usado: { '128 GB': 4199, '256 GB': 4499 } },
  'iphone-16-pro': { lacrado: { '128 GB': 6299, '256 GB': 6599, '512 GB': 6999 }, usado: { '128 GB': 4999, '256 GB': 5299, '512 GB': 5699 } },
  'iphone-16-pro-max': { lacrado: { '256 GB': 6999, '512 GB': 7399, '1 TB': 7799 }, usado: { '256 GB': 5599, '512 GB': 5999, '1 TB': 6399 } },
  'iphone-17': { lacrado: { '256 GB': 5999, '512 GB': 6399 }, usado: { '256 GB': 4699, '512 GB': 5099 } },
  'iphone-17-air': { lacrado: { '256 GB': 6799, '512 GB': 7199, '1 TB': 7599 }, usado: { '256 GB': 5399, '512 GB': 5799, '1 TB': 6199 } },
  'iphone-17-pro': { lacrado: { '256 GB': 7599, '512 GB': 7999, '1 TB': 8399 }, usado: { '256 GB': 6099, '512 GB': 6499, '1 TB': 6899 } },
  'iphone-17-pro-max': { lacrado: { '256 GB': 8299, '512 GB': 8699, '1 TB': 9099 }, usado: { '256 GB': 6699, '512 GB': 7099, '1 TB': 7499 } },
  'iphone-duo': { lacrado: { '256 GB': 10999, '512 GB': 11999, '1 TB': 12999, '2 TB': 13999 }, usado: { '256 GB': 8799, '512 GB': 9599, '1 TB': 10399, '2 TB': 11199 } },
  'iphone-18-pro': { lacrado: { '256 GB': 8999, '512 GB': 9599, '1 TB': 10299, '2 TB': 11399 }, usado: { '256 GB': 7299, '512 GB': 7799, '1 TB': 8399, '2 TB': 9299 } },
  'iphone-18-pro-max': { lacrado: { '256 GB': 9999, '512 GB': 10599, '1 TB': 11299, '2 TB': 12399 }, usado: { '256 GB': 8099, '512 GB': 8599, '1 TB': 9199, '2 TB': 10099 } },
};

export function demoPriceLabel(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
