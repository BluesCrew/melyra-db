import {importMob} from "./edit_mob.js";

function import_mob() {
    const id = URL_DATA;

    if (id && id !== undefined && id !== null && id !== "$")
    for (let mob of allMobs) {
        if (mob.internalId === id)
        {
            importMob(mob);
        }
    }
}

WhenLoaded.push(function() {import_mob()});