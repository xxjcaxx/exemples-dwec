import {from} from "rxjs";


export const getApartments = async (province, page)=>{
    const response = await fetch('http://localhost:3000/apartments?_page=1&_per_page=10&state:eq=Chon Buri Province');
    const data = await response.json();
    console.log(data);
    
}