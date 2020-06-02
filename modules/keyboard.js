export default class Keyboard {
  constructor(parent, keys) {
    this.keys = keys;
    this.parent = parent;
    this.createKeyboard(this.keys);
    this.imitateKeys();
    this.highlightKeys();
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
      case ' ':
        this.textArea.value += ' ';
        break;
      case 'Alt':
        this.textArea.value += '';
        break;
      case 'Enter':
        this.textArea.value += '\n';
        break;
      default:
        if (this.upperCase) {
          this.textArea.value += inputText.toUpperCase();
        } else {
          this.textArea.value += inputText;
        }
    }
  }

  highlightKeys() {
    this.parent.addEventListener('keydown', (e) => {
      e.preventDefault();
      let keyValue = String(e.key);
      if (keyValue === ' ') {
        keyValue = 'Space';
      }
      if (document.querySelector(`[data-selector='key-${keyValue}']`)) {
        document.querySelector(`[data-selector='key-${keyValue}']`).classList.add('active');
        if (e.key === 'Shift') {
          this.upperCase = true;
        } else if (e.key === 'CapsLock') {
          this.upperCase = !this.upperCase;
        } else if (
          e.key !== 'Control'
          || e.key !== 'Shift'
          || e.key !== 'Alt'
        ) {
          this.typing(e.key);
        }
      }
    });
    this.parent.addEventListener('keyup', (e) => {
      const keyValue = String(e.key);
      if (document.querySelector(`[data-selector='key-${keyValue}']`)) {
        document.querySelector(`[data-selector='key-${keyValue}']`).classList.remove('active');
      }
      if (e.key === 'Shift' || this.upperCase === true) {
        this.upperCase = false;
      }
    });
  }

  imitateKeys() {
    this.keyboard.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target !== document.querySelector('.keyboard')) {
        e.target.classList.add('scale-up');

        const keyValue = String(e.target.dataset.value);
        if (keyValue === 'Shift') {
          this.upperCase = true;
        } else if (keyValue === 'CapsLock') {
          this.upperCase = !this.upperCase;
        } else if (keyValue === 'Space' || keyValue === 'SPACE') {
          this.typing(' ');
        } else if (
          keyValue !== 'Control'
          || keyValue !== 'Shift'
          || keyValue !== 'Alt'
        ) {
          this.typing(keyValue);
        }
        setTimeout(() => e.target.classList.remove('scale-up'), 250);
      }
    });
  }
}
