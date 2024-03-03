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
        if (this.description === undefined || this.description === null || this.description === "") {return undefined};
        return this.description.split("\\n");
    }

    get_lore() {
        let lines = [];
        lines.push(this.get_type_line());

        let descLines = this.decomposeDescription();

        if (descLines !== undefined) { 
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
        health: undefined,
        defense: undefined,
        magicDefense: undefined,
        healthRegeneration: undefined,
        manaRegeneration: undefined,
        damage: undefined,
        strength: undefined,
        critical: undefined,
        drawSpeed: undefined,
        overdraw: undefined,
        attackSpeed: undefined,
        mana: undefined,
        magicDamage: undefined,
        speed: undefined,
        arcane: undefined,
        miningSpeed: undefined,
        woodcuttingSpeed: undefined,
        // fishingSpeed: undefined
    }
    upgradable = true;

    constructor(baseArgs, baseArgs2, statArgs, {type = "Melee", upgradable = true}) {
        super(baseArgs, baseArgs2);

        super.type = type;
        this.upgradable = upgradable;

        Object.assign(this.stats, statArgs);
    }

    get_lore() {
        let lines = super.get_lore();

        if (this.upgradable) {
            lines = insertAt(lines, 1, {text:"Level +0",color:"white"});
        }

        lines.push({text:" "})
        
        let currentGroup = 0;
        let count = 0;
        let hasStat = false;
        for (let data of statData) {
            let itemValue = this.stats[data.id];

            if (itemValue === undefined) {continue;}

            hasStat = true;

            if (count === 0) {
                currentGroup = data.group;
            }
            count++;

            if (currentGroup !== data.group) {
                lines.push({text:" "});
            }
            currentGroup = data.group;


            if (Array.isArray(itemValue)) {
                if (data.isPercentage){
                    itemValue = "+" + itemValue[0] + "% - +" + itemValue[1] + "%";
                }
                else {
                    itemValue = itemValue[0] + " - " + itemValue[1];
                }   
            } else if (data.isPercentage){
                itemValue = "+" + itemValue + "%";
            }
            
            lines.push([{text:data.symbol,color:data.symbolColor},{text:" " + data.name + " ",color:"gray"},{text:itemValue,color:"white"}]);
        }

        if (hasStat) {lines.push({text:" "});}

        // enchants
        lines.push([{text:"||",color:this.rarity.color,obfuscated:true},{text:" Enchantments",color:this.rarity.color}])

        let enchantSlotsLine = [{text:"||",color:this.rarity.color,obfuscated:true}]
        let slotCount = enchantSlotCounts[this.rarity.name];
        for (let i = 0; i < slotCount; i++) {
            enchantSlotsLine.push({text:' [',color:"gray"});
            enchantSlotsLine.push({text:'❌',color:"white"});
            enchantSlotsLine.push({text:']',color:"gray"});
        }

        lines.push(enchantSlotsLine);

        return lines;
    }
}