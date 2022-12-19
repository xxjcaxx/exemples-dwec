export {getReviews, getProducts};

const URL = "https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"


const getItems = async (uri)=>{
    let response = await fetch(`${URL}${uri}`,
    {
        method: 'GET',
        headers: {
            apiKey,
            Authorization: `Bearer ${apiKey}`,
            Range: "0-100"
        }
    }
)
let data = await (await response).json();
return data
}

const getReviews = async () => {
   return getItems('reviews?select=*');
};

const getProducts = async () => {
    return getItems('products?select=*');
};