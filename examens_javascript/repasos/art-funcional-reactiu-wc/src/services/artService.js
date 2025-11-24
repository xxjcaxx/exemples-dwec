import { from, tap, switchMap } from "rxjs";
import { _ } from "../utils";

export const addImgUrL = (artWork) => {
    // 
    /*
    Les imatges es poden obtenir amb la següent URL:
    https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg

    Afegeix la propietat 'img_url' a l'objecte artWork amb l'URL de la imatge corresponent.
    Retorna una copia de l'objecte artWork modificat.
    */
    return {
        ...artWork,
        img_url: `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`
    };
}


export const getArts = async (url) => {
    // Implementació de la funció per obtenir les obres d'art
    /*
    Rep una URL i retorna una promesa que es resol amb una llista d'obres d'art.
    Cada obra d'art ha de tenir una propietat addicional 'img_url' amb l'URL de la imatge.
    Utilitza les funcions del mòdul utils.js per a les operacions asíncrones i de transformació.
    */
    const data = await _.getURL(url);
    if (!data || !Array.isArray(data.data)) {
        return [];
    }
    return data.data
}


export const getAllDataArtWork = async (artWork) => {
    // Implementació de la funció per obtenir totes les dades d'una obra d'art
    /*
    Rep un objecte artWork i retorna una promesa que es resol amb l'objecte artWork complet amb totes les seves dades.
    Utilitza les funcions del mòdul utils.js per a les operacions asíncrones i de transformació.
    */
    const url = `https://api.artic.edu/api/v1/artworks/${artWork.id}`;
    const data =  await _.getURL(url);
    if (!data || !data.data) {
        return artWork;
    }
    return {
        ...artWork,
        ...addImgUrL(data.data)
    };
}

export const getALlDataArtworks = async (artWorks) => {
    // Implementació de la funció per obtenir totes les dades d'una llista d'obres d'art
    /*
    Rep una llista d'objectes artWork i retorna una promesa que es resol amb la llista d'objectes artWork complets amb totes les seves dades.
    Utilitza les funcions del mòdul utils.js per a les operacions asíncrones i de transformació.
    Utilitza la funció getAllDataArtWork per obtenir les dades de cada obra d'art.
    */
    const promises = artWorks.map(artWork => getAllDataArtWork(artWork));
    return Promise.all(promises);
}


export const searchArts =  (filter$) => 
    filter$.pipe(
        switchMap((filter) => from(getArts(`https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(filter)}`))),
        switchMap((arts) => getALlDataArtworks(arts) ),
    );
    // Implementació de la funció per cercar obres d'art
    /*
    
    */

