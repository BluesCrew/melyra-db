a = new BaseItem(
    {
        name: "Super Beef",
        internalId: "super_beef",
    }, 
    {
        isCustomTexture: false,
        rarity: getRarityObject("Common"),
        minecraftId: "cooked_beef",
    }
);

b = new BaseItem(
    {
        name: "Hyper Boat",
        internalId: "hyper_boat",
    }, 
    {
        isCustomTexture: false,
        rarity: getRarityObject("Epic"),
        minecraftId: "birch_boat",
        description: "Test1\\nTest2\\nTest3"
    }
);

c = new BaseItem(
    {
        name: "Ender Fragment",
        internalId: "ender_fragment",
    }, 
    {
        isCustomTexture: false,
        rarity: getRarityObject("Legendary"),
        minecraftId: "silence_armor_trim_smithing_template",
        type: "Material"
    }
);

allItems = [];
allItems.push(a, b, c);