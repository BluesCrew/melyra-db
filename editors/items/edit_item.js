// Dropdown Color Changes
document.getElementById("optionCommon").style.color = getColorCodeHex(getRarityObject("Common").color);
document.getElementById("optionUncommon").style.color = getColorCodeHex(getRarityObject("Uncommon").color);
document.getElementById("optionRare").style.color = getColorCodeHex(getRarityObject("Rare").color);
document.getElementById("optionEpic").style.color = getColorCodeHex(getRarityObject("Epic").color);
document.getElementById("optionLegendary").style.color = getColorCodeHex(getRarityObject("Legendary").color);

// preview
const prevCanvas = document.getElementById("previewCanvas");
const prevTooltip = document.getElementById("previewTooltip");

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

// identified name toggle
const identifiedNameToggle = document.getElementById("identifiedNameToggle")
const identifiedNameInput = document.getElementById("identifiedNameInput")
identifiedNameInput.classList.toggle("hide");
let identifiedNameToggled = false;

identifiedNameToggle.addEventListener("click", function(event) {
    identifiedNameInput.classList.toggle("hide");
    identifiedNameToggle.classList.toggle("button-toggled");
    identifiedNameToggled = !identifiedNameToggled;
    updateItem();
})

// create stat inputs
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
    removeAbilityButton.classList.add("ability-count-change", "changing-button");
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

let material_id_input_boxes = []

const closeImporter = document.getElementById("closeImport");
closeImporter.addEventListener("click", function(event) {
    materialChooseBox.style.display = "none";
});
const materialChoicesParent = document.getElementById("materialOptions");

let materialInputImporting;
let material_level_costs = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let currentInputIndex = 0;

let allMaterialInputs = []

function appendToMaterialImporter(materialItem) {
    parentButton = document.createElement("button");
    parentButton.classList.add("material-import-option");
    parentButton.id = materialItem.name+"-chooser";
    parentButton.addEventListener("click", function(event) {
        materialChooseBox.style.display = "none";
        materialInputImporting.children.item(0).children.item(1).value = materialItem.internalId;
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
    parentBox.classList.add("level-box");
    parentBox.id = "lvl"+levelTo;

    label = document.createElement("p");
    label.classList.add("label");
    label.style.width = "80px";
    label.style.fontSize = "15px";
    label.innerText = "Level "+(levelTo-1)+" → "+levelTo;

    add_button = document.createElement("button");
    add_button.classList.add("add-material", "changing-button");
    add_button.textContent = "+";
    add_button.style.width = "32px";
    add_button.style.height = "32px";
    add_button.addEventListener("click", function(event) {
        generateMaterialInputPart(levelTo);
        updateColors(getColorCodeHex(getRarityObject(EDITED_ITEM.rarity).color));
    });

    input_holder = document.createElement("div");
    input_holder.classList.add("material-input-holder");

    parentBox.append(label, add_button, input_holder);

    material_level_costs[levelTo-1] = input_holder;
    generateMaterialInputPart(levelTo);

    costsBox.appendChild(parentBox);
}

function generateMaterialInputPart(levelIndex) {
    let parent = document.createElement("div");
    parent.classList.add("cost-box");
    parent.id = levelIndex;

    let materialId = createInputBox("Material ID", "input", "text");
    materialId.children.item(1).id = levelIndex+"_materialCostId";
    materialId.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });
    materialId.children.item(1).style.fontSize = "12px";

    let import_button = document.createElement("button");
    image = document.createElement("img");
    image.src = "/melyra-db/assets/file_icon.png";
    import_button.append(image);
    import_button.classList.add("material-import");
    import_button.addEventListener("click", function(event) {
        materialChooseBox.style.display = "block";
        materialInputImporting = parent;
    })
    materialId.append(import_button);

    let materialAmount = createInputBox("Amount", "input", "number");
    materialAmount.children.item(1).id = levelIndex+"_materialCostAmount";
    materialAmount.children.item(1).addEventListener("change", function(event) {
        updateItem();
    });
    materialAmount.children.item(1).style.fontSize = "12px";

    let remove_button = document.createElement("button");
    remove_button.textContent = "-";
    remove_button.style.width = "32px";
    remove_button.style.height = "32px";
    remove_button.classList.add("remove-material", "changing-button");
    remove_button.addEventListener("click", function(event) {
        if (allMaterialInputs.length <= 9)
            return;

        material_level_costs[levelIndex-1].removeChild(parent);
        allMaterialInputs.splice(allMaterialInputs.indexOf(parent), 1);
    })

    parent.append(materialId, import_button, materialAmount, remove_button);
    material_level_costs[levelIndex-1].appendChild(parent);

    allMaterialInputs.push(parent);
}

