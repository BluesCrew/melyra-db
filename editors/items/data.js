const rarities = [
    { name: "Common", color: "white", enchantSlots: 1},
    { name: "Uncommon", color: "green", enchantSlots: 2 },
    { name: "Rare", color: "blue", enchantSlots: 3 },
    { name: "Epic", color: "light_purple", enchantSlots: 4 },
    { name: "Legendary", color: "aqua", enchantSlots: 5 }
];

const colorCodes = {
    dark_red: "AA0000",
    red: "FF5555",
    gold: "FFAA00",
    yellow: "FFFF55",
    dark_green: "00AA00",
    green: "55FF55",
    aqua: "55FFFF",
    dark_aqua: "00AAAA",
    dark_blue: "0000AA",
    blue: "5555FF",
    light_purple: "FF55FF",
    dark_purple: "AA00AA",
    white: "FFFFFF",
    gray: "AAAAAA",
    dark_gray: "555555",
    black: "000000",
};

const statData = [
    { id: "health", group: 1, symbol: "❤", numberOfSpaces: 1, symbolColor: "red", name: "Health", nbt: "MaxHealth", isPercentage: false },
    { id: "defense", group: 1, symbol: "❂", numberOfSpaces: 1, symbolColor: "green", name: "Defense", nbt: "Defense", isPercentage: false },
    { id: "magicDefense", group: 1, symbol: "۞", numberOfSpaces: 1, symbolColor: "blue", name: "Magic Defense", nbt: "MagicDefense", isPercentage: false },
    { id: "healthRegeneration", group: 1, symbol: "❣", numberOfSpaces: 1, symbolColor: "red", name: "Health Regeneration", nbt: "HealthRegeneration", isPercentage: true },
    { id: "manaRegeneration", group: 1, symbol: "๑", numberOfSpaces: 1, symbolColor: "aqua", name: "Mana Regeneration", nbt: "ManaRegeneration", isPercentage: true },

    { id: "damage", group: 2, symbol: "🗡", numberOfSpaces: 1, symbolColor: "red", name: "Damage", nbt: "Damage", isPercentage: false },
    { id: "strength", group: 2, symbol: "❁", numberOfSpaces: 1, symbolColor: "red", name: "Strength", nbt: "Strength", isPercentage: false },
    { id: "critical", group: 2, symbol: "☣", numberOfSpaces: 1, symbolColor: "red", name: "Critical", nbt: "Critical", isPercentage: true },
    { id: "drawSpeed", group: 2, symbol: "➹", numberOfSpaces: 1, symbolColor: "green", name: "Draw Speed", nbt: "DrawSpeed", isPercentage: true },
    { id: "overdraw", group: 2, symbol: "🏹", numberOfSpaces: 1, symbolColor: "blue", name: "Overdraw", nbt: "Overdraw", isPercentage: true },
    { id: "attackSpeed", group: 2, symbol: "✲", numberOfSpaces: 1, symbolColor: "yellow", name: "Attack Speed", nbt: "AttackSpeed", isPercentage: true },
    { id: "mana", group: 2, symbol: "₪", numberOfSpaces: 1, symbolColor: "aqua", name: "Mana", nbt: "Mana", isPercentage: false },
    { id: "magicDamage", group: 2, symbol: "✯", numberOfSpaces: 1, symbolColor: "aqua", name: "Magic Damage", nbt: "MagicDamage", isPercentage: false },

    { id: "speed", group: 3, symbol: "✦", numberOfSpaces: 1, symbolColor: "white", name: "Speed", nbt: "Speed", isPercentage: true },
    { id: "arcane", group: 3, symbol: "¤", numberOfSpaces: 1, symbolColor: "light_purple", name: "Arcane", nbt: "Arcane", isPercentage: false },
    { id: "miningSpeed", group: 3, symbol: "⛏", numberOfSpaces: 1, symbolColor: "gold", name: "Mining Speed", nbt: "MiningSpeed", isPercentage: false },
    { id: "woodcuttingSpeed", group: 3, symbol: "🪓", numberOfSpaces: 1, symbolColor: "gold", name: "Woodcutting Speed", nbt: "WoodcuttingSpeed", isPercentage: false },
    // { id: "fishingSpeed", group: 3, symbol: "🎣", numberOfSpaces: 1, symbolColor: "gold", name: "Fishing Speed", nbt: "FishingSpeed", isPercentage: false },
];

