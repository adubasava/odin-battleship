import Player from "./player";
import Gameboard from "./gameboard";
import { updateCell, createBoards, clearBoards } from "./manage-DOM";

const info = document.querySelector('.instructions');
const play = document.querySelector('#play');
const restart = document.querySelector('#restart');
const opponentBoard = document.querySelector('#gameboard2');

restart.addEventListener('click', () => {
    play.style.display = 'block';
    playerGameboard = null;
    computerGameboard = null;
    player.moves = [];
    player.turn = false;
    computer.moves = [];    
    computer.turn = false;
    clearBoards();
    createBoards();
    opponentBoard.style.pointerEvents = 'auto';
})

play.addEventListener('click', () => {
    gameLoop();
}); 

const player = new Player('user');
const computer = new Player('computer');

let playerGameboard;
let computerGameboard;

player.turn = true;

// For AI to make smarter moves
const cellsToExplore = [];

// Start
export default function game() {          

    playerGameboard = new Gameboard(player.user);
    computerGameboard = new Gameboard(computer.user);

    playerGameboard.create();
    playerGameboard.placeRandom(5);
    playerGameboard.placeRandom(4);
    playerGameboard.placeRandom(3);
    playerGameboard.placeRandom(3);
    playerGameboard.placeRandom(2);

    computerGameboard.create();
    computerGameboard.placeRandom(5);
    computerGameboard.placeRandom(4);
    computerGameboard.placeRandom(3);
    computerGameboard.placeRandom(3);
    computerGameboard.placeRandom(2);

    info.innerHTML = 'Place your ships! Press ' + '<i>' + 'Play ' + '</i>' + 'when ready';

    return [playerGameboard.board, computerGameboard.board];
}

function gameLoop() {

    play.style.display = 'none';

    if (isGameOver()) return gameOver();

    info.innerHTML = player.turn? 'Your turn' : 'AI turn';

    if (computer.turn) {
        let AIStatus;
        do {
            AIStatus = AIMove();
        } while (AIStatus === 'hit');    
    } else playerMove();
    
}

function AIMove() {

    if (isGameOver()) return gameOver();
    
    info.innerHTML = 'AI turn';

    let status;

    const missed = () => {
        info.innerHTML = 'Your turn';
        computer.turn = false;
        player.turn = true;
    };
    
    const excludeDiagonal = function(cell) {
        let diagCells = playerGameboard.getDiagNeibours(cell);
        if (diagCells.length > 0) {
            for (let diagCell of diagCells) {
                computer.moves.push(diagCell);
            }
        }
    };

    const fillCellsToExplore = function(cell) {
        let neighbours = playerGameboard.getNeighbours(cell);
        for (let neighbour of neighbours) {
            if (!cellsToExplore.includes(neighbour) && !computer.moves.includes(neighbour)) {
                cellsToExplore.push(neighbour);
            }                
        }
    };

    const makeSmarterMove = function(move) {
        computer.moves.push(move);
        status = playerGameboard.receiveAttack(move);
        updateCell(`p-${move}`, status);
        return status;
    };

    if (cellsToExplore.length === 0) {
        let moveId = computer.makeRandomMove();
        status = playerGameboard.receiveAttack(moveId);
        updateCell(`p-${moveId}`, status);

        if (status === 'missed') {
            missed();
        } else {
            if (isGameOver()) return gameOver();    

            excludeDiagonal(moveId);
            fillCellsToExplore(moveId);
            
            if (cellsToExplore.length > 0) {
                let move = cellsToExplore.shift();
                status = makeSmarterMove(move);
                if (status === 'missed') missed();
                return status;
            } else return AIMove();   
        }
        return status;
    } else {        
        if (isGameOver()) return gameOver(); 

        for (let i = 0; i < cellsToExplore.length; i++) {
            let move = cellsToExplore.shift();            
            status = makeSmarterMove(move);
            if (status === 'hit') {
                if (isGameOver()) gameOver(); 
                excludeDiagonal(move);  
                fillCellsToExplore(move);    
            } else missed();
            return status;          
        }       
    }
}

function playerMove() {      
    
    if (isGameOver()) return gameOver();

    info.innerHTML = 'Your turn';

    opponentBoard.addEventListener('click', event => {
        let cellId = event.target.id;
        cellId = cellId.split("c-")[1];
        let status = computerGameboard.receiveAttack(cellId);
        updateCell(event.target.id, status);

        if (isGameOver()) return gameOver();
            
        if (status === 'missed') {
            player.turn = false;
            computer.turn = true;
            gameLoop();
        }
    })    
}

function isGameOver() {
    if (playerGameboard.areAllShipsSunk() || computerGameboard.areAllShipsSunk()) return true;
    return false;
}

function gameOver() {    
    opponentBoard.style.pointerEvents = 'none';

    if (playerGameboard.areAllShipsSunk()) {
        info.innerHTML = 'Game over! AI won!';
    } else info.innerHTML = 'Game over! You won!';
    
    return;
}