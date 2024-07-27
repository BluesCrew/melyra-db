function updatePreview(item, tooltip, canvas) {
    tooltip.innerHTML = '<span style="color: '+getColorCodeHex(getRarityObject(item.rarity).color)+'">'+item.name+'</span>';
    tooltip.innerHTML += '<br>'
    let loreLines = item.get_lore();

    loadLoreElements(tooltip, loreLines);

    setIcon(item, canvas);
}


function setIcon(item, canvas) {
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

                if (item.minecraftId.includes("leather_")) {
                    handlePreviewLeatherColor(item, ctx);
                }
            },
            onerror: function () {
                this.src = "/melyra-db/assets/item/barrier.png"
            }
        }
    );
}

function handlePreviewLeatherColor(item, ctx) {
    let color = "";
    for (let component of item.additional_components) {
        if (component['component'] == 'minecraft:dyed_color') {
            color = decimalToHex(component['value']['rgb']);
        }
    }
    if (color == "") {
        color = "#000000";
    }


    width = ctx.canvas.width;
    height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);

    Object.assign(
        new Image(), {
            src: item.sprite,
            onload: function() {
                let buffer = document.createElement('canvas');
                buffer.width = width;
                buffer.height = height;
                bx = buffer.getContext('2d');
                bx.imageSmoothingEnabled = false;
            
                bx.globalCompositeOperation = "copy";
                bx.drawImage(this, 0, 0, width, height);
                bx.globalCompositeOperation = "multiply";
                bx.fillStyle = color; 
                bx.fillRect(0, 0, width, height);
                bx.globalCompositeOperation = "destination-atop";
                bx.drawImage(this, 0, 0, width, height);
            
                ctx.drawImage(buffer, 0, 0, width, height);
                
                Object.assign(
                    new Image(), {
                        src: `/melyra-db/assets/item/${item.minecraftId}_overlay.png`,
                        onload: function() {
                            ctx.drawImage(this, 0, 0, width, height);
                        },
                        onerror: function() {
                            console.log("error when loading image")
                        }
                    }
                )
            },
            onerror: function() {
                console.log("error when loading image");
            }
        }
    )
}