const itemTags = {
    "enchantable/armor" : ['golden_chestplate', 'iron_boots', 'golden_boots', 'leather_boots', 'leather_leggings', 'diamond_helmet', 'chainmail_leggings', 'diamond_leggings', 'chainmail_boots', 'netherite_boots', 'leather_helmet', 'leather_chestplate', 'golden_helmet', 'turtle_helmet', 'iron_helmet', 'netherite_chestplate', 'netherite_helmet', 'iron_leggings', 'diamond_boots', 'iron_chestplate', 'netherite_leggings', 'chainmail_helmet', 'diamond_chestplate', 'golden_leggings', 'chainmail_chestplate'],
    "enchantable/bow" : ['bow'],
    "enchantable/chest_armor" : ['leather_chestplate', 'golden_chestplate', 'iron_chestplate', 'diamond_chestplate', 'netherite_chestplate', 'chainmail_chestplate'],
    "enchantable/crossbow" : ['crossbow'],
    "enchantable/durability" : ['golden_chestplate', 'diamond_axe', 'golden_pickaxe', 'wooden_shovel', 'warped_fungus_on_a_stick', 'bow', 'iron_boots', 'golden_boots', 'netherite_shovel', 'mace', 'leather_boots', 'leather_leggings', 'iron_shovel', 'diamond_helmet', 'chainmail_leggings', 'flint_and_steel', 'diamond_leggings', 'diamond_pickaxe', 'stone_shovel', 'golden_sword', 'iron_hoe', 'stone_sword', 'diamond_shovel', 'shield', 'elytra', 'chainmail_boots', 'netherite_boots', 'wooden_sword', 'leather_helmet', 'netherite_hoe', 'diamond_hoe', 'netherite_pickaxe', 'stone_pickaxe', 'golden_hoe', 'leather_chestplate', 'golden_helmet', 'fishing_rod', 'netherite_axe', 'turtle_helmet', 'wooden_pickaxe', 'iron_helmet', 'diamond_sword', 'iron_axe', 'carrot_on_a_stick', 'crossbow', 'golden_shovel', 'netherite_chestplate', 'iron_pickaxe', 'netherite_helmet', 'iron_leggings', 'diamond_boots', 'stone_hoe', 'shears', 'netherite_sword', 'wooden_hoe', 'golden_axe', 'wooden_axe', 'iron_chestplate', 'netherite_leggings', 'iron_sword', 'chainmail_helmet', 'stone_axe', 'brush', 'diamond_chestplate', 'golden_leggings', 'trident', 'chainmail_chestplate'],
    "enchantable/equippable" : ['golden_chestplate', 'dragon_head', 'iron_boots', 'golden_boots', 'leather_boots', 'leather_leggings', 'piglin_head', 'diamond_helmet', 'chainmail_leggings', 'diamond_leggings', 'chainmail_boots', 'elytra', 'netherite_boots', 'leather_helmet', 'wither_skeleton_skull', 'leather_chestplate', 'golden_helmet', 'zombie_head', 'skeleton_skull', 'turtle_helmet', 'iron_helmet', 'netherite_chestplate', 'netherite_helmet', 'iron_leggings', 'diamond_boots', 'player_head', 'carved_pumpkin', 'iron_chestplate', 'netherite_leggings', 'chainmail_helmet', 'diamond_chestplate', 'creeper_head', 'golden_leggings', 'chainmail_chestplate'],
    "enchantable/fire_aspect" : ['netherite_sword', 'wooden_sword', 'diamond_sword', 'iron_sword', 'mace', 'golden_sword', 'stone_sword'],
    "enchantable/fishing" : ['fishing_rod'],
    "enchantable/foot_armor" : ['chainmail_boots', 'netherite_boots', 'iron_boots', 'golden_boots', 'leather_boots', 'diamond_boots'],
    "enchantable/head_armor" : ['golden_helmet', 'turtle_helmet', 'iron_helmet', 'chainmail_helmet', 'leather_helmet', 'diamond_helmet', 'netherite_helmet'],
    "enchantable/leg_armor" : ['netherite_leggings', 'leather_leggings', 'diamond_leggings', 'chainmail_leggings', 'golden_leggings', 'iron_leggings'],
    "enchantable/mace" : ['mace'],
    "enchantable/mining" : ['diamond_axe', 'golden_pickaxe', 'wooden_shovel', 'netherite_shovel', 'iron_shovel', 'diamond_pickaxe', 'stone_shovel', 'iron_hoe', 'diamond_shovel', 'netherite_hoe', 'diamond_hoe', 'netherite_pickaxe', 'stone_pickaxe', 'golden_hoe', 'netherite_axe', 'wooden_pickaxe', 'iron_axe', 'golden_shovel', 'iron_pickaxe', 'stone_hoe', 'shears', 'wooden_hoe', 'wooden_axe', 'stone_axe', 'golden_axe'],
    "enchantable/mining_loot" : ['diamond_axe', 'golden_pickaxe', 'wooden_shovel', 'netherite_shovel', 'iron_shovel', 'diamond_pickaxe', 'stone_shovel', 'iron_hoe', 'diamond_shovel', 'netherite_hoe', 'diamond_hoe', 'netherite_pickaxe', 'stone_pickaxe', 'golden_hoe', 'netherite_axe', 'wooden_pickaxe', 'iron_axe', 'golden_shovel', 'iron_pickaxe', 'stone_hoe', 'wooden_hoe', 'wooden_axe', 'stone_axe', 'golden_axe'],
    "enchantable/sharp_weapon" : ['netherite_sword', 'netherite_axe', 'diamond_axe', 'wooden_sword', 'wooden_axe', 'diamond_sword', 'iron_sword', 'stone_axe', 'iron_axe', 'golden_axe', 'golden_sword', 'stone_sword'],
    "enchantable/sword" : ['netherite_sword', 'wooden_sword', 'diamond_sword', 'iron_sword', 'golden_sword', 'stone_sword'],
    "enchantable/trident" : ['trident'],
    "enchantable/vanishing" : ['dragon_head', 'golden_chestplate', 'diamond_axe', 'golden_pickaxe', 'wooden_shovel', 'warped_fungus_on_a_stick', 'bow', 'iron_boots', 'golden_boots', 'netherite_shovel', 'mace', 'leather_boots', 'piglin_head', 'leather_leggings', 'iron_shovel', 'diamond_helmet', 'chainmail_leggings', 'flint_and_steel', 'diamond_leggings', 'diamond_pickaxe', 'stone_shovel', 'golden_sword', 'iron_hoe', 'stone_sword', 'diamond_shovel', 'shield', 'elytra', 'chainmail_boots', 'netherite_boots', 'wooden_sword', 'leather_helmet', 'netherite_hoe', 'diamond_hoe', 'netherite_pickaxe', 'stone_pickaxe', 'wither_skeleton_skull', 'golden_hoe', 'zombie_head', 'skeleton_skull', 'fishing_rod', 'compass', 'leather_chestplate', 'golden_helmet', 'turtle_helmet', 'netherite_axe', 'wooden_pickaxe', 'iron_helmet', 'diamond_sword', 'iron_axe', 'carrot_on_a_stick', 'crossbow', 'golden_shovel', 'netherite_chestplate', 'iron_pickaxe', 'netherite_helmet', 'iron_leggings', 'diamond_boots', 'stone_hoe', 'player_head', 'shears', 'carved_pumpkin', 'netherite_sword', 'wooden_hoe', 'golden_axe', 'wooden_axe', 'iron_chestplate', 'netherite_leggings', 'iron_sword', 'chainmail_helmet', 'stone_axe', 'brush', 'diamond_chestplate', 'creeper_head', 'golden_leggings', 'trident', 'chainmail_chestplate'],
    "enchantable/weapon" : ['netherite_sword', 'netherite_axe', 'diamond_axe', 'wooden_sword', 'wooden_axe', 'diamond_sword', 'iron_sword', 'stone_axe', 'mace', 'iron_axe', 'golden_axe', 'golden_sword', 'stone_sword'],
}

