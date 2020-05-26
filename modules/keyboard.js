export default class Keyboard {
  constructor(parent, keys, textArea) {
    this.textArea = textArea;
    this.parent = parent;
    this.createKeyboard(keys);
    this.imitateKeys();
    this.highlightKeys();
  }

  createKeyboard(keys) {
    this.keyboard = document.createElement('div');
    this.keyboard.setAttribute('class', 'keyboard');

    keys.forEach((element) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.setAttribute('class', 'keyboard-row');
      element.forEach((el) => {
        const key = document.createElement('button');
        if (el.length > 1 && Array.isArray(el)) {
          key.innerText = `${el[0]}`;
          const secondChar = document.createElement('div');
          secondChar.innerText = `${el[1]}`;
          secondChar.setAttribute('class', 'second-char');
          key.appendChild(secondChar);
          // key.innerText = el;
          key.setAttribute('class', 'key');
          key.setAttribute('data-selector', `key-${String(el[0])}`);
          key.setAttribute('data-value', `${String(el[0])}`);
          key.setAttribute('data-up-value', `${String(el[1])}`);
        } else {
          key.innerText = el;
          key.setAttribute('data-value', `${String(el)}`);
          key.setAttribute('class', 'key');
          key.setAttribute('data-selector', `key-${String(el)}`);
        }
        keyboardRow.appendChild(key);
      });
      this.keyboard.appendChild(keyboardRow);
    });
    this.parent.appendChild(this.keyboard);
  }


  typing(inputText = '') {
    this.textArea = document.getElementById('textarea');
    this.textArea.value += inputText;
  }

  highlightKeys() {
    this.parent.addEventListener('keydown', (e) => {
      const focusCheck = document.activeElement === this.textArea;
      document.querySelector(`[data-selector='key-${String(e.key)}']`).classList.add('active');
      if (!focusCheck) { this.typing(e.key); }
    });
    this.parent.addEventListener('keyup', (e) => {
      document.querySelector(`[data-selector='key-${String(e.key)}']`).classList.remove('active');
    });
  }

  imitateKeys() {
    this.keyboard.addEventListener('click', (e) => {
      e.target.classList.add('scale-up');
      this.typing(e.target.dataset.value);
      setTimeout(() => e.target.classList.remove('scale-up'), 250);
    });
  }
}
