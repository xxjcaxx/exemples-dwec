export function generatePagination(qty,limit,currentPage,pagesDiv){
    let pages = Math.floor(qty/limit);
    let visiblePages = [0,1,currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2,pages-1,pages];
    console.log(visiblePages);
    visiblePages = visiblePages.filter(p => p >= 0);
    visiblePages = [...new Set(visiblePages)];
    pagesDiv.innerHTML = '';
    for(let page of visiblePages){
        let pageButton = document.createElement('button');
        pageButton.innerHTML = page;
        pageButton.classList.add('page','btn','btn-primary');
        pageButton.addEventListener('click',()=>{
           window.location.hash = `#/products/page=${page}`;
        });
        pagesDiv.append(pageButton);
    }
}
