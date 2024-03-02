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
    minecraftId;
    type;

    constructor(baseArgs, {isCustomTexture = false, minecraftId = undefined, description=undefined, rarity = null, model = null})
    {
        super(baseArgs);
        
        this.description = description;
        this.rarity = rarity;
        this.model = model;
        this.minecraftId = minecraftId;
        this.type = "Material";

        // Get sprite from system
        if (!isCustomTexture) 
        {
            minecraftId = minecraftId.replace("minecraft:", "");
            this.sprite = "/melyra-db/assets/item/" + minecraftId + ".png";
        }
    }

    get_type_line() {
        return {text:"["+this.type+" | "+this.rarity.name+"]",color:"#EDEDED"}
    }

    decomposeDescription() {
        if (this.description === undefined) {return []};
        return this.description.split("\\n");
    }

    get_lore() {
        let lines = [];
        lines.push(this.get_type_line());

        let descLines = this.decomposeDescription();
        if (descLines) { 
            lines.push({text:" "}); 
            for (let descLine of descLines) { 
                lines.push({text: descLine, color:"dark_gray"}); 
            }
        }
        
        return lines;
    }
}

class StatItem extends BaseItem {
    stats = {
        health,
        defense,
        magicDefense,
        healthRegeneration,
        manaRegeneration,
        damage,
        strength,
        critical,
        drawSpeed,
        overdraw,
        attackSpeed,
        mana,
        magicDamage,
        speed,
        arcane,
        miningSpeed,
        woodcuttingSpeed,
        fishingSpeed
    }
}