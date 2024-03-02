const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('data');

if (id || id !== undefined || id !== null)
    for (let item of allItems) {
        if (item.internalId === id)
        {
            importItem(item);
        }
    }