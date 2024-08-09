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
        name: "Bat",
        internalId: "bat",
    }, 
    {
        health: 200,
        defense: 80
    }, 
    {
        minecraftId: "bat",
        level: 30,
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
    }
);

const allMobs = [];
allMobs.push(a, b, c);