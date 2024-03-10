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

function hexToRgbA(hex, setAlpha){
    var c;
    console.log("parsing " + hex);
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+setAlpha+')';
    }
    throw new Error('Bad Hex');
}