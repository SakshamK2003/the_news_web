const API_KEY = "414b2073bcc34ab19f0dca94ffd19bc7";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   console.log(data);
   bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach((article) => {
    if(!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);//creating a clone for the cards with all elements in the card
    fillDataInCard(cardClone,article);
    cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc= cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
     timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}
    let curSelectedNav = null;                  //on selection of any nav say ipl it will load the data of its specific field 
    function onNavItemClick(id){
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove("active");          // if current selected nav is null then remove th active nav
        curSelectedNav = navItem;
        curSelectedNav.classList.add("active");           //add the active nav on clicking by removing the previous one and replacing it with the new one
        }

        const searchButton = document.getElementById("search-button");
        const searchText= document.getElementById("search-text");

        searchButton.addEventListener("click", () => {
            const query = searchText.value;       // search only when the text is searched in search box
            if(!query) return;                // if any button is randomly clicked then return i.e without any search text(query)
            fetchNews(query);
        curSelectedNav?.classList.remove("active");    //if anything is searched then remove the active nav by making it null
        curSelectedNav = null;

        });



