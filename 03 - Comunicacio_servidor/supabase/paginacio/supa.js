const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"
let access_token = '';

async function getReviews(start,end){
    let response =  await fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/reviews?select=*',{ 
        method: 'get',
        headers: {
            "apiKey": SUPABASE_KEY,
            "Range": `${start}-${end}`
        }
    })

    let reviews = await response.json();
    return reviews;
}


(() => {
    document.addEventListener('DOMContentLoaded', () => {

    getReviews(0,9).then(console.log)
 })
})
();