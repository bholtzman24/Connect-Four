/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 // Declares a constant global variable, "WIDTH", and sets it to 7; to represent the length of the x-axis
const WIDTH = 7;
// Declares a constant global variable, "HEIGHT", and sets it to 6; to represent the length of the y-axis
const HEIGHT = 6;

// Declares a global but reassignable variable, "currPlayer", and temporarily sets it to 1; to represent one of two players 
let currPlayer = 1; 
// Declares a global but reassignable variable, "board", and sets it to an empty array; to represent the in-JS board structure, subsequently defined as "board[y][x]" after the y and x axes, respectively, have been pushed into it
let board = []

/** makeBoard: create in-JS board structure:
 *  board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  // Creates a for loop initialized at 0, using y as an index limited by the global variable "HEIGHT", iterating one positive unit per loop; to represent all individual cells along the y-axis
  for (let y = 0; y < HEIGHT; y++) {
    // For each iteration of parent loop, pushes an array with a length defined by the value of the global variable "WIDTH" onto the global variable "board"; to represent all individual cells along the x-axis and create the in-JS board structure as this array is extrapolated from each unit on the y-axis 
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board');

  // TODO: add comment for this code
  // Creates <tr> element, i.e. row of cells, and assigns it to the variable "top"
  const top = document.createElement("tr");
  // Sets the id attribute of "top" to "column-top"
  top.setAttribute("id", "column-top");
  // Adds a click event listener to "top" initializing a subsequently defined function named "handleClick"
  top.addEventListener("click", handleClick);

  // Creates a for loop initialized at 0, using "x" as an index limited by the global variable "WIDTH", and iterating one positive unit per loop (++); representing the x-axis on the table
  for (let x = 0; x < WIDTH; x++) {
    // For each iteration of parent loop (i.e. each unit along the x axis), creates a <td> element, i.e. data cell, and names it "headCell"
    const headCell = document.createElement("td");
    // Sets the id attribute of "headCell" to "x"
    headCell.setAttribute("id", x);
    // Appends "headCell" to "top" 
    top.append(headCell);
  }

  // Appends "top" and thereby "headCell", which has been appended to the former, to the local variable "board," thereby generating the uppermost row of cells and assigning the click event to all of them
  board.append(top);

  // TODO: add comment for this code
  // Creates a for loop initialized at 0, using "y" as an index limited by the global variable "HEIGHT", and iterating one positive unit per loop (++); representing the y-axis on the board
  for (let y = 0; y < HEIGHT; y++) {
    // For each iteration of parent loop, creates a <tr> element, i.e. row of cells, and names it "row"
    const row = document.createElement("tr");
    // Creates another for loop initialized at 0, using "x" as an index limited by the global variable "WIDTH", and iterating one positive unit per loop (++); representing the x-axis on the board
    for (let x = 0; x < WIDTH; x++) {
      // For each iteration of parent loops, creates a <td> element and names it "cell"  
      const cell = document.createElement("td");
      // Sets id attribute of "cell" to `${y}-${x}
      cell.setAttribute("id", `${y}-${x}`);
      // Appends "cell" to "row"
      row.append(cell);
    }
    // Appends "row" and thereby "cell", which has been appended to the former, to "board"; fills the HTML board along the y and x axes with data cells according to the aforementioned loops and assigns each cell an id defined by its y-x coordinates
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // Creates a for loop initialized at the global variable HEIGHT - 1 (i.e. the second highest cell); using "y" as an index greater than or equal to 0, and iterating one negative unit per loop (y--), i.e. downward one cell at a time 
  for (let y = HEIGHT - 1; y >= 0; y--) {
      // Creates the condition that a particular cell is not filled
      if (!board[y][x]) {
          // Stops at a particular cell along the y-axis (and the loop) if the cell is not filled 
          return y;
      }
  }
  // Does not return a particular cell if all cells iterated over in the loop are filled
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  // Specifies the dimensions of the playing pieces 
  piece.classList.add("piece");
  // Attributes one of two colors to the pieces based on the current player
  piece.classList.add(`p${currPlayer}`);
  // Defines the destination for the piece as the cell defined by y-x coordinates, wherein x is determined by the location of the click along the x-axis and y is determined by function findSpotForCol(x); 
  const move = document.getElementById(`${y}-${x}`);
  // Appends the piece to the previously defined destination
  move.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  
    let y = findSpotForCol(x);
    if (y === null) {
        return;
    }
  

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }



  // check for tie
  // TODO: check if all cells in board are filled; if so, call endGame
  if (board.every(row => row.every(cell => cell))) {
      return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // Creates a for loop initialized at zero, using "y" as an index limited by the global variable "HEIGHT", and iterating one positive unit per loop (y++); representing the y-axis on the board
  for (let y = 0; y < HEIGHT; y++) {
    // For each iteration of parent loop, creates another for loop initialized at 0, using x as an index limited by the global variable "WIDTH", and iterating one positive unit per loop (x++); representing the x-axis on the board
    for (let x = 0; x < WIDTH; x++) {
      // For each iteration of parent loops, creates the variable "horiz" and assigns it to an array consisting of four subarrays representing four horizontally consecutive cells
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // For each iteration of parent loops, creates the variable "vert" and assigns it to an array consisting of four subarrays representing four vertically consecutive cells
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // For each iteration of parent loops, creates the variable "diagDR" and assigns it to an array consisting of four subarrays representing four diagonally consecutive cells that slope upward from left to right
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // For each iteration of parent loops, creates the variable "diagDL" and assigns it to an array consisting of four subarrays representing four diagonally consecutive cells that slope downward from left to right
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // Creates a boolean expression contingent upon the affirmation of one of four conditions defined by the aforementioned variables
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
            }
        }
    }
}   

makeBoard();
makeHtmlBoard();