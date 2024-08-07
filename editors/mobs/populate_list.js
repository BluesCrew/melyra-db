function populate_list(mob) {
    let parent = document.getElementById("list-parent");

    let newElem = document.createElement("button");
    newElem.classList.add("melyra-element");
    newElem.addEventListener("click", function() {
        document.location.href = "/melyra-db/editors/mobs/creation_page.html?data="+encodeURIComponent(mob.internalId);
    });

    let newName = document.createElement("p");
    newName.classList.add("melyra-element-tooltip")

    newName.innerHTML = mob.name;

    let canvas = document.createElement("canvas");
    // updatePreview(mob, tooltipLore, canvas)
    
    newElem.appendChild(newName);
    newElem.appendChild(canvas);

    parent.appendChild(newElem);
}

function populate_lists() {
    for(let mob of allMobs) 
    {
        populate_list(mob);
    }
    
    document.getElementById("newMobButton").addEventListener("click", function() {
        document.location.href = "/melyra-db/editors/mobs/creation_page.html?data=$";
    })
}

WhenLoaded.push(function() {populate_lists()});