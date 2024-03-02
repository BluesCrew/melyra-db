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
    rarity;
    model;
    sprite;

    constructor(baseArgs, {isCustomTexture = false, minecraftId = undefined, description=undefined, rarity = null, model = null})
    {
        super(baseArgs);
        
        this.description = description;
        this.rarity = getRarityObject(rarity);
        this.model = model;

        // Get sprite from system
        if (!isCustomTexture) 
        {
            this.sprite = "/melyra-db/assets/item/" + minecraftId + ".png";
        }
    }
}