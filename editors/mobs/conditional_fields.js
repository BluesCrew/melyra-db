const conditions = [
    {'id': 'textureVariantBox', 'condition': {'type': 'input_matches', 'input_id': 'minecraftId', 'value_predicate': {'predicate_type': 'contains', 'value': ['cat', 'dog']}}},
    {'id': 'fishSizeBox', 'condition': {'type': 'input_matches', 'input_id': 'minecraftId', 'value_predicate': {'predicate_type': 'exact', 'value': 'tropical_fish'}}},
    {'id': 'fishPatternBox', 'condition': {'type': 'input_matches', 'input_id': 'minecraftId', 'value_predicate': {'predicate_type': 'exact', 'value': 'tropical_fish'}}},
    {'id': 'fishBaseColorBox', 'condition': {'type': 'input_matches', 'input_id': 'minecraftId', 'value_predicate': {'predicate_type': 'exact', 'value': 'tropical_fish'}}},
    {'id': 'fishPatternColorBox', 'condition': {'type': 'input_matches', 'input_id': 'minecraftId', 'value_predicate': {'predicate_type': 'exact', 'value': 'tropical_fish'}}}
]


function run_matches() {
    for (const conditional of conditions) {

        const affectedNode = document.getElementById(conditional['id']);
        affectedNode.classList.add("hide");

        const condition = conditional['condition']
    
        switch (condition['type']) {
            case 'input_matches':
                const inputToMatch = document.getElementById(condition['input_id'])
                predicate = condition['value_predicate'];

                if (predicate_matches(predicate, inputToMatch.value)) {
                    affectedNode.classList.remove("hide");
                }
    
                break;
        }
    }
}

function predicate_matches(predicate, value1) {
    const value2 = predicate['value'];
    switch(predicate['predicate_type']) {
        case 'contains':
            if (typeof value1 == "string") {
                if (value1 == "") {
                    return false;
                }
                if (typeof value2 == "string"){         // single value
                    return value1.includes(value2);
                }else if(typeof value2 == "object"){    // array
                    for (option of value2){
                        if (value1.includes(option)) return true;
                    }
                    return false;
                }
            }
            else if (Array.isArray(value2)) {
                return value2 in value1;
            }
            else {
                return false;
            }
        case 'exact':
            return value2 === value1;
        case 'inverse':
            return !predicate_matches(predicate['term'], value1)
    }
}