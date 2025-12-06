import { of } from "rxjs";
import "./components/buscador/buscador.js";
import { ofertasSubject, getJornadas, getFunciones, getOfertas, getTiposContrato } from "./services/supaservice.js";
import "./style.css";

const renderOferta = (oferta) => {
  const ofertaDiv = document.createElement("div");
      ofertaDiv.classList.add("oferta");
      ofertaDiv.innerHTML = `
        <h2>${oferta["Título"]}</h2>
        <p><strong>Ubicación:</strong> ${oferta.Ubicación}</p>
        <p><strong>Salario:</strong> ${oferta["Salario Mínimo"]} - ${oferta["Salario Máximo"]}</p>
        <p><strong>Jornada:</strong> ${oferta.Jornada}</p>
        <p><strong>Tipo de Contrato:</strong> ${oferta["Tipo contrato"]}</p>
        <p><strong>Función:</strong> ${oferta.Funciones}</p>
        <p><strong>Experiencia:</strong> ${oferta.Experiencia}</p>
        <a href="${oferta.Enlace}" target="_blank">Ver Oferta</a>
      `;
        return ofertaDiv;
}

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  const buscador = document.querySelector("tecno-buscador");

  const jornadas = await getJornadas();
  buscador.insertJornadas(jornadas);

  const tiposContrato = await getTiposContrato();
  buscador.insertTiposContrato(tiposContrato);

  const funciones = await getFunciones();
  buscador.insertFunciones(funciones);

  buscador.filtersSubject.subscribe(getOfertas);
  buscador.filtersSubject.next(null); // Demanar les primeres ofertes sense filtres
 
  ofertasSubject.subscribe((ofertas) => {
    app.replaceChildren(...ofertas.map(renderOferta));
  });
});