function Tetris() {
    // Private properties
    let score = 0;
    let state = GAME_STATES.PAUSED;
    let gameIsOver = false;
    let deletingRows = false;
    const playground = PlaygroundFactory.getInstance();
    let gameInterval = null;
    this.allCells = [];
    let newFigure = new Figure(this.allCells);

    // Private methods
    const getCurrentFigure = function* (context) {
        while (true) {
            if (newFigure.state !== FIGURE_STATES.FALLING) {
                newFigure = new Figure(context.allCells);
                if (!newFigure.validFor(KEY_EVENTS.DOWN)) {
                    gameIsOver = true;
                }
            }
            yield newFigure;
        }
    };

    const handleEvents = (keyCode, shiftPressed) => {
        if (Object.values(KEY_EVENTS).includes(keyCode)) {
            if (keyCode === KEY_EVENTS.PAUSE) {
                if (state === GAME_STATES.GAME_OVER) {
                    this.allCells.forEach(cell => cell.render(true));
                    this.allCells.length = 0;
                    score = 0;
                    gameIsOver = false;
                }
                state = state === GAME_STATES.PLAYING ? GAME_STATES.PAUSED : GAME_STATES.PLAYING;
            } else if (state === GAME_STATES.PLAYING && !deletingRows) {
                keyCode === KEY_EVENTS.DOWN && shiftPressed ? getCurrentFigure(this).next().value.drop()
                    : getCurrentFigure(this).next().value.move(keyCode);
            }
        }
    };

    const destroyLine = () => {
        let deletedCount = 0;
        let y = 0;
        while (y < PLAYGROUND.HEIGHT) {
            let rowCells = this.allCells.filter(cell => cell.y === y);
            if (rowCells.length === PLAYGROUND.WIDTH) {
                deletingRows = true;
                rowCells.forEach(cell => cell.render(true));
                helperMethods.filterInPlace(this.allCells, cell => cell.y !== y);
                deletedCount++;
                for (let i = y+1; i < PLAYGROUND.HEIGHT; i++) {
                    this.allCells.filter(cell => cell.y === i)
                        .forEach(cell => {
                            cell.render(true);
                            cell.y--;
                            cell.render();
                        });
                }
                y--;
            }
            y++;
        }
        score += deletedCount ** 2;
    };

    const checkForGameOver = () => {
        if (gameIsOver) {
            state = GAME_STATES.GAME_OVER;
            alert(`The game is over!\nYour score is: ${score}!\nPress 'Escape' to start a new game!`);
        }
    };

    const gameIteration = () => {
        if (state === GAME_STATES.PLAYING && !deletingRows) {
            destroyLine();
            if (!deletingRows) {
                getCurrentFigure(this).next().value.move(KEY_EVENTS.DOWN);
                checkForGameOver();
            } else {
                deletingRows = false;
            }
        }
    };

    // Public methods
    this.play = () => {
        alert("Press 'Escape' to start a new game!\n" +
            "Controls:\nleft and right arrows: move pieces accordingly\nspace: rotate the piece clockwise\n" +
            "down arrow: speed up placement\nshift+down arrow: place instantly");
        playground.render();
        document.addEventListener('keydown', (event) =>  handleEvents(event.key, event.shiftKey));

        gameInterval = setInterval(gameIteration, INTERVAL);
    };
}

const tetris = new Tetris();
tetris.play()
