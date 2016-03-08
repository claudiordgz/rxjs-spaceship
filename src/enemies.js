/*globals document, window */
/* jshint node: true */
let Rx = require('rx'),
    u = require('./util.js');

let createEnemy = (board) => ({
    x: parseInt(Math.random() * board.canvas.width),
    y: -30
});

let enemies = (board) => {
    let ENEMY_FREQ = 1500;
    return Rx.Observable.interval(ENEMY_FREQ)
        .scan((enemyArray)=> {
            enemyArray.push(createEnemy(board));
            return enemyArray;
        }, []);
};

let getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let paintEnemies = (board, enemies) => {
    enemies.forEach((enemy) => {
        enemy.y += 5;
        enemy.x += getRandomInt(-15, 15);

        u.drawTriangle(board, enemy.x, enemy.y, 20, '#00ff00', 'down');
    });
};

module.exports = {
    enemies: enemies,
    paintEnemies: paintEnemies
};