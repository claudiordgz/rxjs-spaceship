/*globals document, window */
/* jshint node: true */
let Rx = require('rx'),
    u = require('./util.js');

let playerFiring = (board) => {
    return Rx.Observable
        .merge(
            Rx.Observable.fromEvent(board.canvas, 'click'),
            Rx.Observable.fromEvent(board.canvas, 'keydown')
                .filter(event => (event.key || event.which) === 32 )
        )
        .sample(200)
        .timestamp();
};

let HeroShots = (board, spaceShip) => {
    let player = playerFiring(board);
    let HERO_Y = board.canvas.height - 30;
    return Rx.Observable
        .combineLatest(
            player,
            spaceShip,
            (shotEvents, spaceShip) => ({
                x: spaceShip.x,
                timestamp: shotEvents.timestamp
            })
        )
        .distinctUntilChanged((shot) => shot.timestamp)
        .scan((shotArray, shot) => {
            shotArray.push({
                x: shot.x,
                y: HERO_Y
            });
            return shotArray;
        }, []);
};

let paintHeroShots = (board, heroShots) => {
    let SHOOTING_SPEED = 15;
    heroShots.forEach(shot => {
        shot.y -= SHOOTING_SPEED;
        u.drawTriangle(board, shot.x, shot.y, 5, '#ffff00', 'up');
    });
};

module.exports = {
    HeroShots: HeroShots,
    paintHeroShots: paintHeroShots
};