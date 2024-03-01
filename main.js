class MelyraElement {
    name;
    internalId;
    versionNumber = 1;
    constructor({_name = undefined, _internalId = undefined, _versionNumber = 1})
    {
        this.internalId = _internalId;
        this.name = _name;
        this.versionNumber = _versionNumber;
    }
}

class BaseItem extends MelyraElement {
    sprite;
    description;
    rarityColor;
    model;

    constructor(baseArgs, {isCustomTexture = false, minecraftId = undefined, description=undefined, rarity = null, model = null}, isCustomTexture)
    {
        super(baseArgs);

        // Get sprite from system
        if (!isCustomTexture) 
        {
            sprite = "https://minecraftitemids.com/item/64/" + minecraftId + ".png";
        }
    }
}

RARITY_COMMON = {
    display: "Common",
    color: "#FFFFFF"
}
RARITY_UNCOMMON = {
    display: "Uncommon",
    color: "#55FF55"
}
RARITY_RARE = {
    display: "Rare",
    color: "#5555FF"
}