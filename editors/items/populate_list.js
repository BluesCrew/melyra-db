a = new BaseItem(
    {
        name: "Super Beef",
        internalId: "melyra:super_beef",
    }, 
    {
        isCustomTexture: false,
        rarity: "Common",
        minecraftId: "wheat"
    }
);

b = new BaseItem(
    {
        name: "Hyper Boat",
        internalId: "melyra:hyper_boat",
    }, 
    {
        isCustomTexture: false,
        rarity: "Epic",
        minecraftId: "birch_boat"
    }
);

c = new BaseItem(
    {
        name: "Ender Fragment",
        internalId: "melyra:hyper_boat",
    }, 
    {
        isCustomTexture: false,
        rarity: "Legendary",
        minecraftId: "silence_armor_trim_smithing_template"
    }
);

all_items = [];
all_items.push(a, b, c);

function populate_list(item) {
    console.log(item);

    let parent = document.getElementById("list-parent");

    let newElem = document.createElement("a");
    newElem.classList.add("melyra-element");

    let newName = document.createElement("p");
    newName.textContent = item.name;
    newName.style.color = getColorCodeHex(item.rarity.color)
    newName.classList.add("melyra-element-tooltip")

    // newName.innerHTML = '<span style="color: rgb(85, 255, 255); text-align: center;">Test Name</span>';
    // newName.innerHTML += '<div class="melyra-element-tooltip-lore">\
    //     <br>\
    //     <span style="color: rgb(237, 237, 237);">[Helmet | Legendary]</span>\
    //     <br>\
    //     <br>\
    //     <span class="italic" style="color: rgb(85, 85, 85);">Test description </span>\
    //     <br>\
    //     <span class="italic" style="color: rgb(85, 85, 85);"> Second line of test description</span>\
    //     <br>\
    //     <br>\
    //     <span style="color: rgb(255, 85, 85);">❤ </span>\
    //     <span style="color: rgb(170, 170, 170);">Health </span>\
    //     <span style="color: rgb(255, 255, 255);">1</span>\
    //     <br>\
    //     <span style="color: rgb(85, 255, 85);">❂ </span>\
    //     <span style="color: rgb(170, 170, 170);">Defense </span>\
    //     <span style="color: rgb(255, 255, 255);">2</span>\
    //     <span style="color: rgb(255, 255, 255);"> - </span>\
    //     <span style="color: rgb(255, 255, 255);">3</span>\
    //     <br>\
    //     <br>\
    //     <span style="color: rgb(85, 255, 255);">Display Ability Name:</span>\
    //     <span class="bold" style="color: rgb(255, 255, 85);"> [</span>\
    //     <span style="color: rgb(255, 170, 0);">Full Set</span>\
    //     <span class="bold" style="color: rgb(255, 255, 85);">]</span>\
    //     <br>\
    //     <span style="color: rgb(170, 170, 170);">Ability Description</span>\
    //     <br>\
    //     <span style="color: rgb(85, 255, 255);"> ₪ Mana: </span>\
    //     <span style="color: rgb(255, 255, 255);">2</span>\
    //     <br>\
    //     <br>\
    //     <span style="color: rgb(85, 255, 255);">||</span>\
    //     <span style="color: rgb(85, 255, 255);"> Enchantments</span>\
    //     <br>\
    //     <span style="color: rgb(85, 255, 255);">||</span>\
    //     <span style="color: rgb(170, 170, 170);"> [</span>\
    //     <span style="color: rgb(255, 255, 255);">❌</span>\
    //     <span style="color: rgb(170, 170, 170);">] </span>\
    //     <span style="color: rgb(170, 170, 170);"> [</span>\
    //     <span style="color: rgb(255, 255, 255);">❌</span>\
    //     <span style="color: rgb(170, 170, 170);">] </span>\
    //     <span style="color: rgb(170, 170, 170);"> [</span>\
    //     <span style="color: rgb(255, 255, 255);">❌</span>\
    //     <span style="color: rgb(170, 170, 170);">] </span>\
    //     <span style="color: rgb(170, 170, 170);"> [</span>\
    //     <span style="color: rgb(255, 255, 255);">❌</span>\
    //     <span style="color: rgb(170, 170, 170);">] </span>\
    //     <span style="color: rgb(170, 170, 170);"> [</span>\
    //     <span style="color: rgb(255, 255, 255);">❌</span>\
    //     <span style="color: rgb(170, 170, 170);">] </span>\
    //     <br>\
    //     </div>'

    let img = document.createElement("img");
    img.src = item.sprite;
    
    newElem.appendChild(newName);
    newElem.appendChild(img);

    parent.appendChild(newElem);
}


for(item of all_items) 
{
    populate_list(item);
}