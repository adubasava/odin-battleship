export default class Player {
    constructor(user) {
        this.user = user;
        this.turn = false;
        this.moves = [];
    }    

    makeRandomMove() {
        let move = Math.floor(Math.random() * 100);
        if (!this.moves.includes(move)) {
            this.moves.push(move);
            return move;
        } else return this.makeRandomMove();
    }
}