export default class Textarea {
  constructor(parent) {
    this.create(parent);
  }

  create(parent) {
    this.textarea = document.createElement('textarea');
    this.textarea.setAttribute('id', 'textarea');
    this.textarea.setAttribute('tabindex', '-1');
    parent.appendChild(this.textarea);
  }
}
