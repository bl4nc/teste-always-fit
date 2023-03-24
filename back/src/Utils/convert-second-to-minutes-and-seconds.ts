export function convertSecondToMinutesAndSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const second = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(second).padStart(2, "0")}`
}