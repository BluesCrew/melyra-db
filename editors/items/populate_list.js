a = new BaseItem(
    {
        name: "Super Beef",
        internalId: "melyra:super_beef",
    }, 
    {
        isCustomTexture: false,
        rarityColor: RARITY_UNCOMMON,
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
        rarityColor: RARITY_EPIC,
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
        rarityColor: RARITY_LEGENDARY,
        minecraftId: "silence_armor_trim_smithing_template"
    }
);

all_items = [];
all_items.push(a);


const template_lore = [
    {color:"#FFFFFF",text:"[Melee | Uncommon]"},
    {text:" "},
    {color:"#555555", text:"Test Description, first line"},
    {color:"#555555", text:"Test Description, second line"},
    {text:" "},
    [{color:"#FF5555",text:"❤"},{color:"#AAAAAA",text:" Health"},{color:"#FFFFFF",text:" 1"}]
]

function populate_list(item) {
    let parent = document.getElementById("list-parent");

    let newElem = document.createElement("a");
    newElem.classList.add("melyra-element");

    let newName = document.createElement("p");
    newName.textContent = item.name;
    newName.style.color = item.rarityColor.color;
    newName.classList.add("melyra-element-tooltip")

    let img = document.createElement("img");
    img.src = item.sprite;
    
    newElem.appendChild(newName);
    newElem.appendChild(img);

    parent.appendChild(newElem);

    parent.addEventListener("mouseleave", function() {
        setTimeout(function() {
            newName.innerHTML = '<span style="color: rgb(85, 255, 255); text-align: center;">Test Name</span>';
        }, 400)
    })

    parent.addEventListener("mouseenter", function () {
        newName.innerHTML = 
        '<span style="color: rgb(85, 255, 255); text-align: center;">Test Name</span>\
        <br>\
        <span style="color: rgb(237, 237, 237);">[Helmet | Legendary]</span>\
        <br>\
        <br>\
        <span class="italic" style="color: rgb(85, 85, 85);">Test description </span>\
        <br>\
        <span class="italic" style="color: rgb(85, 85, 85);"> Second line of test description</span>\
        <br>\
        <br>\
        <span style="color: rgb(255, 85, 85);">❤ </span>\
        <span style="color: rgb(170, 170, 170);">Health </span>\
        <span style="color: rgb(255, 255, 255);">1</span>\
        <br>\
        <span style="color: rgb(85, 255, 85);">❂ </span>\
        <span style="color: rgb(170, 170, 170);">Defense </span>\
        <span style="color: rgb(255, 255, 255);">2</span>\
        <span style="color: rgb(255, 255, 255);"> - </span>\
        <span style="color: rgb(255, 255, 255);">3</span>\
        <br>\
        <br>\
        <span style="color: rgb(85, 255, 255);">Display Ability Name:</span>\
        <span class="bold" style="color: rgb(255, 255, 85);"> [</span>\
        <span style="color: rgb(255, 170, 0);">Full Set</span>\
        <span class="bold" style="color: rgb(255, 255, 85);">]</span>\
        <br>\
        <span style="color: rgb(170, 170, 170);">Ability Description</span>\
        <br>\
        <span style="color: rgb(85, 255, 255);"> ₪ Mana: </span>\
        <span style="color: rgb(255, 255, 255);">2</span>\
        <br>\
        <br>\
        <span style="color: rgb(85, 255, 255);">||</span>\
        <span style="color: rgb(85, 255, 255);"> Enchantments</span>\
        <br>\
        <span style="color: rgb(85, 255, 255);">||</span>\
        <span style="color: rgb(170, 170, 170);"> [</span>\
        <span style="color: rgb(255, 255, 255);">❌</span>\
        <span style="color: rgb(170, 170, 170);">] </span>\
        <span style="color: rgb(170, 170, 170);"> [</span>\
        <span style="color: rgb(255, 255, 255);">❌</span>\
        <span style="color: rgb(170, 170, 170);">] </span>\
        <span style="color: rgb(170, 170, 170);"> [</span>\
        <span style="color: rgb(255, 255, 255);">❌</span>\
        <span style="color: rgb(170, 170, 170);">] </span>\
        <span style="color: rgb(170, 170, 170);"> [</span>\
        <span style="color: rgb(255, 255, 255);">❌</span>\
        <span style="color: rgb(170, 170, 170);">] </span>\
        <span style="color: rgb(170, 170, 170);"> [</span>\
        <span style="color: rgb(255, 255, 255);">❌</span>\
        <span style="color: rgb(170, 170, 170);">] </span>\
        <br>'
    })
}


for(item of all_items) 
{
    populate_list(item);
}