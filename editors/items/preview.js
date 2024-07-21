const canvas = document.getElementById("previewCanvas");
const tooltip = document.getElementById("previewTooltip");

function updatePreview(item) {
    tooltip.innerHTML = '<span style="color: '+getColorCodeHex(getRarityObject(item.rarity).color)+'">'+item.name+'</span>';
    tooltip.innerHTML += '<br>'
    let loreLines = item.get_lore();

    loadLoreElements(tooltip, loreLines);


    setIcon(item);
}


function setIcon(item) {
    // TODO
    if (item.minecraftId.includes("player_head")) return;

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
                this.src = "assets/item/barrier.png"
            }
        }
    );
}