function checkIfNumber(value: unknown): boolean {
    if (typeof value === "number") return !isNaN(value);
    if (typeof value === "string") return !isNaN(Number(value));
    return false;
}

export { checkIfNumber };
