export {home};
import {generateGraphCard} from "../views/cards.js"

function home(){
    let mainWindowRow = document.createElement("div");
    mainWindowRow.classList.add("row", "gx-2", "gy-2", "row-cols-3");

    


    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"
    let access_token = '';

    fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/graphs',{ 
      method: 'get',
      headers: {
          "apiKey": SUPABASE_KEY,
          "Authorization": "Bearer "+localStorage.getItem('access_token')
      }
  })
      .then(r => r.json())
      .then(d => {
        console.log(d);
        for (let g of d) {
          mainWindowRow.append(generateGraphCard(g));
        }
      } );

      return mainWindowRow;
}