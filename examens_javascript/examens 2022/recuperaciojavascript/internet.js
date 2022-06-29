export {getNews, getOneArticle};


async function getNews(start){
    let response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=10&_start=${start}`);
    response = await response.json();
    return response;
}


async function getOneArticle(id){
    let response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`);
    response = await response.json();
    return response;
}