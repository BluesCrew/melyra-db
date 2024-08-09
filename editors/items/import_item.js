function import_item() {
    const id = URL_DATA;

    if (id && id !== undefined && id !== null && id !== "$")
    for (let item of allItems) {
        if (item.internalId === id)
        {
            importItem(item);
        }
    }
}

WhenLoaded.push(function() {import_item()});