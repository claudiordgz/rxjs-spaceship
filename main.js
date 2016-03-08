/*globals document, window */
/* jshint node: true */
let Rx = require('rx'),
    board = require('./src/board.js'),
    background = require('./src/background.js'),
    hero = require('./src/hero.js'),
    enemy = require('./src/enemies.js'),
    actions = require('./src/actions.js');

let renderScene = (actors) => {
    background.paintStars(actors.board, actors.stars);
    hero.paintSpaceShip(actors.board, actors.spaceship.x, actors.spaceship.y);
    enemy.paintEnemies(actors.board, actors.enemies);
    actions.paintHeroShots(actors.board, actors.heroShots);
};


document.addEventListener("DOMContentLoaded", (event) => {
    let SPEED = 60,
        canvasObject = board.drawBoard(),
        StarStream = background.starField(canvasObject, SPEED),
        SpaceShip = hero.spaceShip(canvasObject),
        Enemy = enemy.enemies(canvasObject),
        HeroShots = actions.HeroShots(canvasObject, SpaceShip);
    let Game = Rx.Observable
        .combineLatest(StarStream, SpaceShip, Enemy, HeroShots, (stars, spaceship, enemies, heroShots) => ({
            stars: stars,
            spaceship: spaceship,
            board: canvasObject,
            enemies: enemies,
            heroShots, heroShots
        }))
        .sample(SPEED);
    Game.subscribe(renderScene);
});