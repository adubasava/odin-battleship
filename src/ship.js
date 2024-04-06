export default class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.sunk = false;      
    }

    hit() {
        return this.hits += 1;
    }

    isSunk() {
        if (this.hits === this.length) return this.sunk = true;
        return false;
    }
}