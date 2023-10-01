export const shuffleArray = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());
export const randRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
