const myUrl = "https://v2.jokeapi.dev/joke/Any?lang=fr";
let endIsDisplayed = [];
//permet l'affichage du menu dropdown
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
        isMenuDisplayed = true;
    } else {
        const menu = document.querySelector(".header__dropdownMenu");
        menu.innerHTML = '';
        isMenuDisplayed = false;
    }
}


//va aller chercher le code en dessous uniquement si je suis sur la page du feed (page accueil)
if(document.querySelector('#feed')){
    //appel de l'API x fois, pour avoir x blagues
    async function loadJoke() {
        fetch(myUrl)
            .then(resp => resp.json())
            .then(joke => displayOneJoke(joke))
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
    function displayJokesFeed(jokeNum) {
        for(i = 0; i < jokeNum ; i++){
            loadJoke();
        }
    }

    displayJokesFeed(10); 

    const reloadButton = document.querySelector(".main__reloadButton");
    reloadButton.addEventListener('click', reloadJokes);

    function reloadJokes() {
        const feed = document.querySelector('.jokefeed')
        feed.innerHTML='';
        displayJokesFeed(10); 
    }



    const addForm = document.querySelector('.main__addButton');
    addForm.addEventListener('click', displayForm);

    let isFormDisplayed = false;

    function displayForm() {
        if (!isFormDisplayed) {
            const divAddForm = document.querySelector('.main__addForm');
            const form = document.createElement('div');
            form.className = 'main__addForm__form'
            divAddForm.appendChild(form);
            
            form.innerHTML = `
            <fieldset>
                <legend>Votre blague à ajouter</legend>
                <label for="setup">Question :</label><br>
                <input type="text" id="setup" name="setup" required><br>
                <label for="delivery">Réponse :</label><br>
                <input type="text" id="delivery" name="delivery"><br>
                <button type="submit" class="main__addForm__form__submitButton">Afficher ma blague</button>
            </fieldset>
            <p>OU :</p>
            `
            const submitButton = document.querySelector(".main__addForm__form__submitButton");
            submitButton.addEventListener('click', displayAddedJoke);
        
            //crée un bouton qui ajoute une blague random en faisant appel à l'API
            const randJokeButton = document.createElement("button");
            form.appendChild(randJokeButton);
            randJokeButton.className = 'main__addForm__form__randJokeButton';
            randJokeButton.textContent = 'Nouvelle blague aléatoire';
            randJokeButton.addEventListener('click', addRandJoke);


            isFormDisplayed = true;
        } else {
            const divAddForm = document.querySelector('.main__addForm');
            divAddForm.innerHTML='';

            isFormDisplayed = false;
        }
    }

    function getUserData() {
        let addedJoke = {};
        addedJoke.setup = document.querySelector('#setup').value;
        addedJoke.delivery = document.querySelector('#delivery').value;
        return addedJoke;


    }

    function displayAddedJoke() {
        displayOneJoke(getUserData());
        const divAddForm = document.querySelector('.main__addForm');
        divAddForm.innerHTML='';

        isFormDisplayed = false;
    }

    function addRandJoke() {
        loadJoke();
        const divAddForm = document.querySelector('.main__addForm');
        divAddForm.innerHTML='';

        isFormDisplayed = false;
    }
}