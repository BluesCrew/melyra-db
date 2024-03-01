diamond_sword = {
    name: "Diamond Sword",
    id: "diamond_sword",
    rarity_color: "#FFFFFF"
}
sword_of_stars = {
    name: "Sword of Stars",
    id: "golden_sword",
    rarity_color: "#55FFFF"
}


all_items = [];
all_items.push(diamond_sword);
all_items.push(sword_of_stars, diamond_sword, diamond_sword, sword_of_stars);

function get_sprite(item) {
    return "/melyra-db/assets/prototype/" + item.id + ".png";
}

function populate_list(item) {
    let parent = document.getElementById("list-parent");
    console.log(parent)

    let newElem = document.createElement("a");
    newElem.className = "melyra-element";
    let newName = document.createElement("p");
    newName.textContent = item.name;
    newName.style.color = item.rarity_color;
    
    let img = document.createElement("img");
    img.src = get_sprite(item);
    
    newElem.appendChild(newName);
    newElem.appendChild(img);

    parent.appendChild(newElem);
}

all_items.forEach(element => {
    populate_list(element);
});