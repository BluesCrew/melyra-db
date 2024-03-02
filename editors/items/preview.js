const canvas = document.getElementById("previewCanvas");
const tooltip = document.getElementById("previewTooltip");

function updatePreview(item) {
    tooltip.innerHTML = '<span style="color: '+getColorCodeHex(item.rarity.color)+'">'+item.name+'</span>';
    let loreLines = item.get_lore();
    
    for (let line of loreLines) {
        tooltip.innerHTML += "<br>";
        if (Array.isArray(line)) {
            for (let segment of line){
                tooltip.innerHTML += '<span style="color: '+getColorCodeHex(segment.color)+'">'+segment.text+'</span>';
            }
        }
        else if (line.text !== " "){
            tooltip.innerHTML += '<span style="color: '+getColorCodeHex(line.color)+'">'+line.text+'</span>';
        }
    }

    setIcon(item);
}


function setIcon(item) {
    // TODO
    if ((item.minecraftId === "minecraft:player_head" || item.minecraftId === "player_head")) return;

    Object.assign(
        new Image(), {
            src: item.sprite,
            onload: function () {
                let ctx = canvas.getContext(["2d"]);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
            },
            onerror: function () {
                this.src = "/melyra-db/assets/item/barrier.png"
            }
        }
    );
}