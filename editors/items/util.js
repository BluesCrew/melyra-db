function getRarityObject(rarityName) {
    return rarities.find(rarity => rarity.name == rarityName);
}

function getColorCode(color) {
    return colorCodes[color];
}

function getColorCodeHex(color) {
    return "#"+getColorCode(color);
}