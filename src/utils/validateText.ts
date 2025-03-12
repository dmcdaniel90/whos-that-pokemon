export const validateText = (text: string | undefined): string => {
    const regex = /^[A-Za-z-]+$/;

    if (text === undefined || regex.test(text) === false) {
        throw new Error('Please enter a valid answer')
    }

    return text
};