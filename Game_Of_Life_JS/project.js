// var number = prompt("Enter the number of rows*columns (Minimum is 20)?");

// if (number < 20) {
//     do {
//         number = prompt("Enter the number of rows*columns (Minimum is 20)?");
//     } while (number < 20);
// }

var number=20;
var rows = number;
var columns = number;

var isGameActive = false;

var maxGenerations = 23;

var boardTable = [rows];
var boardNextTable = [rows];


function changeDimensions(){
    removeTable("tableId");
    var dimensions = document.getElementById("dimensions").value;
    rows=dimensions;
    columns=dimensions;
    newGame();
}

//Setup the rows and columns board with the input number prompt
function setupBoard() {
    var i = 0;
    while (i < rows) {
        boardTable[i] = [columns];
        boardNextTable[i] = [columns];
        i++;
    }
}

//Reset the board by setting everything to 0
function resetBoard() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            boardTable[i][j] = 0;
            boardNextTable[i][j] = 0;
        }
    }
}

//Copy contents to the current board and set current to 0
function duplicateBoard() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            boardTable[i][j] = boardNextTable[i][j];
            boardNextTable[i][j] = 0;
        }
    }
}

//Show our current board
function showBoard() {
    var tableContainer = document.getElementById("tableContainer");
    var table = document.createElement("table");
    table.setAttribute("id", "tableId");

    //Create the table
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < columns; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "/" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = checkCellState;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    tableContainer.appendChild(table);
}

function checkCellState() {
    var num = this.id.split("/");
    var row = num[0];
    var col = num[1];

    var cellState = this.getAttribute("class");
    // -1 is "alive" state
    if (cellState.indexOf("alive") !== -1) {
        this.setAttribute("class", "dead");
        boardTable[row][col] = 0;
    } else {
        this.setAttribute("class", "alive");
        boardTable[row][col] = 1;
    }
}

//Set specific cell's alive for the patterns
function setCellAlive(row, col) {
    var cell = document.getElementById(row + "/" + col);
    cell.setAttribute("class", "alive");
    boardTable[row][col] = 1;
    boardNextTable[row][col] = 1;
}

//Pattern: Block
function blockPattern() {
    var cellsList = document.getElementsByClassName("alive");
    var row = Math.floor(Math.random()* 10)+1 ;
    var col = Math.floor(Math.random()* 10)+1 ;

    
    setCellAlive(row, col);
    setCellAlive(row, col + 1);
    setCellAlive(row + 1, col + 1);
    setCellAlive(row + 1, col);

    //start();
}

//Pattern: Blinker
function blinkerPattern() {
    var cellsList = document.getElementsByClassName("alive");
    var row = Math.floor(Math.random()* 10)+1 ;
    var col = Math.floor(Math.random()* 10)+1 ;
    console.log(row+ "-" + col);
  
    setCellAlive(row, col + 10);
    setCellAlive(row + 1, col + 10);
    setCellAlive(row + 2, col + 10);


    //start();

}

//Pattern: Beacon
function beaconPattern() {
    var cellsList = document.getElementsByClassName("alive");
    var row = Math.floor(Math.random()* 10)+1 ;
    var col = Math.floor(Math.random()* 10)+1 ;
  
    setCellAlive(row, col - 1);
    setCellAlive(row, col);
    setCellAlive(row + 1, col -1);
    setCellAlive(row + 1, col);
    setCellAlive(row +2, col + 1);
    setCellAlive(row + 2, col + 2);
    setCellAlive(row + 3, col +1);
    setCellAlive(row + 3, col + 2);

   // start();
}

function patternSelect(value) {
    switch (value) {
        case "Block":
            blockPattern();
            break;
        case "Blinker":
            blinkerPattern();
            break;
        case "Beacon":
            beaconPattern();
            break;
        default:
            break;
    }
}

function updateBoard() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            var cell = document.getElementById(i + "/" + j);
            if (boardTable[i][j] === 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "alive");
            }
        }
    }
}

//Check the current state of the board
function checkBoardState(row, col) {
    var neighbors = neighborCount(row, col);

    switch (boardTable[row][col]) {
        case 1:
            if (neighbors < 2) {
                boardNextTable[row][col] = 0;
            } else if (neighbors > 3) {
                boardNextTable[row][col] = 0;
            } else if (neighbors == 2 || neighbors == 3) {
                boardNextTable[row][col] = 1;
            }
            break;
        case 0:
            if (neighbors == 3) {
                boardNextTable[row][col] = 1;
            }
            break;
        default:
            break;
    }
}

//Count the number of neighbors
function neighborCount(row, col) {
    var count = 0, smallRow = row - 1, bigRow = row + 1, smallCol = col - 1, bigCol = col + 1;

    if (smallRow >= 0 && boardTable[smallRow][col] == 1) {
        count++;
    }
    if (smallRow >= 0 && smallCol >= 0 && boardTable[smallRow][smallCol] == 1) {
        count++;
    }
    if (smallRow >= 0 && bigCol < columns && boardTable[smallRow][bigCol] == 1) {
        count++;
    }
    if (smallCol >= 0 && boardTable[row][smallCol] == 1) {
        count++;
    }
    if (bigCol < columns && boardTable[row][bigCol] == 1) {
        count++;
    }
    if (bigRow < rows && boardTable[bigRow][col] == 1) {
        count++;
    }
    if (bigRow < rows && smallCol >= 0 && boardTable[bigRow][smallCol] == 1) {
        count++;
    }
    if (bigRow < rows && bigCol < columns && boardTable[bigRow][bigCol] == 1) {
        count++;
    }
    return count;
}

//Skip just one generation
function skipSingleGeneration() {
    nextGenerationCalculated();
}

//Skip 23 generations
function skipMaxGenerations() {
    var l = 0;
    do {
        setTimeout(function () {
            nextGenerationCalculated();
        }, 1000 * l);
        l++;
        console.log(l);
    }
    while (l < 23);

}

//Runs when start is clicked
function start() {
    isGameActive = true;

    var l = 0;
    do {
        setTimeout(function () {
            calculateNextGeneration();
        }, 1000 * l);
        l++;
        console.log(l);
    }
    while (l < 1000);

}

//Stop the game when stop is clicked
function stop() {
    if (isGameActive) {
        isGameActive = false;
    }
}

//Calculate the next generation if game is not stopped
function calculateNextGeneration() {
    if (isGameActive) {
        nextGenerationCalculated();
    }
}

//The function that updates when calculating the next generation
function nextGenerationCalculated() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            checkBoardState(i, j);
        }
    }

    //Set current board and free up the next board
    duplicateBoard();
    // copy all 1 values to "alive" in the table
    updateBoard();

}

function completelyClearTable() {
    var cellsList = document.getElementsByClassName("alive");

    var cells = [];
    var i = 0;

    do {
        cells.push(cellsList[i]);
        i++;
    } while (i < cellsList.length);

    i = 0;
    do {
        cells[i].setAttribute("class", "dead");
        i++;
    } while (i < cellsList.length);

    // resetBoard();
}

//reset game = page is reloaded/refreshed
function resetGame() {
    location.reload();
}

function removeTable(id){
        var tbl = document.getElementById(id);
        if(tbl) tbl.parentNode.removeChild(tbl);
}


function newGame() {
    showBoard();
    setupBoard();
    resetBoard();
}

//Start the game. Loaded when script is loaded.
newGame();
