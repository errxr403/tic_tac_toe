const Player = (name, mark) => {
  // Public Methods
  const getName = () => name;
  const getMark = () => mark;
  
  return { getName, getMark };
};

const Gameboard = ( () => {
  // Private Variable
  let gameboard = [ "", "", "", "", "", "", "", "", "" ];
  
  // Public Methods
  const get = () => gameboard;
  
  const update = (index, mark) => {
    if ( !isDataFilled(index) ) {
      gameboard[index] = mark;
    };
  };

  const reset = () => {
    for (let i in gameboard) {
      gameboard[i] = "";
    };
  };

  const isDataFilled = dataIndex => {
    return gameboard[dataIndex] ? true : false;
  };

  return { get, update, reset, isDataFilled };
})();

const UIHandler = ( () => {
  // Private Variables
  let currentPlayer;
  const DOMstrings = {
    cell: '.cell',
  };

  // Public Methods
  const getDomStrings = () => DOMstrings;

  const updateHoverMarkAttr = (event) => {
    event.target.dataset.hoverMark = currentPlayer.getMark();
  };

  const updateCellData = (event) => {
    let cellBGColor = currentPlayer.getMark() === "X" ? "cell-player1" : "cell-player2";

    event.target.textContent = currentPlayer.getMark();
    event.target.dataset.isClicked = "true";
    event.target.classList.add(cellBGColor);
  };

  const setCurrentPlayer = (currentPlayerObj) => {
    currentPlayer = currentPlayerObj;
  };

  const cellIsNotClicked = (event) => {
    return event.target.dataset.isClicked === "false";
  };

  const resetCellData = () => {
    document.querySelectorAll(DOMstrings.cell).forEach(cell => {
      cell.dataset.hoverMark = "";
      cell.textContent = "";
      cell.dataset.isClicked = "false";
      cell.classList.remove("cell-player1", "cell-player2", "cell-winner");
    });
  };

  return { getDomStrings, updateHoverMarkAttr, updateCellData, resetCellData, cellIsNotClicked, setCurrentPlayer }
})();


const Game = ( (UIModule, GameboardModule) => {
  // Private Variables & Methods
  let currentPlayer, player1, player2;
  let gameboardArr = Gameboard.get();

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    UIHandler.setCurrentPlayer(currentPlayer);
  };

  const createPlayers = () => {
    // Get players name from UIHandler
    player1 = Player("Player 1", "X");
    player2 = Player("Player 2", "O");
    
    currentPlayer = player1;
  };

  const updateGameboardCell = (index, mark) => {
    Gameboard.update(index, mark);

    // Get latest gameboard data
    gameboardArr = Gameboard.get();
  };

  return {  }
})(UIHandler, Gameboard);
