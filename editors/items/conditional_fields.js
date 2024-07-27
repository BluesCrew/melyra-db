const conditions = [
    {'id': 'leatherColor', 'condition': {'type': 'input_matches', 'input_id': 'minecraftId', 'value_predicate': {'predicate_type': 'contains', 'value': 'leather_'}}},
    {'id': 'statItemData', 'condition': {'type': 'input_matches', 'input_id': 'typeSelect', 'value_predicate': {'predicate_type': 'inverse', 'term': {'predicate_type': 'exact', 'value': 'Material'}}}}
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
            if (typeof value1 == "string" && typeof value2 == "string") {
                if (value1 == "") {
                    return false;
                }
                return value1.includes(value2);
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