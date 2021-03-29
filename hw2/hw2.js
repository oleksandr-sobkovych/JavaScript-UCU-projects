function tuckIn(arr1, arr2) {
    if (!(Array.isArray(arr1) && Array.isArray(arr2))) {
        throw new TypeError("at least one of the arguments is not an array");
    }
    if (arr1.length !== 2) {
        throw new RangeError("outer array is not of length 2");
    }
    let tuckedIn = [];
    tuckedIn.push(arr1[0]);
    for (const arr2Key of arr2) {
        tuckedIn.push(arr2Key);
    }
    tuckedIn.push(arr1[1]);
    return tuckedIn;
}


try {
    console.log(tuckIn([1, 10], [2, 3, 4, 5, 6, 7, 8, 9]));
    console.log(tuckIn([15,150], [45, 75, 35]));
    console.log(tuckIn([[1, 2], [5, 6]], [[3, 4]]));
    console.log(tuckIn([[5, 6]], [[3, 4]]));
}
catch (e) {
    console.log(`tuckIn: successfully caught ${e}`);
}


function minMax(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("the argument is not an array");
    }
    if (arr.length < 1) {
        throw new RangeError("max and min undefined on empty array");
    }
    let min = arr[0], max = arr[0];
    for (const arrKey of arr) {
        min = arrKey < min ? arrKey : min;
        max = arrKey > max ? arrKey : max;
    }
    return [min, max];
}


try{
    console.log(minMax([1, 2, 3, 4, 5]));
    console.log(minMax([2334454, 5]));
    console.log(minMax([1]));
    console.log(minMax(new Set([1])));
}
catch (e) {
    console.log(`minMax: successfully caught ${e}`);
}


function canNest(arr1, arr2) {
    if (!(Array.isArray(arr1) && Array.isArray(arr2))) {
        throw new TypeError("at least one of the arguments is not an array");
    }
    let arr1MinMax = minMax(arr1);
    let arr2MinMax = minMax(arr2);
    return arr1MinMax[0] > arr2MinMax[0] && arr1MinMax[1] < arr2MinMax[1];
}


try {
    console.log(canNest([1, 2, 3, 4], [0, 6]));
    console.log(canNest([3, 1], [4, 0]));
    console.log(canNest([9, 9, 8], [8, 9]));
    console.log(canNest([1, 2, 3, 4], [2, 3]));
    console.log(canNest([1], []));
}
catch (e) {
    console.log(`canNest: successfully caught ${e}`);
}
