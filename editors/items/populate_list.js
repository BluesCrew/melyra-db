a = new BaseItem(
    {
        name: "Super Beef",
        internalId: "melyra:super_beef",
    }, 
    {
        isCustomTexture: false,
        rarityColor: RARITY_UNCOMMON,
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
        rarityColor: RARITY_EPIC,
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
        rarityColor: RARITY_LEGENDARY,
        minecraftId: "silence_armor_trim_smithing_template"
    }
);

all_items = [];
all_items.push(a, b, c, c, a, b, a, c, a, b, a, c, a, c, b, c, b);

function populate_list(item) {
    let parent = document.getElementById("list-parent");

    let newElem = document.createElement("a");
    newElem.classList.add("melyra-element");

    let newName = document.createElement("p");
    newName.textContent = item.name;
    newName.style.color = item.rarityColor.color;
    
    let img = document.createElement("img");
    img.src = item.sprite;
    img.style.imageRendering = "pixelated";
    
    newElem.appendChild(newName);
    newElem.appendChild(img);

    parent.appendChild(newElem);
}

all_items.forEach(element => {
    populate_list(element);
});