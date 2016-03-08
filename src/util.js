/*globals document, window */
/* jshint node: true */

let drawTriangle = (board, x, y, width, color, direction) => {
    board.ctx.fillStyle = color;
    board.ctx.beginPath();
    board.ctx.moveTo(x - width, y);
    board.ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    board.ctx.lineTo(x + width, y);
    board.ctx.lineTo(x - width, y);
    board.ctx.fill();
};

module.exports = {
    drawTriangle: drawTriangle
};