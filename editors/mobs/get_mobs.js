const WhenLoaded = [];
let a = new Mob(
    {
        name: "Wandering Zombie",
        internalId: "wandering_zombie",
    }, 
    {
        health: 50,
        defense: 25
    }, 
    {
        minecraftId: "zombie",
        level: 5,
    }
);

let b = new Mob(
    {
        name: "Snowy Wolf",
        internalId: "snowy_wolf",
    }, 
    {
        health: 200,
        defense: 80
    }, 
    {
        minecraftId: "wolf",
        level: 30,
        textureVariant: "snowy"
    }
);

let c = new Mob(
    {
        name: "Cat",
        internalId: "cat",
    }, 
    {
        health: 200,
        defense: 80
    }, 
    {
        minecraftId: "cat",
        level: 30,
        textureVariant: "ocelot"
    }
);

const allMobs = [];
allMobs.push(a, b, c);