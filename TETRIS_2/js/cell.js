// x, y - direction
// color - the given color on create
// figureID - defines the relation on one figure
// state - will be used in the situation when distruction of cell(s) will free up space for figure movement
function Cell(x, y, color, obstacles) {
    // Public properties
    this.x = x;
    this.y = y;
    this.color = color;

    // Private properties
    let pivotCell;

    // Private methods
    const getRotatedCoords = () => [this.y + pivotCell.x - pivotCell.y, -this.x + pivotCell.x + pivotCell.y];

    const moveDirections = {
        [KEY_EVENTS.DOWN]: () => this.y--,
        [KEY_EVENTS.RIGHT]: () => this.x++,
        [KEY_EVENTS.LEFT]: () => this.x--,
        [KEY_EVENTS.ROTATE]: () => {
            [this.x, this.y] = getRotatedCoords();
        }
    };

    const checkBordersFor = {
        [KEY_EVENTS.DOWN]: () => this.y < 1,
        [KEY_EVENTS.RIGHT]: () => this.x > PLAYGROUND.WIDTH - 2,
        [KEY_EVENTS.LEFT]: () => this.x < 1,
        [KEY_EVENTS.ROTATE]: () => {
            let [x, y] = getRotatedCoords();
            return y < 0 || x < 0 || x > PLAYGROUND.WIDTH - 1;
        }
    };

    const hasObstaclesFor = (direction) => {
        const directions = {
            [KEY_EVENTS.DOWN]:  { x: this.x,     y: this.y - 1 },
            [KEY_EVENTS.RIGHT]: { x: this.x + 1, y: this.y },
            [KEY_EVENTS.LEFT]:  { x: this.x - 1, y: this.y },
            [KEY_EVENTS.ROTATE]: {x: getRotatedCoords()[0], y: getRotatedCoords()[1]}
        };
        const {x, y} = directions[direction];

        return obstacles ? obstacles.some(cell => cell.x === x && cell.y === y) : false;
    }

    const willReachBorders = (direction) => {
        return checkBordersFor[direction]();
    }

    // Public methods
    // only one is accepted
    this.attachPivot = (pivot) => {
        if (!pivotCell) {
            pivotCell = pivot;
        }
    }

    this.validFor = (direction) =>
        !hasObstaclesFor(direction) && !willReachBorders(direction);

    this.render = (deRender = false) =>
        helperMethods.styleCell(this.x, this.y, (deRender ? DEFAULT_COLOR : this.color));

    this.move = (direction) => {
        moveDirections[direction]();
    };
}
