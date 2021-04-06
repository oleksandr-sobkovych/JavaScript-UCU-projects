const toArr = (objToConvert) => {
    try {
        return Object.entries(objToConvert);
    } catch (e) {
        console.error(`Potential problem in toArr(): ${e.name}: ${e.message}`);
        return [];
    }
};
