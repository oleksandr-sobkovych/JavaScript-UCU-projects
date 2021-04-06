const pentagonalNumber = n => {
    if (!Number.isSafeInteger(n)) {
        throw TypeError('parameter should be an integer');
    }
    if (n < 1) {
        throw RangeError('parameter should be greater than or equal to 1');
    }
    return (3 * n ** 2 - n) / 2;
};
