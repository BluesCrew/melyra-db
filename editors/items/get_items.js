var WhenLoaded = [];

a = new StatItem(
    {
        name: "Super Beef",
        internalId: "super_beef",
    }, 
    {
        isCustomTexture: false,
        rarity: "Uncommon",
        minecraftId: "cooked_beef",
        description: "Be careful when throwing it at a vegan."
    },
    {
        strength: 5,
        critical: 15,
        health: 4,
        defense: 1,
        manaRegeneration: 1,
        healthRegeneration: 4,
        arcane: 4,
        speed: 4,
        woodcuttingSpeed: 8,
        miningSpeed: 7
    },
    {
        type: "Ranged",
        abilities: [new ItemAbility(
            {
                name: "Throwing",
                internalId: "beef",
            },
            {
                activationType: "Right-click",
                abilityDescription: "Throws the beef for\\nmassive damage.",
                manaCost: 20
            }
        )]
    }
);

b = new StatItem(
    {
        name: "Hyper Boat",
        internalId: "hyper_boat",
    }, 
    {
        isCustomTexture: false,
        rarity: "Epic",
        minecraftId: "birch_boat",
        description: "Most powerful boat to exist.\\n \\nIt was made to be able to travel to the most\\ndangerous islands."
    },
    {
        strength: 25,
        critical: 18
    },
    {
        type: "Melee",
        abilities: [new ItemAbility(
            {
                name: "Navigation",
                internalId: "boat_ability",
            },
            {
                activationType: "Sneak Double",
                abilityDescription: "Use near an ocean to navigate\\nto a magical island.",
                manaCost: 0
            }
        )]
    }
);

c = new BaseItem(
    {
        name: "Ender Fragment",
        internalId: "ender_fragment",
    }, 
    {
        isCustomTexture: false,
        rarity: "Legendary",
        minecraftId: "silence_armor_trim_smithing_template",
        type: "Material"
    }
);

allItems = [];
allItems.push(a, b, c);