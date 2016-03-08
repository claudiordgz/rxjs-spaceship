/*globals document, window */
/* jshint node: true */
let Rx = require('rx');

let createStar = (board) => ({
    x: parseInt(Math.random() * board.canvas.width),
    y: parseInt(Math.random() * board.canvas.height),
    size: Math.random() * 3 + 1
});

let moveStars = (speed, starArray, board) => {
    return Rx.Observable.interval(speed).map(() => {
        starArray.forEach((star) => {
            if(star.y >= board.canvas.height) {
                star.y = 0;
            }
            star.y += 3;
        });
        return starArray;
    });
};

let starField = (board, speed) => {
    let STAR_NUMBER = 250;
    return Rx.Observable.range(1, STAR_NUMBER)
        .map(() => createStar(board))
        .toArray()
        .flatMap((starArray) => moveStars(speed, starArray, board));
};

let paintStars = (board, stars) => {
    board.ctx.fillStyle = '#000000';
    board.ctx.fillRect(0, 0, board.canvas.width, board.canvas.height);
    board.ctx.fillStyle = '#ffffff';
    stars.forEach((star) => {
        board.ctx.fillRect(star.x, star.y, star.size, star.size);
    })
};

module.exports = {
    paintStars: paintStars,
    starField: starField
};