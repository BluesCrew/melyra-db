function loadLoreElements(parent, loreLines) {
    lineCount = 0;
    for (let line of loreLines) {
        if (lineCount != 0) {parent.innerHTML += "<br>"};
        if (Array.isArray(line)) {
            for (let segment of line){
                parent.innerHTML += '<span style="color: '+getColorCodeHex(segment.color)+'; text-align: left;">'+segment.text+'</span>';
            }
        }
        else if (line.text !== " "){
            parent.innerHTML += '<span style="color: '+getColorCodeHex(line.color)+'; text-align: left;">'+line.text+'</span>';
        }
        lineCount++;
    }
}