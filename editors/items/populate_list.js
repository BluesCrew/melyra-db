function populate_list(item) {
    let parent = document.getElementById("list-parent");

    let newElem = document.createElement("button");
    newElem.classList.add("melyra-element");
    newElem.addEventListener("click", function() {
        document.location.href = "/melyra-db/editors/items/creation_page.html?data="+encodeURIComponent(item.internalId);
    });

    let newName = document.createElement("p");
    newName.classList.add("melyra-element-tooltip")

    newName.innerHTML = '<span style="color: '+getColorCodeHex(getRarityObject(item.rarity).color)+'; text-align: center;">'+item.name+'</span>';
    let tooltipLore = document.createElement("div");
    tooltipLore.classList.add("melyra-element-tooltip-lore");
    newName.appendChild(tooltipLore);

    Lore = item.get_lore();
    tooltipLore.setAttribute("Lore", JSON.stringify(Lore));
    loadLoreElements(tooltipLore, Lore);

    let img = document.createElement("img");
    img.src = item.sprite;
    
    newElem.appendChild(newName);
    newElem.appendChild(img);

    parent.appendChild(newElem);
}

function populate_lists() {
    for(item of allItems) 
    {
        populate_list(item);
    }
    
    document.getElementById("newItemButton").addEventListener("click", function() {
        document.location.href = "/melyra-db/editors/items/creation_page.html?data=$";
    })
}

WhenLoaded.push(function() {populate_lists()});