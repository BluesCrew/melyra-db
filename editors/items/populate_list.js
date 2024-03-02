function populate_list(item) {
    let parent = document.getElementById("list-parent");

    let newElem = document.createElement("button");
    newElem.classList.add("melyra-element");
    newElem.addEventListener("click", function() {
        document.location.href = "/melyra-db/editors/items/creation_page.html?data="+encodeURIComponent(item.internalId);
    });

    let newName = document.createElement("p");
    newName.classList.add("melyra-element-tooltip")

    newName.innerHTML = '<span style="color: '+getColorCodeHex(item.rarity.color)+'; text-align: center;">'+item.name+'</span>';
    let tooltipLore = document.createElement("div");
    tooltipLore.classList.add("melyra-element-tooltip-lore");
    newName.appendChild(tooltipLore);
    loadLoreElements(tooltipLore, item.get_lore());


    let img = document.createElement("img");
    img.src = item.sprite;
    
    newElem.appendChild(newName);
    newElem.appendChild(img);

    parent.appendChild(newElem);
}

for(item of allItems) 
{
    populate_list(item);
}