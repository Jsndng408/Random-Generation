
export default function reducer(state, action) {
    switch (action.type) {
        case 'CLEAR_CHARACTERS':
            return {
                ...state,
                characters: []
            };
        case 'ADD':
            let tempCharacters = state.characters;
            tempCharacters.push(action.payload);

            return {
                ...state,
                characters: tempCharacters
            };
        case 'REMOVE':
            return {
                ...state,
                characters: state.characters.filter((item) => item.id !== action.payload),
            };
        case 'INCREASE':
            tempCharacters = state.characters.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        weight: item.weight + 1
                    }
                }
                return item;
            });

            return {
                ...state,
                characters: tempCharacters
            };
        case 'DECREASE':
            tempCharacters = state.characters.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        weight: item.weight - 1
                    }
                }
                return item;
            }).filter((item) => item.weight > 0);

            return {
                ...state,
                characters: tempCharacters
            };
        case 'GET_TOTALS':
            let { total, amount } = state.characters.reduce(
                (totalWeight, item) => {
                    const { weight } = item;
                    totalWeight.total += weight;
                    totalWeight.amount += 1;
                    return totalWeight;
                }, {
                total: 0,
                amount: 0
            }
            );

            return {
                ...state,
                total,
                amount
            };
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'DISPLAY_ITEMS':
            return {
                ...state,
                characters: action.payload,
                loading: false
            }
        case 'TOGGLE_AMOUNT':
            let temp = state.characters.map((item) => {
                if (item.id === action.payload.id) {
                    if (action.payload.type === 'inc') {
                        return {
                            ...item,
                            weight: item.weight + 1
                        }
                    } else if (action.payload.type === 'dec') {
                        return {
                            ...item,
                            weight: item.weight - 1
                        }
                    }
                }
                return item;
            }).filter((item) => item.weight > 0);

            return {
                ...state,
                characters: temp
            };
        default:
            throw new Error("No matching action type");
    }
}