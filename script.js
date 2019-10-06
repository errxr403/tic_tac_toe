const Player = (name, mark) => {
  // Public Methods
  const getName = () => name;
  const getMark = () => mark;
  
  return { getName, getMark };
};