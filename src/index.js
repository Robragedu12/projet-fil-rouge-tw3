"use strict";
// const nom: string = "Test";
// const age: number = 30 ;
// const majeur: boolean = true;
function estSTUB(v) {
    return typeof v === "object" && v !== null
        && "name" in v && typeof v.name === "string"
        && "url" in v && typeof v.url === "string";
}
async function getSTUB() {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        if (res.ok === false) {
            throw new Error("Erreur lors du chargement du STUB");
        }
        const reponse = await res.json();
        for (const item of reponse.results) {
            if (!estSTUB(item)) {
                throw new Error("STUB invalide");
            }
        }
        const MonObjet = reponse.results;
        return MonObjet;
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log("Une erreur inconnue", err);
        }
    }
}
async function main() {
    try {
        const data = await getSTUB();
        if (data) {
            for (const item of data) {
                const resPokemon = await fetch(item.url);
                if (resPokemon.ok === false) {
                    throw new Error(`Erreur lors du chargement du Pokémon : ${item.name}`);
                }
                const pokemon = await resPokemon.json();
                console.log(`Pokemon : ${pokemon.name} | hauteur : ${pokemon.height} | poids : ${pokemon.weight}`);
                if (pokemon.sprites?.front_default) {
                    console.log(`Image : ${pokemon.sprites.front_default}`);
                }
            }
        }
        console.log(data);
    }
    catch (err) {
        throw new Error("erreur lors de l'appel à l'API");
    }
}
main();
