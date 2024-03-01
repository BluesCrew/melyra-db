class MelyraElement {
    name;
    internalId;
    versionNumber = 1;
    constructor({name = undefined, internalId = undefined, versionNumber = 1})
    {
        this.internalId = internalId;
        this.name = name;
        this.versionNumber = versionNumber;
    }
}

class BaseItem extends MelyraElement {
    description;
    rarityColor;
    model;
    sprite;

    constructor(baseArgs, {isCustomTexture = false, minecraftId = undefined, description=undefined, rarityColor = null, model = null})
    {
        super(baseArgs);

        this.description = description;
        this.rarityColor = rarityColor;
        this.model = model;

        // Get sprite from system
        if (!isCustomTexture) 
        {
            this.sprite = "/melyra-db/assets/item/" + minecraftId + ".png";
        }
    }
}

const RARITY_COMMON = {
    display: "Common",
    color: "#FFFFFF"
}
const RARITY_UNCOMMON = {
    display: "Uncommon",
    color: "#55FF55"
}
const RARITY_RARE = {
    display: "Rare",
    color: "#5555FF"
}
const RARITY_EPIC = {
    display: "Epic",
    color: "#FF55FF"
}
const RARITY_LEGENDARY = {
    display: "Legendary",
    color: "#55FFFF"
}