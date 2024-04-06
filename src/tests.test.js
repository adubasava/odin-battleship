﻿import Ship from './ship';

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