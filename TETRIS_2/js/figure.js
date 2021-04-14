// falling - new figure is put on the playground
// static - figure stopped moving. This happens when there are obstacles for any cells bellow
function Figure(obstacles, state = FIGURE_STATES.FALLING) {
    // Private properties
    let shapeID = Math.floor(Math.random() * INITIAL_POSITIONS.length);

    // Public properties
    this.cells = [];
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.state = state;

    // Private methods
    const render = (deRender = false) => {
        this.cells.forEach(cell => cell.render(deRender));
    };

    // Public methods
    this.move = (direction) => {
        if (this.validFor(direction)) {
            render(true);
            this.cells.forEach(cell => cell.move(direction));
            render();
        } else if (direction === KEY_EVENTS.DOWN) {
            this.state = FIGURE_STATES.STATIC;
            this.cells.forEach(cell => obstacles.push(cell));
        }
    };

    this.drop = () => {
        render(true);
        while (this.validFor(KEY_EVENTS.DOWN)) {
            this.cells.forEach(cell => cell.move(KEY_EVENTS.DOWN));
        }
        render();
        this.state = FIGURE_STATES.STATIC;
        this.cells.forEach(cell => obstacles.push(cell));
    };

    this.validFor = (direction) =>
        this.cells.every(cell => cell.validFor(direction));

    // initialise figure cells
    const addCell = (x, y) =>
        this.cells.push(new Cell(x, y, this.color, obstacles));

    const generateCoordinates = () =>
        INITIAL_POSITIONS[shapeID];

    generateCoordinates().forEach(([y, x]) =>
        addCell(x, y));

    this.cells.forEach(cell => cell.attachPivot(this.cells[PIVOT_CELLS[shapeID]]));

    for (let i = 0; i < Math.floor(Math.random()*4); i++) {
        this.move(KEY_EVENTS.ROTATE);
    }
}