const Enchantments = {
    "aqua_affinity": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/head_armor",
    },
    "bane_of_arthropods": {
        "max": 5,
        "primary_items": "#minecraft:enchantable/sword",
        "supported_items": "#minecraft:enchantable/weapon",
    },
    "binding_curse": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/equippable",
    },
    "blast_protection": {
        "max": 4,
        "supported_items": "#minecraft:enchantable/armor",
    },
    "breach": {
        "max": 4,
        "supported_items": "#minecraft:enchantable/mace",
    },
    "channeling": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/trident",
    },
    "density": {
        "max": 5,
        "supported_items": "#minecraft:enchantable/mace",
    },
    "depth_strider": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/foot_armor",
    },
    "efficiency": {
        "max": 5,
        "supported_items": "#minecraft:enchantable/mining",
    },
    "feather_falling": {
        "max": 4,
        "supported_items": "#minecraft:enchantable/foot_armor",
    },
    "fire_aspect": {
        "max": 2,
        "primary_items": "#minecraft:enchantable/sword",
        "supported_items": "#minecraft:enchantable/fire_aspect",
    },
    "fire_protection": {
        "max": 4,
        "supported_items": "#minecraft:enchantable/armor",
    },
    "flame": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/bow",
    },
    "fortune": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/mining_loot",
    },
    "frost_walker": {
        "max": 2,
        "supported_items": "#minecraft:enchantable/foot_armor",
    },
    "impaling": {
        "max": 5,
        "supported_items": "#minecraft:enchantable/trident",
    },
    "infinity": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/bow",
    },
    "knockback": {
        "max": 2,
        "supported_items": "#minecraft:enchantable/sword",
    },
    "looting": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/sword",
    },
    "loyalty": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/trident",
    },
    "luck_of_the_sea": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/fishing",
    },
    "lure": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/fishing",
    },
    "mending": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/durability",
    },
    "multishot": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/crossbow",
    },
    "piercing": {
        "max": 4,
        "supported_items": "#minecraft:enchantable/crossbow",
    },
    "power": {
        "max": 5,
        "supported_items": "#minecraft:enchantable/bow",
    },
    "projectile_protection": {
        "max": 4,
        "supported_items": "#minecraft:enchantable/armor",
    },
    "protection": {
        "max": 4,
        "supported_items": "#minecraft:enchantable/armor",
    },
    "punch": {
        "max": 2,
        "supported_items": "#minecraft:enchantable/bow",
    },
    "quick_charge": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/crossbow",
    },
    "respiration": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/head_armor",
    },
    "riptide": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/trident",
    },
    "sharpness": {
        "max": 5,
        "primary_items": "#minecraft:enchantable/sword",
        "supported_items": "#minecraft:enchantable/sharp_weapon",
    },
    "silk_touch": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/mining_loot",
    },
    "smite": {
        "max": 5,
        "primary_items": "#minecraft:enchantable/sword",
        "supported_items": "#minecraft:enchantable/weapon",
    },
    "soul_speed": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/foot_armor",
    },
    "sweeping_edge": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/sword",
    },
    "swift_sneak": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/leg_armor",
    },
    "thorns": {
        "max": 3,
        "primary_items": "#minecraft:enchantable/chest_armor",
        "supported_items": "#minecraft:enchantable/armor",
    },
    "unbreaking": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/durability",
    },
    "vanishing_curse": {
        "max": 1,
        "supported_items": "#minecraft:enchantable/vanishing",
    },
    "wind_burst": {
        "max": 3,
        "supported_items": "#minecraft:enchantable/mace",
    },
}

