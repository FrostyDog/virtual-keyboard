// Example of the links. Easy configurable and extandable by adding new elements or deleting ones
import engKeys from './modules/eng-keys';
import Keyboard from './modules/keyboard';
import Textarea from './modules/textarea';

// Load new Menu with links
window.onload = new Textarea(document.getElementById('body'));
window.onload = new Keyboard(document.getElementById('body'), engKeys);
