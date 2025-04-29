let jokesList = [];

async function fetchJoke(x) {
    for (y=0; y<x; y++) {
        const reponse = await fetch("https://v2.jokeapi.dev/joke/Any?lang=fr");
        const joke = await reponse.json();
        jokesList.push(joke);
    }
       
}

fetchJoke(10);
console.log(jokesList);