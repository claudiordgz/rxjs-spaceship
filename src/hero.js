/* jshint node: true */
let Rx = require('rx'),
    u = require('./util.js');

let paintSpaceShip = (board, x, y) => {
    u.drawTriangle(board, x, y, 20, '#ff0000', 'up');
};

let spaceShip = (board) => {
    let HERO_Y = board.canvas.height - 30;
    return  Rx.Observable.fromEvent(board.canvas, 'mousemove')
        .map((event) => ({
            x: event.clientX,
            y: HERO_Y
        }))
        .startWith({
            x: board.canvas.width / 2,
            y: HERO_Y
        });
};

module.exports = {
    paintSpaceShip: paintSpaceShip,
    spaceShip: spaceShip
};