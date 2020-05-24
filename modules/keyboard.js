export default class Keyboard {
  constructor(parent, keys) {
    this.parent = parent;
    this.createKeyboard(keys);
  }

  createKeyboard(keys) {
    this.keyboard = document.createElement('div');
    this.keyboard.setAttribute('class', 'keyboard');

    keys.forEach((element) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.setAttribute('class', 'keyboard-row');
      element.forEach((el) => {
        const key = document.createElement('button');
        // if (el.length > 1 && Array.isArray(el)) {
        //   key.innerText = `${el[0]} ${el[1]}`;
        // } else {
        key.innerText = el;
        key.setAttribute('class', `key ${String(el).toLowerCase()}`);
        // }
        keyboardRow.appendChild(key);
      });
      this.keyboard.appendChild(keyboardRow);
    });
    this.parent.appendChild(this.keyboard);
  }
}
