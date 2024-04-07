import Ship from './ship';

export default class Gameboard {
    constructor(user) {
        this.user = user;
        this.size = 100;
        this.board = [];
        this.ships = [];
    }

    create() {
        for (let i = 0; i < this.size; i++) {
            this.board.push(0);
        }
        return this.board;
    }

    placeShip(cell, length, direction) {
        const ship = new Ship(length);
        this.ships.push(ship);

        this.board[cell] = length;
        if (direction == 'horizontal') {
            for (let i = 1; i < length; i++) {
                this.board[cell + i] = length;
            }
        } else {
            for (let i = 1; i < length; i++) {
                this.board[cell + 10 * i] = length;
            }
        }        
        return this.ships;
    }

    receiveAttack(cell) {
        if (this.board[cell] === 0) {
            this.board[cell] === 'missed';
            return false;
        } else {
            for (let ship of this.ships) {
                if (ship.length === this.board[cell]) {
                    ship.hit();
                }
            }
            return true;
        }
    }

    areAllShipsSunk() {
        let count = 0;
        for (let ship of this.ships) {
            if (ship.isSunk()) {
                count++;
            }
        }
        return count === 5;
    }
}