
async function afficherJoke() {
    const reponse = await fetch("https://v2.jokeapi.dev/joke/Any?lang=fr");
    const films = await reponse.json();
    console.log(films);
}

afficherJoke();