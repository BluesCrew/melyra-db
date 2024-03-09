// Dropdown Color Changes
document.getElementById("optionCommon").style.color = getColorCodeHex(getRarityObject("Common").color);
document.getElementById("optionUncommon").style.color = getColorCodeHex(getRarityObject("Uncommon").color);
document.getElementById("optionRare").style.color = getColorCodeHex(getRarityObject("Rare").color);
document.getElementById("optionEpic").style.color = getColorCodeHex(getRarityObject("Epic").color);
document.getElementById("optionLegendary").style.color = getColorCodeHex(getRarityObject("Legendary").color);

//// STATS
// create stat inputs

const statDataPart = document.getElementById("statItemData");

for (let data of statData) {
    let inputBox = document.createElement("div");
    inputBox.classList.add("inputbox");

    let label = document.createElement("div");
    label.innerHTML = '<span style="color: '+getColorCodeHex(data.symbolColor)+'">'+data.symbol+' '+'</span>'+data.name+":";
    label.classList.add("stat-label");
    inputBox.appendChild(label);

    let firstInput = document.createElement("input");
    firstInput.id = data.id;
    firstInput.classList.add("data-input", "stat-input", "range-first-input");
    firstInput.type = "number";
    inputBox.appendChild(firstInput);

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

    statDataPart.appendChild(inputBox);
}

// Range Toggles
let rangeButtons = document.getElementsByClassName("toggle-range-button");
for(let rangeButton of rangeButtons) {
    let rangeSecondInput = document.querySelector(".range-second-input#"+rangeButton.id);
    rangeButton.addEventListener("click", () => {
        rangeSecondInput.classList.toggle("hidden");
    });
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
    rarity.style.color = getColorCodeHex(getRarityObject(event.target.value).color);
};

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
    rarity.value = item.rarity.name;
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
    }

    updateItem();

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
                upgradable: upgradable.checked
            }
        );
    }

    // finally, update preview
    updatePreview(EDITED_ITEM);
}