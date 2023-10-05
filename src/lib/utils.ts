export const shuffleArray = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());
export const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const assert = <T>(value: T, message?: string): NonNullable<T> => {
    if (!value) {
        throw new Error("Assert failed: " + message);
    }

    return value;
}