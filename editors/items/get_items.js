var WhenLoaded = [];
a = new StatItem(
    {
        name: "Ultimate Helmet",
        internalId: "ultimate_helmet",
    }, 
    {
        isCustomTexture: false,
        rarity: "Legendary",
        minecraftId: "leather_helmet",
        description: "Most powerful helmet to exist.",
        additional_components: [{'component': 'minecraft:dyed_color', 'value': {'rgb': 8999544, 'show_in_tooltip':false}}]
    },
    {
        strength: 110,
        critical: 65,
        health: 250,
        defense: 125
    },
    {
        type: "Helmet",
        abilities: [new ItemAbility(
            {
                name: "Intellect",
                internalId: "ultimate_helmet_iq",
            },
            {
                activationType: "Passive",
                abilityDescription: "Multiples your IQ."
            }
        )]
    }
);

b = new StatItem(
    {
        name: "Ultimate Chestplate",
        internalId: "ultimate_chestplate",
    }, 
    {
        isCustomTexture: false,
        rarity: "Legendary",
        minecraftId: "leather_chestplate",
        description: "Most powerful chestplate to exist.",
        additional_components: [{'component': 'minecraft:dyed_color', 'value': {'rgb': 8999544, 'show_in_tooltip':false}}]
    },
    {
        strength: 200,
        critical: 100,
        health: 400,
        defense: 200
    },
    {
        type: "Chestplate",
        abilities: [new ItemAbility(
            {
                name: "Untouchable",
                internalId: "ultimate_chestplate_protection",
            },
            {
                activationType: "Passive",
                abilityDescription: "Multiplies your defense."
            }
        )]
    }
);

c = new StatItem(
    {
        name: "Ultimate Leggings",
        internalId: "ultimate_leggings",
    }, 
    {
        isCustomTexture: false,
        rarity: "Legendary",
        minecraftId: "leather_leggings",
        description: "Most powerful leggings to exist.",
        additional_components: [{'component': 'minecraft:dyed_color', 'value': {'rgb': 8999544, 'show_in_tooltip':false}}]
    },
    {
        strength: 175,
        critical: 120,
        health: 325,
        defense: 185
    },
    {
        type: "Leggings",
        abilities: [new ItemAbility(
            {
                name: "Flying",
                internalId: "ultimate_leggings_jump",
            },
            {
                activationType: "Sneak Double",
                abilityDescription: "Sends you high in the air."
            }
        )]
    }
);


d = new StatItem(
    {
        name: "Ultimate Boots",
        internalId: "ultimate_boots",
    }, 
    {
        isCustomTexture: false,
        rarity: "Legendary",
        minecraftId: "leather_boots",
        description: "Most powerful boots to exist.",
        additional_components: [{'component': 'minecraft:dyed_color', 'value': {'rgb': 8999544, 'show_in_tooltip':false}}]
    },
    {
        strength: 100,
        critical: 50,
        health: 200,
        defense: 115
    },
    {
        type: "Boots",
        abilities: [new ItemAbility(
            {
                name: "Slam",
                internalId: "ultimate_boots_slam",
            },
            {
                activationType: "Sneak Double",
                abilityDescription: "Creates a massive explosion.",
                manaCost: 20
            }
        )]
    }
);


allItems = [];
allItems.push(a, b, c, d);