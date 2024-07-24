// Dropdown Color Changes
document.getElementById("optionCommon").style.color = getColorCodeHex(getRarityObject("Common").color);
document.getElementById("optionUncommon").style.color = getColorCodeHex(getRarityObject("Uncommon").color);
document.getElementById("optionRare").style.color = getColorCodeHex(getRarityObject("Rare").color);
document.getElementById("optionEpic").style.color = getColorCodeHex(getRarityObject("Epic").color);
document.getElementById("optionLegendary").style.color = getColorCodeHex(getRarityObject("Legendary").color);

// input box creation
function createInputBox(label, element_type, input_type) {
    let box = document.createElement("div");
    box.classList.add("inputbox");

    let lab = document.createElement("div");
    lab.innerHTML = label;

    let elem = document.createElement(element_type);
    if (element_type == "input") {
        elem.type = input_type;
    }
    elem.classList.add("data-input");

    box.appendChild(lab);
    box.appendChild(elem);

    return box;
}

// create stat inputs
const statDataPart = document.getElementById("statItemData");

function createStatInput(data) {
    let inputBox = createInputBox('<span style="color: '+getColorCodeHex(data.symbolColor)+'">'+data.symbol+' '+'</span>'+data.name+":", "input", "number")
    inputBox.children.item(0).classList.add("stat-label");

    let firstInput = inputBox.children.item(1);
    firstInput.id = data.id;
    firstInput.classList.add("stat-input", "range-first-input");
    firstInput.type = "number";

    let secondInput = document.createElement("input");
    secondInput.id = data.id;
    secondInput.classList.add("data-input", "stat-input", "range-second-input", "hidden");
    firstInput.type = "number";
    inputBox.appendChild(secondInput);

    let button = document.createElement("button");
    button.id = data.id;
    button.classList.add("toggle-range-button");
    button.textContent = "Toggle Range";
    inputBox.appendChild(button);

    document.getElementById("statData").appendChild(inputBox);
}

for (let data of statData) {
    createStatInput(data);
}

// Range Toggles
let rangeButtons = document.getElementsByClassName("toggle-range-button");
for(let rangeButton of rangeButtons) {
    let rangeSecondInput = document.querySelector(".range-second-input#"+rangeButton.id);
    rangeButton.addEventListener("click", () => {
        rangeSecondInput.classList.toggle("hidden");
    });
}

// Abilities
const abilityBox = document.getElementById("abilitiesData");
let currentAbilityCount = 0;
let abilityBlocks = [];

document.getElementById("addAbility").addEventListener("click", function() {
    addAbilitySlot();
});

function addAbilitySlot() {
    currentAbilityCount++;

    let abilityBlock = document.createElement("div");
    abilityBlock.classList.add("ability-data");
    abilityBlock.id = "ability"+currentAbilityCount;
    abilityBlock.style.borderColor = getColorCodeHex(getRarityObject(EDITED_ITEM.rarity).color);

    let label = document.createElement("div");
    label.style.textDecoration = "underline";
    label.textContent = "ABILITY";

    let abilityName = createInputBox("Ability Name:", "input", "text");
    abilityName.classList.add("ability-input");
    abilityName.children.item(1).id = "abilityName";
    abilityName.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });

    let abilityId = createInputBox("Ability ID:", "input", "text");
    abilityId.classList.add("ability-input");
    abilityId.children.item(1).id = "abilityId";
    abilityId.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });

    let abilityActivation = createInputBox("Activation Type:", "select", "");
    abilityActivation.classList.add("ability-input");
    let select = abilityActivation.children.item(1);
    select.id = "abilityActivation";
    select.addEventListener("change", function(event) {
        updateItem();
    });
    select.innerHTML = "";
    for (let option of Activations) {
        let elem = document.createElement("option");
        elem.value = option.name;
        elem.textContent = option.name;
        select.appendChild(elem);
    }

    let abilityDesc = createInputBox("Description:", "input", "text");
    abilityDesc.classList.add("ability-input");
    abilityDesc.children.item(1).id = "abilityDescription";
    abilityDesc.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });
    
    let abilityCost = createInputBox("Mana Cost:", "input", "number");
    abilityCost.classList.add("ability-input");
    abilityCost.children.item(1).id = "abilityManaCost";
    abilityCost.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });

    let removeAbilityButton = document.createElement("button");
    removeAbilityButton.textContent = "-";
    removeAbilityButton.classList.add("ability-count-change");
    removeAbilityButton.id = "removeAbility"+currentAbilityCount;
    removeAbilityButton.addEventListener("click", function() {
        abilityBox.removeChild(abilityBlock);
        abilityBlocks.splice(abilityBlocks.indexOf(abilityBlock), 1);
        updateItem();
    });

    abilityBlock.append(label, abilityName, abilityId, abilityActivation, abilityDesc, abilityCost, removeAbilityButton);
    abilityBox.appendChild(abilityBlock);

    abilityBlocks.push(abilityBlock);

    return abilityBlock;
}

