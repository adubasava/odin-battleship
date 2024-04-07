import Gameboard from './gameboard';

export default class Player {
    constructor(user) {
        this.user = user;
        this.turn = false;
        this.moves = [];
    }

    takeTurn() {
        this.turn = true;
    }

    playAuto() {
        let move = Math.floor(Math.random() * 100);
        if (!this.moves.includes(move)) {
            return move;
        } else this.playAuto();
    }
}