for (let lvl = 1; lvl <= 9; lvl++) {
    generateCostBox(lvl);
}

for (const item of allItems) {
    if (item.type === "Material") {
        appendToMaterialImporter(item);
    }
}


// components
const additionalComponentsParent = document.getElementById("additionalComponents");
function appendComponents(component, parent){
    let component_id = component["component"];
    let component_name = toTitleCase(component_id.replace("minecraft:", "").replace(/_/g, " "));
    let type = component["type"]
    let input = createInputBox(component_name, "input", type === "bool" ? "checkbox" : type === "string" ? "text" : "error");
    input.id = component_id;
    input.children.item(1).placeholder = component.input_placeholder;
    parent.appendChild(input);
}

for (const component of itemComponents) {
    appendComponents(component, additionalComponentsParent)
}

// Enchantments
{
    const enchantmentsParent = document.createElement('div');

    enchantmentsParent.classList.add("enchantment-data");

    let label = document.createElement("div");
    label.style.textDecoration = "underline";
    label.textContent = "Enchantments";
    enchantmentsParent.appendChild(label);

    let components = [
        {"component": "minecraft:show_all", "type": "bool"},
        {"component": "minecraft:show_in_tooltip", "type": "bool"},
        {"component": "minecraft:enchantment_glint_override", "type": "bool"},
    ]
    for (const component of components) {
        appendComponents(component, enchantmentsParent)
    }

    //list
    let list = document.createElement("ul");
    list.classList.add("enchantment-list");
    enchantmentsParent.appendChild(list);

    //primary
    //  ...
    let primary = document.createElement("div");
    primary.style.textDecoration = "underline";
    primary.style.order = 1;
    primary.textContent = "primary";
    list.appendChild(primary);

    // other
    // ...
    let other = document.createElement("div");
    other.style.textDecoration = "underline";
    other.style.order = 3;
    other.textContent = "other";
    list.appendChild(other);

    // all
    // ...
    let all = document.createElement("div");
    all.style.textDecoration = "underline";
    all.style.order = 5;
    all.textContent = "all";
    list.appendChild(all);

    for (Enchantment in Enchantments){
        parentBox = document.createElement("div");
        parentBox.classList.add("level-box");
        console.log(Enchantment);
        label = document.createElement("p");
        label.classList.add("label");
        label.style.width = "150px";
        label.style.fontSize = "15px";
        label.innerText = toTitleCase(Enchantment.replaceAll("_", " "))

        value = createInputBox("LVL", "input", "number");
        value.style.fontSize = "14px";
        value.children.item(1).id = "enchantment_" + Enchantment

        label2 = document.createElement("p");
        label2.classList.add("label");
        label2.style.width = "80px";
        label2.style.fontSize = "15px";
        label2.innerText = "Max: " + Enchantments[Enchantment].max


        parentBox.append(label, value, label2);
        list.appendChild(parentBox);
    }

    additionalComponentsParent.appendChild(enchantmentsParent);

    document.getElementById("minecraft:show_all").classList.add("showAllToggle");
}

const leatherColorInput = document.getElementById("leatherColor");

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

const enchantSlotCountInput = document.getElementById("enchantSlotCount");
enchantSlotCountInput.oninput = (event) => {
    const maxSlots = getRarityObject(EDITED_ITEM.rarity).enchantSlots;

    if (event.target.value < 0) {
        event.target.value = 0;
    }
    else if (event.target.value > maxSlots) {
        event.target.value = maxSlots;
    }
};

rarity.onchange = (event) => {

    var rarityObj = getRarityObject(event.target.value);

    const newMaxEnchantSlots = rarityObj.enchantSlots;
    enchantSlotCountInput.placeholder = `0-${newMaxEnchantSlots}`;
    enchantSlotCountInput.value = newMaxEnchantSlots;

    updateColors(getColorCodeHex(rarityObj.color));
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
        box.style.borderColor = hexToRgba(colorHex, 0.25);
    }

    document.getElementById("costsBox").style.borderColor = rarity.style.color;

    let costBoxes = document.getElementsByClassName("cost-box");
    for(let costBox of costBoxes) {
        costBox.style.borderColor = hexToRgba(colorHex, 0.25);
    }

    let levelBoxes = document.getElementsByClassName("level-box");
    for(let levelBox of levelBoxes) {
        levelBox.style.borderColor = hexToRgba(colorHex, 0.5);
    }
}




internalId.value = "new_item";
versionId.value = 1;
minecraftId.value = "minecraft:coal";
itemName.value = "New Item";
type.value = "Material";
upgradable.checked = false;

