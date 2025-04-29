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
    }
    return jokesList;   
}

function displayJokesFeed(jokesList) {
    //on lie la division "jokeFeed" à ma fonction
    const feed = document.querySelector('.jokefeed')
    

    //on boucle sur chaque élément de ma liste de blague
    jokesList.forEach(joke => {
        joke.endIsDisplayed = false;
        console.log(joke.endIsDisplayed)
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
    }) 

}


fetchJoke(10)
    .then (jokesList => displayJokesFeed(jokesList));
