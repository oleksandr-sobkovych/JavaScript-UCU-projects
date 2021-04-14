// Playground
const PLAYGROUND = {
    HEIGHT: 15,
    WIDTH: 7,
    NODE_ID: 'playground'
};

// colors
const COLORS = ['red', 'purple', 'green', 'yellow', 'blue'];
const DEFAULT_COLOR = 'white';

// figures and cells states
const FIGURE_STATES = {
    FALLING: 'FALLING',
    STATIC: 'STATIC'
};

// default positions for objects
const INITIAL_POSITIONS = [
    [[PLAYGROUND.HEIGHT + 1, 1], [PLAYGROUND.HEIGHT, 1], [PLAYGROUND.HEIGHT, 2], [PLAYGROUND.HEIGHT, 3]],
    [[PLAYGROUND.HEIGHT, 1], [PLAYGROUND.HEIGHT + 1, 1], [PLAYGROUND.HEIGHT + 1, 2], [PLAYGROUND.HEIGHT + 1, 3]],
    [[PLAYGROUND.HEIGHT + 2, 3], [PLAYGROUND.HEIGHT + 1, 3], [PLAYGROUND.HEIGHT, 3]],
    [[PLAYGROUND.HEIGHT + 1, 2], [PLAYGROUND.HEIGHT + 1, 4], [PLAYGROUND.HEIGHT + 1, 3], [PLAYGROUND.HEIGHT, 3]],
];
const PIVOT_CELLS = [2, 2, 1, 2];

// key ids for keydown events
const KEY_EVENTS = {
    DOWN: 'ArrowDown',
    RIGHT: 'ArrowRight',
    LEFT: 'ArrowLeft',
    ROTATE: ' ',
    PAUSE: 'Escape'
};

// Game constants
const INTERVAL = 500;
const GAME_STATES = {
    PAUSED: 'PAUSED',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER'
};
