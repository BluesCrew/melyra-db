import {previewMob} from "./preview.js";

// Get Inputs
const inputs = {}
for (let id of ["internalId", "versionId", "minecraftId", "textureVariant", "mobName", "mobNameColor", "mobLevel", "mobDeathLootTable", "isCustomAggressive", "tags", "otherNBT"]) {
    inputs[id] = document.getElementById(id);
    inputs[id].onchange = (event) => {
        updateMob();
    }
}

// Texture Variants
function updateVariantSelect(minecraftId) {
    const variantSelect = inputs.textureVariant;
    variantSelect.innerHTML = '';
    if (minecraftId in entityVariants) {
        const variants = entityVariants[minecraftId];
        for (const variant of variants) {
            const option = document.createElement("option");
            option.value = variant;
            option.textContent = toTitleCase(variant.replace(/_/g, " "));
            option.addEventListener("change", function() {
                updateMob();
            })
            variantSelect.append(option);
        }
    }
    updateMob();
}
inputs.minecraftId.addEventListener("change", function(event) {updateVariantSelect(event.target.value);});

// Create Stat Inputs
for (let data of mobStatData) {
    inputs[`stat_${data.id}Input`] = createStatInput(data, document.getElementById("statData"));
}

// Store edited mob
let EDITED_MOB;
updateMob(URL_DATA === "$"); // is new mob

export function importMob(mob) {
    inputs.internalId.value = mob.internalId;
    inputs.versionId.value = mob.versionNumber;
    inputs.minecraftId.value = mob.minecraftId;
    inputs.mobName.value = mob.name;
    inputs.mobNameColor.value = mob.nameColor;
    inputs.mobLevel.value = mob.level;
    inputs.mobDeathLootTable.value = mob.deathLootTable;
    inputs.isCustomAggressive.value = mob.isCustomAggressive;
    inputs.tags.value = mob.tags;
    inputs.otherNBT.value = mob.otherNBT;
    inputs.textureVariant.value = mob.textureVariant;

    updateVariantSelect(mob.minecraftId);

    updateMob();
}

function updateMob(refreshPreview = true) {
    EDITED_MOB = new Mob(
        {
            name: inputs.mobName.value,
            internalId: inputs.internalId.value,
            versionNumber: inputs.versionId.value
        },
        {
            health: inputs.stat_healthInput,
            defense: inputs.stat_defenseInput,
            magicDefense: inputs.stat_magicDefenseInput,
            damage: inputs.stat_damageInput,
            magicDamage: inputs.stat_magicDamageInput,
            speed: inputs.stat_speedInput,
            knockbackResistance: inputs.stat_woodcuttingSpeedInput
        },
        {   
            nameColor: inputs.mobNameColor.value,
            minecraftId: inputs.minecraftId.value,
            textureVariant: inputs.textureVariant.value,
            level: inputs.mobLevel.value,
            deathLootTable:inputs.mobDeathLootTable.value,
            isCustomAggressive: inputs.isCustomAggressive.value,
            tags: inputs.tags.value,
            otherNBT: inputs.otherNBT.value
        }
    );

    // run conditional fields check
    // run_matches();
    
    // update preview
    const canvas = document.getElementById("mobPreviewCanvas");
    canvas.width = 500;
    canvas.height = 1000;
    if (refreshPreview) previewMob(EDITED_MOB, canvas);
}

