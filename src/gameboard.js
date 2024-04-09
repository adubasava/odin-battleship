import Ship from './ship';

const width = 10;

export default class Gameboard {
    constructor(user) {
        this.user = user;
        this.size = width * width;
        this.board = [];
        this.ships = [];
        this.notAvailableCells = [];
    }

    create() {
        for (let i = 0; i < this.size; i++) {
            this.board.push(0);
        }
        return this.board;
    }

    updateNotAvailableCells(cell) {
        if (!this.notAvailableCells.includes(cell)) {
            this.notAvailableCells.push(cell);
        }
    }

    getCellNeighbours(cell) {
        const diagonal = this.getDiagNeibours(cell);
        const straight = this.getNeighbours(cell);
        const neighbours = diagonal.concat(straight);
        return neighbours;
    }

    getDiagNeibours(cell) {
        const neighbours = [];
        const rightCondition = (cell % width + 1) < width;
        const leftCondition = (cell % width - 1) >= 0;
        const topCondition = (cell - width) >= 0;
        const bottomCondition = (cell + width) < width * width;   
       
        // Top right neighbour
        if (topCondition && rightCondition) {
            neighbours.push(cell - (width - 1));
        }
        // Top left neighbour
        if (topCondition && leftCondition) {
            neighbours.push(cell - (1 + width));
        }
        // Bottom right neighbour
        if (bottomCondition && rightCondition) {
            neighbours.push(cell + (width + 1));
        }
        // Bottom left neighbour
        if (bottomCondition && leftCondition) {
            neighbours.push(cell + (width - 1));
        }

        return neighbours;
    }

    getNeighbours(cell) {
        const neighbours = [];
        const rightCondition = (cell % width + 1) < width;
        const leftCondition = (cell % width - 1) >= 0;
        const topCondition = (cell - width) >= 0;
        const bottomCondition = (cell + width) < width * width;

        // Right neighbour
        if (rightCondition) {
            neighbours.push(cell + 1);            
        }
        // Left neighbour
        if (leftCondition) {
            neighbours.push(cell - 1);
        }
        // Top neighbour
        if (topCondition) {
            neighbours.push(cell - width);
        }
        // Bottom neighbour
        if (bottomCondition) {
            neighbours.push(cell + width);
        }       

        return neighbours;
    }

    placeShip(cell, length, direction) {
        const ship = new Ship(length);
        this.ships.push(ship);
        let cellNeighbours;

        this.board[cell] = length;
        this.updateNotAvailableCells(cell);
        cellNeighbours = this.getCellNeighbours(cell);
        for (let neighbour of cellNeighbours) {
            this.updateNotAvailableCells(neighbour);
        }

        if (direction == 'horizontal') {
            for (let i = 1; i < length; i++) {
                this.board[cell + i] = length;
                this.updateNotAvailableCells(cell + i);
                cellNeighbours = this.getCellNeighbours(cell + i);
                for (let neighbour of cellNeighbours) {
                    this.updateNotAvailableCells(neighbour);
                }
            }
        } else {
            for (let i = 1; i < length; i++) {
                this.board[cell + width * i] = length;
                this.updateNotAvailableCells(cell + width * i);
                cellNeighbours = this.getCellNeighbours(cell + width * i);
                for (let neighbour of cellNeighbours) {
                    this.updateNotAvailableCells(neighbour);
                }
            }
        }        
        return this.ships;
    }

    receiveAttack(cell) {
        if (this.board[cell] === 0) {
            this.board[cell] = 'missed';
        } else {
            for (let ship of this.ships) {
                if (ship.length === this.board[cell] && ship.hits < ship.length) {
                    this.board[cell] = 'hit';
                    ship.hit();
                }
            }
        }
        return this.board[cell];
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

    placeRandom(length) {
        let direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        let cell = Math.floor(Math.random() * width * width);        

        if (direction === 'horizontal') {
            if (cell % width < width - length) {
                for (let i = 0; i < length; i++) {
                    if (this.notAvailableCells.includes(cell + i)) return this.placeRandom(length);
                }
                this.placeShip(cell, length, direction);
            } else return this.placeRandom(length)
        }

        if (direction === 'vertical') {
            if (cell / width < width - length) {
                for (let i = 0; i < length; i++) {
                    if (this.notAvailableCells.includes(cell + width * i)) return this.placeRandom(length);
                }
                this.placeShip(cell, length, direction);
            } else return this.placeRandom(length)
        }
    }
}