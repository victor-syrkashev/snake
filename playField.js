const playField = {
  size: 7,
  creatPlayField() {
    const array = [];
    const innerArray = [];
    for (let i = 0; i < this.size; i++) {
      innerArray.push(i);
    }
    for (let j = 0; j < this.size; j++) {
      array.push(innerArray);
    }
    return array;
  },
};

playField.creatPlayField();

export { playField };