const attributeUuids = {
    MAINHAND: { id: "[I;12,42069,0,10]", slot: "mainhand" },
    OFFHAND: { id: "[I;12,42069,0,11]", slot: "offhand" },
    HEAD: { id: "[I;12,42069,0,12]", slot: "head" },
    CHEST: { id: "[I;12,42069,0,13]", slot: "chest" },
    LEGS: { id: "[I;12,42069,0,14]", slot: "legs" },
    FEET: { id: "[I;12,42069,0,15]", slot: "feet" }
};

const Types = {
    0  : "",
    1  : "Helmet",
    2  : "Chestplate",
    3  : "Leggings",
    4  : "Boots",
    10  : "Melee",
    20  : "Ranged",
    30  : "Mining",
    40  : "Foraging",
    50  : "Materials",
    //100  : "Fishing",
};

const Activations = [
    {"name":"Full Set", "display":"Full Set", "id":1},
    {"name":"Passive" ,"display":"Passive", "id":2},
    {"name":"Right-click" ,"display":"Right-click", "id":3},
    {"name":"Right-click Shift" ,"display":"Shift-click", "id":4},
    {"name":"Right-click Hold" ,"display":"Right-click", "id":5},
    {"name":"Sneak" ,"display":"Sneak", "id":6},
    {"name":"Sneak Double" ,"display":"Double Sneak", "id":7},
    {"name":"Kill" ,"display":"Kill", "id":8},
    {"name":"Shoot" ,"display":"Shoot", "id":9},
    {"name":"Throw" ,"display":"Throw", "id":9},
    {"name":"Hit" ,"display":"Hit", "id":10},
];

const JSONColor = {
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    '0': 'black',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white'
};

const colors = [
    'dark_blue',
    'dark_green',
    'dark_aqua',
    'dark_red',
    'dark_purple',
    'gold',
    'gray',
    'dark_gray',
    'blue',
    'black',
    'green',
    'aqua',
    'red',
    'light_purple',
    'yellow',
    'white'
];

const itemComponents = [
    {"component": "minecraft:custom_data", "type": "string_obj", "input_placeholder": "{Foo:'Bar', Food:{Today:'Apples', Tomorrow:'Bananas'}}"},
    //{"component": "minecraft:enchantment_glint_override", "type": "bool"},
    //{"component": "minecraft:enchantments", "type": "string_obj", "input_placeholder": "{'levels':{'minecraft:unbreaking': 3, 'minecraft:fortune': 3}}"}
]