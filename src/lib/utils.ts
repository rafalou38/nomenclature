export const shuffleArray = <T>(arr: T[]): T[] => {
    const arrClone = structuredClone(arr);
    for (let i = arrClone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrClone[i], arrClone[j]] = [arrClone[j], arrClone[i]];
    }
    return arrClone;
}
export const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const assert = <T>(value: T, message?: string): NonNullable<T> => {
    if (!value) {
        throw new Error("Assert failed: " + message);
    }

    return value;
}

const simplifications = new Map([["é", "e"], ["è", "e"], ["ï", "i"], ["-", ""], ["e", ""], [" ", ""]]);
console.log(simplifications);

export const simplify = (str: string) => str.toLowerCase().split("").map(c => simplifications.has(c) ? simplifications.get(c) : c).join("");