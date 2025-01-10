import { getHousings } from "../http.js";
import { generateCRUDTABLE } from '../components/tables.js';
import {ぁ} from "../utils.js";

export const home = async (container) =>  container.innerHTML = generateCRUDTABLE(ぁ.removeAttributes(await getHousings(0))(['Job #','Crub Cut', 'Horizontal Enlrgmt', 'Vertical Enlrgmt' ]));