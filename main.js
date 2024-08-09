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
    identifiedName;
    additional_components;

    constructor(baseArgs, {isCustomTexture = false, minecraftId = undefined, description=undefined, rarity = null, model = null, identifiedName = null, additional_components = null})
    {
        super(baseArgs);
        
        this.description = description;
        this.rarity = rarity;
        this.model = model;
        this.minecraftId = minecraftId;
        this.type = "Material";
        this.identifiedName = identifiedName;
        this.additional_components = additional_components;

        // Get sprite from system
        if (!isCustomTexture) 
        {
            minecraftId = minecraftId.replace("minecraft:", "");
            this.sprite = "/melyra-db/assets/item/" + minecraftId + ".png";
        }
    }

    get_type_line() {
        return {text:"["+ (this.type === "Material" ? "" : this.type +" | ") + this.rarity+"]",color:"#EDEDED"}
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
    abilities = [];
    upgrade_cost = [];
    enchant_slots = 0;

    constructor(baseArgs, baseArgs2, statArgs, {type = "Melee", upgradable = true, abilities = null, enchant_slots = -1}) {
        super(baseArgs, baseArgs2);

        super.type = type;
        this.upgradable = upgradable;
        this.abilities = abilities;
        this.enchant_slots = enchant_slots;
        if (enchant_slots === -1) {
            this.enchant_slots = getRarityObject(this.rarity).enchantSlots;
        }

        Object.assign(this.stats, statArgs);
    }

    get_lore() {
        let lines = super.get_lore();

        if (this.upgradable) {
            lines = insertAt(lines, 1, {text:"Level +0",color:"white"});
        }
        
        lines.push({text:" "})
        
        let hasStat = false;
        const hasAbility = Array.isArray(this.abilities) && this.abilities.length > 0;

        let currentGroup = 0;
        let count = 0;
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
                    if (itemValue > 0) itemValue = "+" + itemValue[0] + "% - +" + itemValue[1] + "%";
                    else itemValue = itemValue[0] + "% - " + itemValue[1] + "%";
                }
                else {
                    itemValue = itemValue[0] + " - " + itemValue[1];
                }   
            } else if (data.isPercentage){
                if (itemValue > 0) itemValue = "+" + itemValue + "%";
                else itemValue = itemValue + "%";
            }
            
            lines.push([{text:data.symbol,color:data.symbolColor},{text:" " + data.name + " ",color:"gray"},{text:itemValue,color:"white"}]);
        }

        if (hasStat || hasAbility) {lines.push({text:" "});}

        const rarityObject = getRarityObject(this.rarity);

        // abilities
        if (hasAbility)
        {
            for (let ability of this.abilities) 
            {
                const displayName = (ability.name === undefined || ability.name === "") ? "N/A" : ability.name;


                const activation = (ability.activationType === undefined || ability.activationType === null) ? "N/A" : Activations.find(ac => ac.name === ability.activationType).display;

                const description = (ability.abilityDescription === undefined || ability.abilityDescription === null) ? ["N/A"] : ability.abilityDescription.split("\\n");

                const mana = (ability.manaCost === undefined) ? 0 : ability.manaCost;

                lines.push([{text:displayName,color:rarityObject.color},{text:" [",color:"yellow"},{text:activation,color:"gold"},{text:"]",color:"yellow"}]);
                for (let abilDescLine of description) {
                    lines.push([{text:" "},{text:abilDescLine,color:"gray"}]);
                }

                if (mana > 0) {
                    let manaSymbol = statData.find(data => data.id == "mana").symbol;
                    let manaObject = mana === 0 ? {text:"NONE",color:"gold"} : {text:mana,"color":"white"};
                    lines.push([{text:" "},{text:manaSymbol+" Mana: ",color:"aqua"},manaObject]);
                }
                lines.push({text:" "});
            }
        }


        if (this.enchant_slots <= 0) {
            return lines;
        } 

        // enchants
        lines.push([{text:"||",color:rarityObject.color,obfuscated:true},{text:" Enchantments",color:rarityObject.color}])

        let enchantSlotsLine = [{text:"||",color:rarityObject.color,obfuscated:true}]
        let slotCount = this.enchant_slots;

        for (let i = 0; i < slotCount; i++) {
            enchantSlotsLine.push({text:' [',color:"gray"});
            enchantSlotsLine.push({text:'❌',color:"white"});
            enchantSlotsLine.push({text:']',color:"gray"});
        }

        lines.push(enchantSlotsLine);

        return lines;
    }
}

class ItemAbility extends MelyraElement {
    abilityId;
    activationType;
    abilityDescription;
    manaCost;

    constructor(baseArgs, {abilityId = 0, activationType = null, abilityDescription = undefined, manaCost = 0}) {
        super(baseArgs);

        this.abilityId = abilityId;
        this.activationType = activationType;
        this.abilityDescription = abilityDescription;
        this.manaCost = manaCost;
    }
}

class Mob extends MelyraElement {
    nameColor;
    minecraftId;
    level;
    stats = {
        health: undefined,
        damage: undefined,
        defense: undefined,
        magicDamage: undefined,
        magicDefense: undefined,
        speed: undefined,
        knockbackResistance: undefined
    };
    deathLootTable;
    abilities;
    isCustomAggressive;
    tags;
    otherNBT;
    textureVariant;

    constructor(baseArgs, statArgs, {nameColor="red", minecraftId="zombie", level=1, deathLootTable=null, abilities=null, isCustomAggressive=false, tags=null, otherNBT=null, textureVariant=null}) {
        super(baseArgs);

        Object.assign(this.stats, statArgs);

        this.nameColor = nameColor;
        this.minecraftId = minecraftId;
        this.level = level;
        this.deathLootTable = deathLootTable;
        this.abilities = abilities;
        this.isCustomAggressive = isCustomAggressive;
        this.tags = tags;
        this.otherNBT = otherNBT;
        this.textureVariant = textureVariant;
    }
}