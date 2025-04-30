const myUrl = "https://v2.jokeapi.dev/joke/Any?lang=fr";
let endIsDisplayed = [];

//appel de l'API x fois, pour avoir x blagues
async function fetchJoke(jokeNumber) {
    let jokesList = [];
    for (y=0; y<jokeNumber; y++) {
        //appel d'API avec fetch
        const response = await fetch(myUrl)
        //transforme la réponse au format JSON
        const joke = await response.json();  
        //ajoute la blague dans une liste
        jokesList.push(joke);
        endIsDisplayed.push(false); 
    }
    return jokesList;   
}

function displayOneJoke(joke) {
    //on lie la division "jokeFeed" à ma fonction
    const feed = document.querySelector('.jokefeed')
    //crée une div pour ma blague
    const jokeCard = document.createElement("div");
    jokeCard.className = "main__feed__joke";
    //attribue le texte de ma blague à ma div
    jokeCard.innerHTML = `<p>${joke.setup}</p>`;
    //crée un button pour ma fonction
    const buttonReveal = document.createElement("button");
    buttonReveal.className = "main__feed__joke__button"
    buttonReveal.textContent = "Réponse";
    //ajoute mon bouton à ma carte
    jokeCard.appendChild(buttonReveal);
    //création variable permet de savoir si ma réponse est affichée
    let endIsDisplayed = false;
    //crée une fonction qui permet d'afficher le résultat de ma blague
    function displayJokesEnd() {
        if (!endIsDisplayed) {
            const jokesEnd = document.createElement("p");
            jokesEnd.className = "main__feed__joke__response";
            jokesEnd.innerHTML = `<p>${joke.delivery}`;
            jokeCard.appendChild(jokesEnd);
            endIsDisplayed = true;
        } else {
            const jokesEnd = document.querySelector(".main__feed__joke__response");
            jokesEnd.remove();
            endIsDisplayed = false;
        }
    };
    //lie mon bouton créé au-dessus à ma fonction par le click de l'utilisateur
    buttonReveal.addEventListener('click', displayJokesEnd);
    feed.appendChild(jokeCard);
}
 function displayJokesFeed(jokesList) {
    jokesList.forEach(joke => {
        displayOneJoke(joke)
    });
 }

fetchJoke(10)
    .then (jokesList => displayJokesFeed(jokesList)); 

const reloadButton = document.querySelector(".main__reloadButton");
reloadButton.addEventListener('click', reloadJokes);

function reloadJokes() {
    const feed = document.querySelector('.jokefeed')
    feed.innerHTML='';
    fetchJoke(10)
        .then  (jokesList => displayJokesFeed(jokesList)); 
}

const dropdownMenu = document.querySelector(".header__menu__icon");
dropdownMenu.addEventListener('click', displayMenu);

let isMenuDisplayed = false;
let choicesMenu = {
                'Accueil': "index.html", 
                'Galerie':'gallery.html',
                'Jeux': 'jeux.html'
                } 

function displayMenu() {
    if (!isMenuDisplayed) {
        const menu = document.querySelector(".header__dropdownMenu");
        for (const paire in choicesMenu) {

            const choiceMenu = document.createElement('div');
            choiceMenu.innerHTML = `<a href=${choicesMenu[paire]}>${paire}</a>`
            menu.appendChild(choiceMenu);
        }
        const logoPage = document.querySelector('.header__image');
        logoPage.style.marginleft = '4rem';
        isMenuDisplayed = true;
    } else {
        const menu = document.querySelector(".header__dropdownMenu");
        menu.innerHTML = '';
        isMenuDisplayed = false;
    }
}