
function getWeight(item) {
    return item[1];
}

function sum(prev, next) {
    return prev + next;
}

export const gachaData = [
    ['Ivysaur', 10],
    ['Charizard', 3],
    ['Squirtle', 20],
    ['Rattata', 40],
    ['Pikachu', 10],
    ['Magmar', 10],
    ['Gyarados', 3],
    ['Lapras', 3],
    ['Mewtwo', 0.5],
    ['Mew', 0.5]
];

export const totalWeight = gachaData.map(getWeight).reduce(sum);