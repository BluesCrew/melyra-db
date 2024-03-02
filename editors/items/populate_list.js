function populate_list(item) {
    let parent = document.getElementById("list-parent");

    let newElem = document.createElement("a");
    newElem.classList.add("melyra-element");
    newElem.href = "/melyra-db/editors/items/creation_page.html"

    let newName = document.createElement("p");
    newName.style.color = getColorCodeHex(item.rarity.color)
    newName.classList.add("melyra-element-tooltip")

    newName.innerHTML = '<span style="color: '+getColorCodeHex(item.rarity.color)+'; text-align: center;">'+item.name+'</span>';

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