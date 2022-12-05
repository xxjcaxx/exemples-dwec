async function uploadnews(news) {
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"
    let access_token = '';

    let newsGroups = news.reduce((grups,current,index)=>{
        if(index%100 == 0){
            grups.push([]);
        }
        grups[grups.length-1].push(current);
        return grups;
    },[]);

   


    for(let n of newsGroups) {
  //  let n = news[0];
     //   console.log(n);
        let response = await fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/news', {
            method: 'POST',
            headers: {
                "apiKey": SUPABASE_KEY,
                "Content-Type": `application/json`,
                "Prefer": "return=representation"
            },
            body: JSON.stringify(n)
        })
    
       // let reviews = await response.json();
        

    } 

   

}



document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#upload').addEventListener('click', () => {

        fetch('News_Category_Dataset_v3.json').then(response => response.json()).then(news =>  uploadnews(news))
       



    })

});