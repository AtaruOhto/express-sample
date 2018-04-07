export const isNameValid = (value: string) => {
    if (value.length <= 2 || 21 <= value.length) {
        const errorMsg = ' User name must be between 2 and 20';
        throw new Error(errorMsg);
    }
};
