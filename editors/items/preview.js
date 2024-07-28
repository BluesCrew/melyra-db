let loaded_sprite = "";
let image_buffer = new Image();

const leather_overlay = {
    "leather_helmet": Object.assign(new Image(), {src:"/melyra-db/assets/item/leather_helmet_overlay.png"}),
    "leather_chestplate": Object.assign(new Image(), {src:"/melyra-db/assets/item/leather_chestplate_overlay.png"}),
    "leather_leggings": Object.assign(new Image(), {src:"/melyra-db/assets/item/leather_leggings_overlay.png"}),
    "leather_boots": Object.assign(new Image(), {src:"/melyra-db/assets/item/leather_boots_overlay.png"}),
    "leather_horse_armor": Object.assign(new Image(), {src:"/melyra-db/assets/item/leather_chestplate_overlay.png"}) // empty image
}

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

    let ctx = canvas.getContext(["2d"]);
    ctx.imageSmoothingEnabled = false;

    let not_loaded = item.minecraftId !== loaded_sprite;

    if (not_loaded) {
        console.log("update buffer");
        Object.assign(
            new Image(), {
                src: item.sprite,
                onload: function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        loaded_sprite = item.minecraftId;
    } 
    else {
        console.log("draw buffer");
        ctx.drawImage(image_buffer, 0, 0, canvas.width, canvas.height)

        if (item.minecraftId.includes("leather_")) {
            handlePreviewLeatherColor(item, ctx);
        }
    }
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
                
                ctx.drawImage(leather_overlay[item.minecraftId], 0, 0, width, height);
            },
            onerror: function() {
                console.log("error when loading image");
            }
        }
    )
}