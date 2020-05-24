export default class Keyboard {
  constructor(parent, keys) {
    this.parent = parent;
    this.createKeyboard(keys);
    this.imitateKeys(this.keyboard)
    this.typing()
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
        key.setAttribute('class', `key ${String(el)}`);
        // }
        keyboardRow.appendChild(key);
      });
      this.keyboard.appendChild(keyboardRow);
    });
    this.parent.appendChild(this.keyboard);
  }


  typing() {
    this.textArea = document.getElementById("textarea")
    this.textAreaValue = ""
    this.textArea.value = this.textAreaValue
  }

  imitateKeys(object){
    this.parent.addEventListener("keydown",e => {
      console.log(e.key)
      document.querySelector(`.${String(e.key)}`).classList.add("active")
      // this.textAreaValue += e.key
      // this.textArea.value = this.textAreaValue

    })
    this.parent.addEventListener("keyup",e => {
      console.log(e.key)
      document.querySelector(`.${String(e.key)}`).classList.remove("active")
    })

  }
}
