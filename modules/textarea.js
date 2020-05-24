export default class Textarea {
  constructor(parent) {
    this.create(parent);
  }

  create(parent) {
    this.textarea = document.createElement('textarea');
    this.textarea.setAttribute("id","textarea")
    parent.appendChild(this.textarea);
  }
}
