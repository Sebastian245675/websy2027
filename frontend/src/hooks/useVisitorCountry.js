import { useEffect, useState } from 'react';
import { detectCountry } from '../lib/geo';

// País del visitante después de montar. El primer render siempre es el de por defecto (null), igual que
// el HTML prerenderizado: así la hidratación coincide y la versión por país se aplica un instante después.
export default function useVisitorCountry() {
  const [country, setCountry] = useState(null);
  useEffect(() => setCountry(detectCountry()), []);
  return country;
}
