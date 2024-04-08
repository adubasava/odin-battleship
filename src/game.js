import Player from "./player";
import Gameboard from "./gameboard";
import { updateCell } from "./manage-DOM";

const info = document.querySelector('.instructions');
const play = document.querySelector('#play');
const opponentBoard = document.querySelector('#gameboard2');

play.addEventListener('click', gameLoop);

const player = new Player('user');
const computer = new Player('computer');

const playerGameboard = new Gameboard(player.user);
const computerGameboard = new Gameboard(computer.user);

player.takeTurn();

export default function game() {  

    playerGameboard.create();
    playerGameboard.placeShip(0, 5, 'horizontal');
    playerGameboard.placeShip(30, 4, 'vertical');
    playerGameboard.placeShip(49, 3, 'vertical');
    playerGameboard.placeShip(82, 3, 'horizontal');
    playerGameboard.placeShip(96, 2, 'horizontal');

    computerGameboard.create();
    computerGameboard.placeShip(0, 5, 'horizontal');
    computerGameboard.placeShip(30, 4, 'vertical');
    computerGameboard.placeShip(49, 3, 'vertical');
    computerGameboard.placeShip(82, 3, 'horizontal');
    computerGameboard.placeShip(96, 2, 'horizontal');

    info.innerHTML = 'Place your ships!';

    return [playerGameboard.board, computerGameboard.board];
}

function gameLoop() {

    if (isGameOver()) gameOver();

    info.innerHTML = player.turn? 'Your turn' : 'AI turn';

    if (computer.turn) {
        let AIStatus;
        do {
            AIStatus = AIMove();
        } while (AIStatus === 'hit');    
    } else playerMove();    
}

function AIMove() {

    if (isGameOver()) gameOver();
    
    info.innerHTML = 'AI turn';

    let moveId = computer.playAuto();
    const status = playerGameboard.receiveAttack(moveId);
    updateCell(`p-${moveId}`, status);

    if (status === 'missed') {
        info.innerHTML = 'Your turn';
        computer.turn = false;
        player.takeTurn();
    } 
    return status;
}

function playerMove() {       

    opponentBoard.addEventListener('click', event => {
        let cellId = event.target.id;
        cellId = cellId.split("c-")[1];
        let status = computerGameboard.receiveAttack(cellId);
        updateCell(event.target.id, status);

        if (isGameOver()) gameOver();
            
        if (status === 'missed') {
            player.turn = false;
            computer.takeTurn();
            gameLoop();
        }
    })    
}

function isGameOver() {
    if (playerGameboard.areAllShipsSunk() || computerGameboard.areAllShipsSunk()) return true;
    return false;
}

function gameOver() {
    info.innerHTML = 'Game over!';
    opponentBoard.style.pointerEvents = 'none';
    return;
}