// we don't want to have multiple playgounds instances
// singleton patterns ensures that at a given time, we have only
// one instance

// Responsibilities
// Define playground table
// Render playground table to DOM

const PlaygroundFactory = (function () {
    // private properties
    const PLAYGROUND_NODE = document.getElementById(PLAYGROUND.NODE_ID);
    let playground;

    // private constructor
    function PlaygroundSingleton() {
        this.box = new Array(PLAYGROUND.HEIGHT).fill().map(() => new Array(PLAYGROUND.WIDTH).fill());

        this.render = () => {
            if (PLAYGROUND_NODE.childNodes.length !== 0) { return }

            for (let rowIndex = this.box.length - 1; rowIndex >= 0; rowIndex--) {
                let rowNode = helperMethods.createRow(rowIndex);
                for (let cellIndex = 0; cellIndex < this.box[rowIndex].length; cellIndex++) {
                    rowNode.appendChild(helperMethods.createCell(cellIndex, rowIndex));
                }
                PLAYGROUND_NODE.appendChild(rowNode);
            }
        };
    }

    return {
        getInstance() {
            if (!playground) {
                playground = new PlaygroundSingleton();
                // Hide the constructor so the returned object can't be new'd...
                playground.constructor = null;
            }
            return playground;
        }
    };
})();
