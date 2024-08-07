function import_mob() {
    const id = URL_DATA_MOB;

    if (id && id !== undefined && id !== null && id !== "$")
    for (let mob of allMobs) {
        if (mob.internalId === id)
        {
            importMob(mob);
        }
    }
}

WhenLoaded.push(function() {import_mob()});