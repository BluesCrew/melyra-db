function import_item() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('data');

    if (id && id !== undefined && id !== null && id !== "$")
    for (let item of allItems) {
        if (item.internalId === id)
        {
            importItem(item);
        }
    }
}

WhenLoaded.push(function() {import_item()});