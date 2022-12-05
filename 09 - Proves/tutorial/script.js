class News {
    link = ""
    
    constructor(literalObject){
       Object.assign(this,literalObject);
    }
    print(){
        return `${this.link} ${this.headline}`;
    }

}

/*function News(link,headline,category,short_description,authors,date){
    this.link = link;
    this.headline = headline;
    this.category = category;
    this.short_description = short_description;
    this.authors = authors;
    this.date = date;
}*/


let news =  {
    link: "https://www.huffpost.com/entry/reporter-gets-adorable-surprise-from-her-boyfriend-while-working-live-on-tv_n_632ccf43e4b0572027b10d74", 
    headline: "Reporter Gets Adorable Surprise From Her Boyfriend While Live On TV", 
    category: "U.S. NEWS", 
    short_description: "\"Who's that behind you?\" an anchor for New York\u2019s PIX11 asked journalist Michelle Ross as she finished up an interview.", 
    authors: "Elyse Wanshel", 
    date: "2022-09-22"
};



//let news2 = Object.assign( new News(), news)
let news2 = new News(news)



console.log(news, news2.print());
