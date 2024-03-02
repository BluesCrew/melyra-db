// Dropdown Color Changes
document.getElementById("optionCommon").style.color = getColorCodeHex(getRarityObject("Common").color);
document.getElementById("optionUncommon").style.color = getColorCodeHex(getRarityObject("Uncommon").color);
document.getElementById("optionRare").style.color = getColorCodeHex(getRarityObject("Rare").color);
document.getElementById("optionEpic").style.color = getColorCodeHex(getRarityObject("Epic").color);
document.getElementById("optionLegendary").style.color = getColorCodeHex(getRarityObject("Legendary").color);
let raritySelect = document.getElementById("raritySelect");

// Default Values
raritySelect.onchange = (event) => {
    console.log(event.target.value);
    raritySelect.style.color = getColorCodeHex(getRarityObject(event.target.value).color);
};

document.getElementById("internalId").value = "melyra:new_item";
document.getElementById("versionId").value = 0;
document.getElementById("minecraftId").value = "minecraft:coal";
document.getElementById("itemName").value = "New Item";
document.getElementById("typeSelect").value = "Material";

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

function updateItem() {
    let internalId = document.getElementById("internalId"); 
    let versionId = document.getElementById("versionId"); 
    let minecraftId = document.getElementById("minecraftId"); 
    let name = document.getElementById("itemName"); 
    let rarity = document.getElementById("raritySelect"); 
    let type = document.getElementById("typeSelect");
    let description = document.getElementById("description");

    let statDataPart = document.getElementById("statItemData");

    if (type.value === "Material")
    {
        statDataPart.style.display = "none";

        EDITED_ITEM = new BaseItem(
            {
                name: name.value,
                internalId: internalId.value,
                versionNumber: versionId.value
            },
            {
                description: decomposeDescription(description.value),
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

function decomposeDescription(raw) {
    if (!raw) return undefined;
    return raw.split("\\n");
}