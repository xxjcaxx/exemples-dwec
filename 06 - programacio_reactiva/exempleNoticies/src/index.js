import './styles.css';

function extractInterpolations(template){
    let regex = /\{\{([^\{\}]*)\}\}/g;
    let interpolations = [...template.matchAll(regex)] //.map(m => m[1])  // regex.exec(template);
    console.log(interpolations);
    return interpolations;
}

function applyInterpolations(template,data){
    return  extractInterpolations(template).reduce((T,[I,att]) => T = T.replace(I,data[att]),template);
}

function wrapElement(innerHTML){
    let wrapper = document.createElement('div');
    wrapper.innerHTML = innerHTML;
    return wrapper.firstElementChild;
}

async function getnews(offset) {
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"
    let access_token = '';


        let response = await fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/news?select=*', {
            method: 'GET',
            headers: {
                "apiKey": SUPABASE_KEY,
                "Content-Type": `application/json`,
                "Range": `${offset}-${offset+9}`
            }
        })
    
       return await response.json();
        //console.log(news);
}


function renderNews(news){   //// Tècnica de plantilles 
    let newsTemplate = `
    <article id="article_{{id}}">
    <a href="{{link}}"><h2>{{headline}}</h2></a>
    <time>{{date}}</time><address>{{authors}}</address>
    <p>{{short_description}}</p>
    <p>{{category}}</p>
    </article>
    `;
    return wrapElement(applyInterpolations(newsTemplate,news));
}



document.addEventListener('DOMContentLoaded', () => {

    getnews(0).then(news=>{
       news.forEach(n =>  document.querySelector('#container').append(renderNews(n)))
    })
    
   
});