//Detect any changes
let allInputs = document.getElementsByClassName("data-input");
for (let input of allInputs) {
    input.addEventListener("change", function(event) {
        updateItem();
    })

    if (input.id == "leatherColorInput") {
        input.addEventListener("input", function(event) {
            for (let component of EDITED_ITEM.additional_components) {
                if (component['component'] == 'minecraft:dyed_color') {
                    component['value']['rgb'] = hexToDecimal(event.target.value);
                    break;
                }
            }
            updatePreview(EDITED_ITEM, prevTooltip, prevCanvas);
        })
    }
}

let allButtons = document.querySelectorAll("button");
for (let button of allButtons) {
    button.addEventListener("click", function(event) {
        updateItem();
    })
}

// Store edited item
let EDITED_ITEM;
updateItem(URL_DATA_ITEM === "$"); // is new item

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

    if (item.additional_components){
        for (let component of item.additional_components) {
            if (component['component'] == 'minecraft:dyed_color') {
                leatherColorInput.classList.remove("hide");
                leatherColorInput.children.item(1).value = decimalToHex(component['value']['rgb']).toUpperCase();
                continue;
            }


        }
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

    enchantSlotCountInput.value = item.enchant_slots;

    updateItem();

    updateColors(getColorCodeHex(getRarityObject(item.rarity).color));
}

function updateItem(refreshPreview = true) {
    let additional_components = [];
    if (!leatherColorInput.classList.contains("hide")) {
        additional_components.push({'component': 'minecraft:dyed_color', 'value': {'rgb': hexToDecimal(leatherColorInput.children.item(1).value), 'show_in_tooltip':false}})
    }
    for (const componentData of itemComponents) {
        const componentInput = document.getElementById(componentData.component).children.item(1);
        if (componentInput && componentInput.value !== "" && componentInput.value !== undefined && componentInput.value !== null) {
            switch(componentData.type) {
                case "bool":
                    additional_components.push({'component': componentData.component, 'value': componentInput.value === "on"});
                    break;
                case "string_obj":
                    if (!(componentInput.value[0] === "{" && componentInput.value[componentInput.value.length - 1] === "}"))
                        break;
                    additional_components.push({'component': componentData.component, 'value': componentInput.value});
                    break;                 
            }
        }
    }

    element_data = {
        name: itemName.value,
        internalId: internalId.value,
        versionNumber: versionId.value
    }

    base_data = {   
        description: description.value,
        rarity: rarity.value,
        minecraftId: minecraftId.value,
        identifiedName: identifiedNameToggled ? identifiedNameInput.children.item(1).value : null,
        additional_components: additional_components
    }

    if (type.value === "Material")
    {
        EDITED_ITEM = new BaseItem(
            element_data,
            base_data
        );
    }
    else 
    {
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

        let upgrades = [[], [], [], [], [], [], [], [], []];
        for (let matInput of allMaterialInputs) {
            amount = 0;
            if (matInput.children[2].children[1].value !== '') {
                amount = parseInt(matInput.children[2].children[1].value);
            }

            upgrades[parseInt(matInput.id)-1].push({material_id: matInput.children[0].children[1].value, amount: amount})
        }

        EDITED_ITEM = new StatItem(
            element_data,
            base_data,
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
                abilities: abilities,
                upgrade_costs: upgrades,
                enchant_slots: (enchantSlotCountInput.value !==  "") ? parseInt(enchantSlotCountInput.value) : 0
            }
        );
    }

    // update ability activation selects
    updateActivationSelects();

    // update visible enchantments
    updateVisibleEnchantments();

    // run conditional fields check
    run_matches();
    
    // update preview
    if (refreshPreview) updatePreview(EDITED_ITEM, prevTooltip, prevCanvas);
}

function updateActivationSelects() {
    const abilitySelects = document.getElementsByClassName("ability-activation-select");


}

function updateVisibleEnchantments() {
    for (let enchantment in Enchantments)
    {
        
        let element = document.getElementById("enchantment_" + enchantment);
        let data = Enchantments[enchantment];
        placement = 6
        

        if (data.primary_items){
            
            if (itemTags[data.primary_items.replace("#minecraft:",'')].includes(minecraftId.value.replace("minecraft:",''))){
                placement = 2;
            }
        }else if (data.supported_items){
            
            if (itemTags[data.supported_items.replace("#minecraft:",'')].includes(minecraftId.value.replace("minecraft:",''))){
                placement = 4;
            }
        }
        element.parentElement.parentElement.style.order = placement;
        element.parentElement.parentElement.dataset.order = placement;
    }
}