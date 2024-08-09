function getRarityObject(rarityName) {
    return rarities.find(rarity => rarity.name == rarityName);
}

function getColorCode(color) {
    return colorCodes[color];
}

function getColorCodeHex(color) {
    return "#"+getColorCode(color);
}

function insertAt(array, index, element) {
    arr2 = new Array();
    for (let i = 0; i < index; i++) {
        arr2.push(array[i]);
    }

    arr2.push(element);

    for (let i = index; i < array.length; i++) {
        arr2.push(array[i]);
    }

    return arr2;
}


function hexToRgb(hex) {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255]
    }
    throw new Error('Bad Hex');
}

function hexToRgba(hex, alpha){
    rgb = hexToRgb(hex);

    return 'rgba('+rgb.join(',')+','+alpha+')';
}

function hexToDecimal(hex) {
    let rgb = hexToRgb(hex);
    return rgbToDecimal(rgb);
}

function rgbToDecimal(rgb) {
    let decimal = (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2]);
  
    return decimal;
}

function decimalToRgb(dec) {
    var r = Math.floor(dec / (256*256));
    var g = Math.floor(dec / 256) % 256;
    var b = dec % 256;
    return [r, g, b]
}

function rgbToHex(rgb) {
    r = rgb[0].toString(16);
    g = rgb[1].toString(16);
    b = rgb[2].toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}

function decimalToHex(dec) {
    rgb = decimalToRgb(dec);
    return rgbToHex(rgb);
}

function toTitleCase(string) {
    words = string.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}



function createInputBox(label, element_type, input_type) {
    let box = document.createElement("div");
    box.classList.add("inputbox");

    let lab = document.createElement("div");
    lab.innerHTML = label;

    let elem = document.createElement(element_type);
    if (element_type == "input") {
        elem.type = input_type;
    }
    elem.classList.add("data-input");

    box.appendChild(lab);
    box.appendChild(elem);

    return box;
}



function createStatInput(data, parent) {
    let inputBox = createInputBox('<span style="color: '+getColorCodeHex(data.symbolColor)+'">'+data.symbol+' '+'</span>'+data.name+":", "input", "number")
    inputBox.children.item(0).classList.add("stat-label");

    let firstInput = inputBox.children.item(1);
    firstInput.id = data.id;
    firstInput.classList.add("stat-input", "range-first-input");
    firstInput.type = "number";

    let secondInput = document.createElement("input");
    secondInput.id = data.id;
    secondInput.classList.add("data-input", "stat-input", "range-second-input", "hidden");
    firstInput.type = "number";
    inputBox.appendChild(secondInput);

    let button = document.createElement("button");
    button.id = data.id;
    button.classList.add("toggle-range-button");
    button.textContent = "Toggle Range";
    inputBox.appendChild(button);

    parent.appendChild(inputBox);

    return inputBox;
}