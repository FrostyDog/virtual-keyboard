export default class Textarea {
  constructor(parent) {
    this.create(parent);
  }

  create(parent) {
    this.textarea = document.createElement('textarea');
    parent.appendChild(this.textarea);
  }
}
