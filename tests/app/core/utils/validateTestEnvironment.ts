export const validateTestEnvironment = (): boolean => {
    if (!process.env.BASE_URL) {
        console.error('Provide "BASE_URL" env variable to run the tests');

        return false;
    }

    return true;
};
