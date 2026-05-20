
export const API_BASE_URL = 'https://api-colombia.com/api/v1/';
import { BehaviorSubject } from 'rxjs';

export async function getCities(page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/City/pagedList?Page=${page}&PageSize=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch cities');
    }
    return response.json();
}

export async function getCityDetails(cityId) {
    const response = await fetch(`${API_BASE_URL}/City/${cityId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch city details');
    }
    return response.json();
}

export async function getAttractions(){
    const response = await fetch(`${API_BASE_URL}/TouristicAttraction`);
    if (!response.ok) {
        throw new Error('Failed to fetch attractions');
    }
    return response.json();
}

export async function getAttractionDetails(attractionId) {
    const response = await fetch(`${API_BASE_URL}/TouristicAttraction/${attractionId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch attraction details');
    }
    return response.json();
}


export const attractionSubject = new BehaviorSubject([]);

export async function loadAttractionsDetails(){
    try{
        const attractions = await getAttractions();
        attractionSubject.next(attractions);
        for(const attraction of attractions){
            const cityDetails = await getCityDetails(attraction.cityId);
            attraction.city = cityDetails;
            
        }
        attractionSubject.next(attractions);
    }
    catch(error){

    }
    
}

