
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
    function addRemoveButton(div) {
        const removeButton = document.createElement('div');
        div.appendChild(removeButton);
        div.style.position = 'relative';
        removeButton.className = "main__removeAddedContent";
        removeButton.textContent= "X";
        removeButton.addEventListener('click', () => removeAddedContent(div));
    }
 
    function removeAddedContent(div) {
        div.remove();
    }

//va aller chercher le code en dessous uniquement si je suis sur la page du feed (page accueil)
if(document.querySelector('#feed')){

    const myUrl = "https://v2.jokeapi.dev/joke/Any?lang=fr";
    let endIsDisplayed = [];
    //appel de l'API x fois, pour avoir x blagues
    async function loadJoke() {
        fetch(myUrl)
            .then(resp => resp.json())
            .then(joke => displayOneJoke(joke, false))
    }

    function displayOneJoke(joke, manuallyAdded) {
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
        if (manuallyAdded){
            addRemoveButton(jokeCard);
        }

    }
    function displayJokesFeed(jokeNum) {
        for(i = 0; i < jokeNum ; i++){
            loadJoke();
        }
    }


    // définit le nombre de blagues affichées
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
            <form
                <legend>Votre blague à ajouter</legend>
                <label for="setup">Question :</label><br>
                <input type="text" id="setup" name="setup" required><br>
                <label for="delivery">Réponse :</label><br>
                <input type="text" id="delivery" name="delivery"><br>
                <button type="submit" class="main__addForm__form__submitButton">Afficher ma blague</button>
            </form>
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
        console.log(addedJoke);
        return addedJoke;


    }

    function displayAddedJoke() {
        displayOneJoke(getUserData(), true);
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

//va aller chercher le code en dessous uniquement si je suis sur la page du feed (page accueil)
if(document.querySelector('#gallery')){
    //affichage du feed d'image de monstres
    const numberMonsterImg = 11;
    let monstersList;

    //charge une liste de monstres
    async function loadMonsterList(){
        const resp = await fetch('https://www.dnd5eapi.co/api/2014/monsters');
        const data = await resp.json();
        return data;
    }

    //choisit de manière aléatoire des moinstres dans cette liste et va chercher leur nom + URL de leur image
    async function chooseRandomMonster() {
            let randomIndex = Math.floor(Math.random()*monstersList.count);
            let URL = 'https://www.dnd5eapi.co'+monstersList.results[randomIndex].url;
            fetch(URL)
                .then(resp => resp.json())
                .then(monster => displayMonsterImg('https://www.dnd5eapi.co'+monster.image, monster.name, false))
    }

    //affiche l'image du monstre
    function displayMonsterImg(imgUrl, monsterName, manuallyAdded) {
        const gallery = document.querySelector('#main__gallery');
        gallery.className = "displayGallery";
        const imgCard = document.createElement('div');
        //imgCard.id = `indexImg${indexImg++}`;
        gallery.appendChild(imgCard);
        imgCard.innerHTML = `<img src='${imgUrl}' alt='${monsterName}' id='main__gallery__monsterImage' class='main__gallery__monsterImage--gallery' title='${monsterName}'>`;

        //affichage bouton suppression si l'image a été ajoutée manuellement
        if (manuallyAdded){
            addRemoveButton(imgCard);
        }
    }
     
    
    //permet l'affichage de la gallerie de monstre avec un nombre d'images défini
    async function displayMonsterGallery(){
        monstersList = await loadMonsterList();
        for (i=0; i<numberMonsterImg; i++){
            chooseRandomMonster();
        }
    }

    //création de 2boutons qui swipent l'affichage en vue gallerie/liste
    const buttonGallery = document.querySelector('.main__buttonView--gallery');
    buttonGallery.addEventListener('click', galleryModifier);
    const buttonList = document.querySelector('.main__buttonView--list');
    buttonList.addEventListener('click', listModifier);

    function galleryModifier() {
        const gallery = document.querySelector('#main__gallery');
        gallery.className = "displayGallery";
        const img = document.querySelector('#main__gallery__monsterImage');
        
    }
    function listModifier() {
        const gallery = document.querySelector('#main__gallery');
        gallery.className = "displayList";
    }

    displayMonsterGallery();

    //création bouton ajout image
    const buttonAddImg = document.querySelector('.main__addButton');
    buttonAddImg.addEventListener('click', addImgForm);
    
    let addImgIsDisplayed = false;

    function addImgForm() {
        if (!addImgIsDisplayed) {
            const divAddImg = document.querySelector("#main__addImg");
            const addImgWindow = document.createElement('div');
            addImgWindow.className = 'main__addImgWindow';
            divAddImg.appendChild(addImgWindow);

            addImgWindow.innerHTML = `
            <form>
                <label for="myfile">Choisis ton image : </label>
                <input type="file" id="addedImg" name="addedImg" accept='.png, .jpeg, .jpg'>
                <button type="submit" class="main__addImg__submitButton">Ajouter mon monstre</button>
            </form> `;
            addImgIsDisplayed = true;
        } else {
            const addImgWindow = document.querySelector('.main__addImgWindow');
            addImgWindow.remove();
            addImgIsDisplayed = false;
        }

        const submitButton = document.querySelector(".main__addImg__submitButton");
        submitButton.addEventListener('click', displayAddedImg);
    }

    function displayAddedImg() {
            let input = document.querySelector('#addedImg');
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    displayMonsterImg(e.target.result, file.name, true)
                };
                reader.readAsDataURL(file);
            }

            const divAddImg = document.querySelector("#main__addImg");
            divAddImg.innerHTML = '';
            addImgIsDisplayed = false;
    }

    //carroussel publicité
    let stockPub = { 
        'Dofus Ocre' : 'image/dofusocre.jpeg',
        'Dofus Pourpre' : 'image/dofuspourpre.jpeg',
        'Dofus Turquoise' : 'image/dofusturquoise.jpeg'
    };

    function createCarrouselHtml () {
        const carrouselDiv = document.querySelector('.main__pub');
        const carrouselSpace = document.createElement('div');
        carrouselSpace.className = 'main__pub__carrouselItems';
        carrouselDiv.appendChild(carrouselSpace);
        for (const paire in stockPub) {
            const carrouselItem = document.createElement('div');
            carrouselSpace.appendChild(carrouselItem);
            carrouselItem.className = 'main__pub__carrouselItems__item';
            carrouselItem.innerHTML = `
            <img src='${stockPub[paire]}' alt='${paire}'>
            <div class='item__text'>${paire}</div>`;
        }
    }
    createCarrouselHtml();

    const carouselItems = document.querySelectorAll(".main__pub__carrouselItems__item"); 
    let i = 1;

    setInterval(() => {
    Array.from(carouselItems).forEach((item) => {

    if(i < carouselItems.length){
        item.style.transform = `translateX(-${i*100}%)`
    }
    })


    if(i < carouselItems.length){
        i++;
    }
    else{
        i=0;
    }
    },1500)


}