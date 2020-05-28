export default class Keyboard {
  constructor(parent, keys) {
    this.keys = keys;
    this.parent = parent;
    this.createKeyboard(this.keys);
    this.imitateKeys();
    this.highlightKeys();
    this.checkFocus();
    this.upperCase = false;
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
    switch (inputText) {
      case 'Backspace':
        this.textArea.value = this.textArea.value.slice(0, -1);
        break;
      case 'Tab':
        this.textArea.value += '\t';
        break;
      case 'Space':
        this.textArea.value += ' ';
        break;
      default:
        if (this.upperCase) {
          this.textArea.value += inputText.toLocaleUpperCase();
        } else {
          this.textArea.value += inputText;
        }
    }
  }

  checkFocus() {
    this.textArea = document.getElementById('textarea');
    this.textArea.addEventListener('click', () => {});
  }

  highlightKeys() {
    this.parent.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (document.querySelector(`[data-selector='key-${String(e.key)}']`)) {
        document.querySelector(`[data-selector='key-${String(e.key)}']`).classList.add('active');
        if (e.key === 'Shift') {
          this.upperCase = true;
        } else if (e.key === 'CapsLock') {
          this.upperCase = !this.upperCase;
        } else if (e.key === 'Alt' && this.upperCase === true) {
          this.changeLayout();
        } else {
          this.typing(e.key);
        }
      }
    });
    this.parent.addEventListener('keyup', (e) => {
      document
        .querySelector(`[data-selector='key-${String(e.key)}']`)
        .classList.remove('active');
      if (e.key === 'Shift' && this.upperCase === true) {
        this.upperCase = false;
      }
    });
  }

  imitateKeys() {
    this.keyboard.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.classList.add('scale-up');
      this.typing(e.target.dataset.value);
      setTimeout(() => e.target.classList.remove('scale-up'), 250);
    });
  }
}
