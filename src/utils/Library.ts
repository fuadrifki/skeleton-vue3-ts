export const NumberOnly = (value: string) => {
    return value.replace(/[^0-9]+/g, "");
}