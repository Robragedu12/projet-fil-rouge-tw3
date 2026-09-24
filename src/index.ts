// const nom: string = "Test";
// const age: number = 30 ;
// const majeur: boolean = true;

// type Resultat = 
//   |{ok: true;valeur: number}
//   |{ok: false;erreur: string};

// const erreur : Resultat = {ok: false, erreur: "Erreur"};




// console.log(`Nom: ${nom}, Age: ${age}, Majeur: ${majeur}`);

// type Result<T,E = string> = {ok : true; valeur: T} | {ok: false; erreur: E};

// function diviser(a: number, b: number): Result<number> {
//   if (b === 0) {
//     return {ok: false, erreur: "Division par zéro"};
//   }
//     return {ok: true, valeur: a / b};
// }

// const r = diviser(10, 2);
// if (r.ok) {
//   console.log(r.valeur);
// }

// declare function chargerNom(id : number): Promise<string>;

// async function exemple(): Promise<void> {
//     try {
//         await chargerNom(1);
//     } catch (e){
//         if (e instanceof Error) {
//             console.log(e.message);
//         } else {
//             console.log("Une erreur inconnue", e);
//         }
//     }
// }









// interface user  {
//     id : number
//     nom : string 
//     email : string
// } 

// interface posts  {
//     id : number,
//     titre : string,
//     contenu : string,
// } 


// interface UserPost { 
//     page : number,
//     total : number,
//     resultat : posts[],
// }

// function estUser(v: unknown): v is user {
//     return typeof v === "object" && v !== null 
//            && "id" in v && typeof v.id === "number" 
//            && "nom" in v && typeof v.nom === "string" 
//            && "email" in v && typeof v.email === "string";
// }

// function estPosts(v: unknown): v is posts {
//     return typeof v === "object" && v !== null 
//            && "id" in v && typeof v.id === "number" 
//            && "titre" in v && typeof v.titre === "string" 
//            && "contenu" in v && typeof v.contenu === "string";
// }


// async function chargerUtilisateurAsync(id : number): Promise<Result<{ utilisateur: user; posts: UserPost }> | undefined> {
//     try {

//         const res0 = await fetch(`api/utilisateurs/${id}`);
//         if (res0.ok === false) {
//             throw new Error("Erreur lors du chargement de l'utilisateur");
//         }
//         //res0 --> il faut normalement le tester avant de faire le as user
//         const utilisateur = await res0.json() as user;

//         if (!estUser(utilisateur)) {
//             throw new Error("Utilisateur invalide");
//         }

//         const res = await fetch(`api/commandes/${utilisateur.id}`);
//         if (res.ok === false) {
//             throw new Error("Erreur lors du chargement des posts");
//         }
//         //res --> il faut normalement le tester avant de faire le as UserPost
//         const posts = await res.json() as UserPost;


//         if (!estPosts(posts)) {
//             throw new Error("Posts invalides");
//         }

//         return { ok: true, valeur: { utilisateur, posts } };

//     } catch (err) {
//         if (err instanceof Error) {
//             console.log(err.message);
//         } else {
//             console.log("Une erreur inconnue", err);
//         }
//     }
// }









interface STUB { 
    name : string
    url : string
}

function estSTUB(v: unknown): v is STUB {
    return typeof v === "object" && v !== null 
           && "name" in v && typeof v.name === "string"
           && "url" in v && typeof v.url === "string";
}


async function getSTUB(): Promise<STUB[] | undefined> {
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

        const MonObjet = reponse.results as STUB[];

        return MonObjet;


    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        } else {
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

                const pokemon = await resPokemon.json() as {
                    name: string;
                    height: number;
                    weight: number;
                    sprites?: {
                        front_default?: string;
                    };
                };

                console.log(`Pokemon : ${pokemon.name} | hauteur : ${pokemon.height} | poids : ${pokemon.weight}`);
                if (pokemon.sprites?.front_default) {
                    console.log(`Image : ${pokemon.sprites.front_default}`);
                }
            }
        }

        console.log(data);
    } catch (err) {
         throw new Error("erreur lors de l'appel à l'API");
    }
}

main();