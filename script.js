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
  // Private Variables & Methods
  let currentPlayer, cellId;

  const DOMstrings = {
    cell: '.cell',
  };

  const setClickedCellId = (id) => cellId = id;

  const updateHoverMarkAttr = (event) => {
    if (event.target.dataset.isClicked == "false") {
      event.target.dataset.hoverMark = currentPlayer.getMark();
    };
  };

  const updateCellData = (event) => {
    let cellBGColor = currentPlayer.getMark() === "X" ? "cell-player1" : "cell-player2";

    event.target.textContent = currentPlayer.getMark();
    event.target.dataset.isClicked = "true";
    event.target.classList.add(cellBGColor);
  };

  // Public Methods
  const getClickedCellId = () => cellId;

  const setupListener = () => {
    document.querySelectorAll(DOMstrings.cell).forEach(cell => {

      cell.addEventListener('mouseover', updateHoverMarkAttr);

      cell.addEventListener('click', e => {
        updateCellData(e);
        setClickedCellId(e.target.id);
      });
    });
  };

  const setCurrentPlayer = (playerObj) => {
    currentPlayer = playerObj;
  };

  return { setupListener, setCurrentPlayer, getClickedCellId }
})();