// Upgrades Material Costs
const materialChooseBox = document.getElementById("materialChoosingBox");
materialChooseBox.style.display = "none";

const costsBox = document.getElementById("costsBox");
costsBox.style.display = "none";

const closeImporter = document.getElementById("closeImport");
closeImporter.addEventListener("click", function(event) {
    materialChooseBox.style.display = "none";
});
const materialChoicesParent = document.getElementById("materialOptions");

let editingMaterialCostIndex = -1;

function appendToMaterialImporter(materialItem) {
    parentButton = document.createElement("button");
    parentButton.classList.add("material-import-option");
    parentButton.id = materialItem.name+"-chooser";
    parentButton.addEventListener("click", function(event) {
        materialChooseBox.style.display = "none";
        costsBox.children.item(editingMaterialCostIndex).children.item(1).children.item(1).value = materialItem.internalId;
    });
    
    image = document.createElement("img");
    image.src = materialItem.sprite;
    image.title = materialItem.name;
    image.classList.add("material-import-image");

    parentButton.append(image);

    materialChoicesParent.appendChild(parentButton)
}

function generateCostBox(levelTo) {
    parentBox = document.createElement("div");
    parentBox.classList.add("cost-box");
    parentBox.id = "lvl"+levelTo;

    label = document.createElement("p");
    label.classList.add("label");
    label.style.width = "80px";
    label.style.fontSize = "15px";
    label.innerText = "Level "+(levelTo-1)+" → "+levelTo;

    materialId = createInputBox("Material ID", "input", "text");
    materialId.children.item(1).id = levelTo+"_materialCostId";
    materialId.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });
    materialId.children.item(1).style.fontSize = "12px";

    import_button = document.createElement("button");
    image = document.createElement("img");
    image.src = "/melyra-db/assets/file_icon.png";
    import_button.append(image);
    import_button.classList.add("material-import");
    import_button.addEventListener("click", function(event) {
        materialChooseBox.style.display = "block";
        editingMaterialCostIndex = levelTo-1;
    })
    materialId.append(import_button);

    materialAmount = createInputBox("Amount", "input", "number");
    materialAmount.children.item(1).id = levelTo+"_materialCostAmount";
    materialAmount.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });
    materialAmount.children.item(1).style.fontSize = "12px";

    parentBox.append(label, materialId, materialAmount);

    costsBox.appendChild(parentBox);
}

for (let lvl = 1; lvl <= 9; lvl++) {
    generateCostBox(lvl);
}

for (let item of allItems) {
    if (item.type === "Material") {
        appendToMaterialImporter(item);
    }
}

// Default Values
const internalId = document.getElementById("internalId"); 
const versionId = document.getElementById("versionId"); 
const minecraftId = document.getElementById("minecraftId"); 
const name = document.getElementById("itemName"); 
const rarity = document.getElementById("raritySelect"); 
const type = document.getElementById("typeSelect");
const description = document.getElementById("description");


const upgradable = document.getElementById("upgradable");

function getStatInput(statId) {
    let statInputFirst = document.querySelector(".range-first-input#"+statId);
    let statInputSecond = document.querySelector(".range-second-input#"+statId);

    if (statInputSecond.classList.contains("hidden")) {
        if (statInputFirst.value === ""){
            return undefined;
        }
        else {
            return parseInt(statInputFirst.value);
        }
    } else {
        if (statInputFirst.value === ""){
            return undefined;
        } else if (statInputSecond.value === "") {
            return parseInt(statInputFirst.value);
        }
        else {
            let arr = [parseInt(statInputFirst.value), parseInt(statInputSecond.value)];
            if (arr[1] < arr[0]) {
                arr.reverse();
            }
            return arr;
        }
    }
}

rarity.onchange = (event) => {
    updateColors(getColorCodeHex(getRarityObject(event.target.value).color));
};

function updateColors(colorHex) {
    rarity.style.color = colorHex;

    for(let block of abilityBlocks){
        block.style.borderColor = rarity.style.color;
    }

    let labels = document.getElementsByClassName("group-label");
    for(let label of labels) {
        label.style.color = rarity.style.color;
    }

    let inputBoxes = document.getElementsByClassName("inputbox");
    for(let box of inputBoxes) {
        box.style.borderColor = hexToRgbA(colorHex, 0.25);
    }

    document.getElementById("costsBox").style.borderColor = rarity.style.color;

    let costBoxes = document.getElementsByClassName("cost-box");
    for(let costBox of costBoxes) {
        costBox.style.borderColor = hexToRgbA(colorHex, 0.25);
    }
}

