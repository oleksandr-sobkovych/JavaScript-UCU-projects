// all helper methods will be isolated into a namespace helperMethods
// this is not the only way to create a namespace in JS
// much better solution is to use JS modules.
// however, here I aimed for a simple solution to solve the issue and not
// to introduce a new JS topic, i.e. modules

const helperMethods = {};

// DOM helpers
helperMethods.getCellId = (x, y) =>
    `cell-${x}-${y}`;

helperMethods.getRow = (y) =>
    document.getElementById(`row-${y}`);

helperMethods.getCell = (x, y) =>
    document.getElementById(helperMethods.getCellId(x, y));

helperMethods.styleCell = (x, y, color) => {
    const cellNode = helperMethods.getCell(x, y);
    cellNode && cellNode.setAttribute('class', `cell ${color}`);
};

helperMethods.createRow = (y) => {
    let rowNode = document.createElement('div');
    rowNode.setAttribute('id', `row-${y}`)
    rowNode.setAttribute('class', 'row')

    return rowNode;
};

helperMethods.createCell = (x, y) => {
    let cellNode = document.createElement('div');
    cellNode.setAttribute('class', 'cell');
    cellNode.setAttribute('id', helperMethods.getCellId(x, y));

    return cellNode;
};

// ID helpers
helperMethods.idMaker = function* () {
    let index = 1;
    while (true)
        yield index++;
};

helperMethods.filterInPlace = (a, condition, thisArg) => {
    let j = 0;

    a.forEach((e, i) => {
        if (condition.call(thisArg, e, i, a)) {
            if (i!==j) a[j] = e;
            j++;
        }
    });

    a.length = j;
    return a;
};
