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