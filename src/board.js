/*globals document, window */
/* jshint node: true */

let drawBoard = () => {
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d"),
        style = canvas.style;
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 4;
    style.marginLeft = "auto";
    style.marginRight = "auto";
    let parentStyle = canvas.parentElement.style;
    parentStyle.textAlign = "center";
    parentStyle.width = "100%";
    return {
        canvas: canvas,
        ctx: ctx
    };
};

module.exports = {
    drawBoard: drawBoard
};