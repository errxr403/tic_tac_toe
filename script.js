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