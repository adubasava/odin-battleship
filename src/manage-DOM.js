import game from "./game";

const width = 10;

function clearBoards() {
    for (let i = 0; i < width * width; i++) {
        let cell = document.querySelector(`#p-${i}`);
        cell.remove();
    }
    for (let i = 0; i < width * width; i++) {
        let cell = document.querySelector(`#c-${i}`);
        cell.remove();
    }
}

function createBoards() {

    const initBoards = game();
    
    const playerGameBoard = document.querySelector('#gameboard1');

    for (let i = 0; i < width * width; i++) {
        const cell = document.createElement('div');
        cell.id = `p-${i}`;
        if (initBoards[0][i] !== 0) {
            cell.classList.add('ship');
        }        
        playerGameBoard.append(cell);
    }

    const computerGameBoard = document.querySelector('#gameboard2');

    for (let i = 0; i < width * width; i++) {
        const cell = document.createElement('div');
        cell.id = `c-${i}`;
        computerGameBoard.append(cell);
    }

}

function updateCell(id, status) {
    let cell = document.querySelector(`#${id}`);
    cell.classList.add(status);
}

export { createBoards, updateCell, clearBoards }