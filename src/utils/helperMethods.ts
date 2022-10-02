const isNullOrEmpty = (input: any) => {
    return (
        input === null ||
        input === "null" ||
        typeof input === "undefined" ||
        input === "" ||
        input === " " ||
        input.length === 0 ||
        input === "null null" ||
        input === "undefined undefined"
    );
};

const convertNullValuesToEmptyString = (formData: { [key: string]: any }) => {
    for (let keys in formData) {
        if (isNullOrEmpty(formData[keys])) {
            formData[keys] = ""
        }
    }
    return formData;
}
export {
    isNullOrEmpty,
    convertNullValuesToEmptyString
}