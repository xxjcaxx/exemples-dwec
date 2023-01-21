export {getReviews, getProducts, searchReviews, getQty};

const URL = "https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"


const getItems = async (uri,range)=>{
    let response = await fetch(`${URL}${uri}`,
    {
        method: 'GET',
        headers: {
            apiKey,
            Authorization: `Bearer ${apiKey}`,
            Range: range
        }
    }
)
let data = await (await response).json();
return data
}

const getReviews = async () => {
   return getItems('reviews?select=*');
};

const searchReviews = async (asin) => {
    return getItems(`reviews?asin=eq.${asin}&select=*`);
 };

const getProducts = async (pagina) => {
    return getItems('products?select=*',`${pagina*10}-${pagina*10+10}`);
};

const getQty = async (table) => {
    let response = await fetch(`${URL}${table}?select=*`,
    {
        method: 'HEAD',
        headers: {
            apiKey,
            Authorization: `Bearer ${apiKey}`,
            prefer: "count=exact"
        }
    });
    let qty = response.headers.get('content-range');
    return qty.split('/')[1];
}