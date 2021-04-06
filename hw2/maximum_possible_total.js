function getSubarraySumGenerator(subarrayLength, array) {
    return function* () {
        let currSum = 0;
        for (let i = 0; i < subarrayLength; i++) {
            currSum += array[i];
        }
        yield currSum;

        for (let i = subarrayLength; i < array.length; i++) {
            currSum += array[i] - array[i-subarrayLength];
            yield currSum;
        }
    }
}



function maxTotal(array) {
    if (!(Array.isArray(array) && array.every(element => Number.isSafeInteger(element)))) {
        throw TypeError('parameter is not an array of integers');
    }
    if (array.length !== 10) {
        throw RangeError('parameter array is not of length 10');
    }
    try {
        let sumGenerator = getSubarraySumGenerator(5, array);
        return Math.max(...sumGenerator());
    } catch (e) {
        console.error(`Potential problem in maxTotal(): ${e.name}: ${e.message}`);
        return 0;
    }
}
