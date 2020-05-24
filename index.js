// Example of the links. Easy configurable and extandable by adding new elements or deleting ones
import {engKeys} from './modules/eng-keys.js';
import Keyboard from './modules/keyboard.js';
import Textarea from './modules/Textarea.js';

// Load new Menu with links
window.onload = new Textarea(document.getElementById("body"));
window.onload = new Keyboard(document.getElementById("body"), engKeys);
