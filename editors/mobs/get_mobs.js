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

const allMobs = [];
allMobs.push(a);