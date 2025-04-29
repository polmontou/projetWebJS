
async function afficherJoke() {
    const reponse = await fetch("https://v2.jokeapi.dev/joke/Any?lang=fr");
    const jokes = await reponse.json();
}

afficherJoke();

jokes.forEach(joke => {
    

})