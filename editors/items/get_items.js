a = new BaseItem(
    {
        name: "Super Beef",
        internalId: "melyra:super_beef",
    }, 
    {
        isCustomTexture: false,
        rarity: getRarityObject("Common"),
        minecraftId: "cooked_beef"
    }
);

b = new BaseItem(
    {
        name: "Hyper Boat",
        internalId: "melyra:hyper_boat",
    }, 
    {
        isCustomTexture: false,
        rarity: getRarityObject("Epic"),
        minecraftId: "birch_boat"
    }
);

c = new BaseItem(
    {
        name: "Ender Fragment",
        internalId: "melyra:hyper_boat",
    }, 
    {
        isCustomTexture: false,
        rarity: getRarityObject("Legendary"),
        minecraftId: "silence_armor_trim_smithing_template"
    }
);

all_items = [];
all_items.push(a, b, c);