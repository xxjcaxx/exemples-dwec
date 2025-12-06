export {

  ofertasSubject,
  getSupabase,
  getJornadas,
  getTiposContrato,
  getFunciones,
  getOfertas,
};

import { Subject } from 'rxjs';

const ofertasSubject = new Subject();

const headers = {
  'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd25mYmhuZW1laGl4aGl1cGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzIxMzgsImV4cCI6MjA3NjEwODEzOH0.3cNnBxWPVvpfr0vcFvbr2fxz2y20ZW2GNS6IZS6pHK0',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd25mYmhuZW1laGl4aGl1cGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzIxMzgsImV4cCI6MjA3NjEwODEzOH0.3cNnBxWPVvpfr0vcFvbr2fxz2y20ZW2GNS6IZS6pHK0',
  'Range': '0-99',
}

const getSupabase = async ({table, headers, query}) => {
  const response = await fetch(`https://zjwnfbhnemehixhiupey.supabase.co/rest/v1/${table}${query ? `?${query}`: ''}`, {
    method: 'GET',
    headers
  });
  const data = await response.json();
  return data;
}

const getJornadas = async () => {
  return getSupabase({table: 'jornadas', headers});
}
const getTiposContrato = async () => {
  return getSupabase({table: 'tipos_contrato', headers});
}

const getFunciones = async () => {
  return getSupabase({table: 'funciones', headers});
}

const getOfertas = async (query) => {
  const ofertas = getSupabase({table: 'ofertas', headers, query});
  ofertasSubject.next(await ofertas);
}

