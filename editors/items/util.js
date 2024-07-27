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