internalId.value = "new_item";
versionId.value = 1;
minecraftId.value = "minecraft:coal";
itemName.value = "New Item";
type.value = "Material";
upgradable.checked = false;



// Store edited item
let EDITED_ITEM;
updateItem();

// Detect any changes
let allInputs = document.getElementsByClassName("data-input");
for (let input of allInputs) {
    input.addEventListener("change", function(event) {
        updateItem();
    })
}

let allButtons = document.querySelectorAll("button");
for (let button of allButtons) {
    button.addEventListener("click", function(event) {
        updateItem();
    })
}

function importItem(item) {
    internalId.value = item.internalId;
    versionId.value = item.versionNumber;
    minecraftId.value = item.minecraftId;
    itemName.value = item.name;

    rarity.value = item.rarity;
    rarity.style.color = getColorCodeHex(getRarityObject(item.rarity).color);

    type.value = item.type;

    if (item.description === undefined){
        description.value = "";
    } else {
        description.value = item.description;
    }


    if (item.type != "Material") {
        upgradable.checked = item.upgradable;

        for(let data of statData) {
            let statValue = item.stats[data.id];

            if (statValue === undefined) {
                continue;
            }

            if (Array.isArray(statValue)) {
                document.querySelector(".toggle-range-button#"+data.id).click();
                document.querySelector(".range-first-input#"+data.id).value = statValue[0];
                document.querySelector(".range-second-input#"+data.id).value = statValue[1];
            } else {
                document.querySelector(".range-first-input#"+data.id).value = statValue;
            }
        }

        currentAbilityCount = 0;
        for (let abil of item.abilities) {
            var block = addAbilitySlot();
            block.children.item(1).children.item(1).value = abil.name;
            block.children.item(2).children.item(1).value = abil.internalId;
            block.children.item(3).children.item(1).value = abil.activationType;
            block.children.item(4).children.item(1).value = abil.abilityDescription;
            block.children.item(5).children.item(1).value = abil.manaCost;
        }
    }

    updateItem();

    updateColors(getColorCodeHex(getRarityObject(item.rarity).color));

    setTimeout(function() {updatePreview(EDITED_ITEM)}, 10);
}

function updateItem() {
    if (type.value === "Material")
    {
        statDataPart.style.display = "none";

        EDITED_ITEM = new BaseItem(
            {
                name: itemName.value,
                internalId: internalId.value,
                versionNumber: versionId.value
            },
            {
                description: description.value,
                rarity: rarity.value,
                minecraftId: minecraftId.value
            }
        );
    }
    else 
    {
        statDataPart.style.display = "";

        let abilities = [];
        for (let abilityBlock of abilityBlocks) 
        {
            children = abilityBlock.children;

            ability = new ItemAbility(
                {
                    name: children[1].children[1].value,
                    internalId: children[2].children[1].value
                },
                {
                    activationType: children[3].children[1].value,
                    abilityDescription: children[4].children[1].value,
                    manaCost: children[5].children[1].value
                }
            );

            abilities.push(ability);
        }

        costsBox.style.display = "none";
        if (upgradable.checked) {
            costsBox.style.display = "";
        }

        EDITED_ITEM = new StatItem(
            {
                name: itemName.value,
                internalId: internalId.value,
                versionNumber: versionId.value
            },
            {
                description: description.value,
                rarity: rarity.value,
                minecraftId: minecraftId.value
            },
            {
                health: getStatInput("health"),
                defense: getStatInput("defense"),
                magicDefense: getStatInput("magicDefense"),
                healthRegeneration: getStatInput("healthRegeneration"),
                manaRegeneration: getStatInput("manaRegeneration"),
                damage: getStatInput("damage"),
                strength: getStatInput("strength"),
                critical: getStatInput("critical"),
                drawSpeed: getStatInput("drawSpeed"),
                overdraw: getStatInput("overdraw"),
                attackSpeed: getStatInput("attackSpeed"),
                mana: getStatInput("mana"),
                magicDamage: getStatInput("magicDamage"),
                speed: getStatInput("speed"),
                arcane: getStatInput("arcane"),
                miningSpeed: getStatInput("miningSpeed"),
                woodcuttingSpeed: getStatInput("woodcuttingSpeed"),
                // fishingSpeed: getStatInput("fishingSpeed")
            },
            {
                type: type.value,
                upgradable: upgradable.checked,
                abilities: abilities
            }
        );
    }

    // update ability activation selects
    updateActivationSelects();

    // finally, update preview
    updatePreview(EDITED_ITEM);
}

function updateActivationSelects() {
    const abilitySelects = document.getElementsByClassName("ability-activation-select");


}