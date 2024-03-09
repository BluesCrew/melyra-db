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
        description: "Test1\\nTest2\\nTest3"
    },
    {
        strength: 25,
        critical: 18
    },
    {
        type: "Melee",
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