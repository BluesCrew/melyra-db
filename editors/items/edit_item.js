// Dropdown Color Changes
document.getElementById("optionCommon").style.color = getColorCodeHex(getRarityObject("Common").color);
document.getElementById("optionUncommon").style.color = getColorCodeHex(getRarityObject("Uncommon").color);
document.getElementById("optionRare").style.color = getColorCodeHex(getRarityObject("Rare").color);
document.getElementById("optionEpic").style.color = getColorCodeHex(getRarityObject("Epic").color);
document.getElementById("optionLegendary").style.color = getColorCodeHex(getRarityObject("Legendary").color);

// Default Values
const internalId = document.getElementById("internalId"); 
const versionId = document.getElementById("versionId"); 
const minecraftId = document.getElementById("minecraftId"); 
const name = document.getElementById("itemName"); 
const rarity = document.getElementById("raritySelect"); 
const type = document.getElementById("typeSelect");
const description = document.getElementById("description");

const statDataPart = document.getElementById("statItemData");

rarity.onchange = (event) => {
    rarity.style.color = getColorCodeHex(getRarityObject(event.target.value).color);
};

internalId.value = "new_item";
versionId.value = 1;
minecraftId.value = "minecraft:coal";
itemName.value = "New Item";
type.value = "Material";

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
                rarity: getRarityObject(rarity.value),
                minecraftId: minecraftId.value
            }
        );
    }
    else 
    {
        statDataPart.style.display = "inline";
    }

    // finally, update preview
    updatePreview(EDITED_ITEM);
}