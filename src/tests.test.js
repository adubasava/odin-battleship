import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

describe('Ship', () => {
    const testShip = new Ship(4);
  
    test('ship hit', () => expect(testShip.hit()).toBe(1));
    test('isSunk after 1 hit', () => expect(testShip.isSunk()).toBe(false));
  
    test('add hits', () => {
        testShip.hit();
        testShip.hit();
        testShip.hit();
    });
  
    test('isSunk true', () => expect(testShip.isSunk()).toBe(true));
});

describe('Gameboard', () => {
    const testGameboard = new Gameboard('player');
    testGameboard.create();

    test('place ship 4', () => expect(testGameboard.placeShip(0, 4, 'horizontal')).toContainEqual({"hits": 0, "length": 4, "sunk": false}));

    test('place ship 3', () => expect(testGameboard.placeShip(7, 3, 'vertical')).toContainEqual({"hits": 0, "length": 3, "sunk": false}));

    test('ships', () => expect(testGameboard.ships).toHaveLength(2));    

    test('receive attack', () => {
        testGameboard.receiveAttack(0);
    });

    test('hits after attack', () => expect(testGameboard.ships).toContainEqual({"hits": 1, "length": 4, "sunk": false}));

    test('receive attack', () => {
        testGameboard.receiveAttack(5);
    });
    
    test('areAllShipsSunk false', () => expect(testGameboard.areAllShipsSunk()).toBe(false));
});

describe('Player', () => {
    const player = new Player('user');
    const computer = new Player('computer');
  
    test('player turn', () => expect(player.turn).toBe(false));    

    test('computer move', () => expect(computer.makeRandomMove()).toBeLessThan(100));
});