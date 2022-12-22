# quill-toggle-fullscreen-button

[Quill](https://github.com/quilljs/quill) module which adds a toggle fullscreen 
button to the Quill editor toolbar.

## Install

```bash
npm install quill-toggle-fullscreen-button --save
```

## Usage

First, [set up a Quill editor](https://quilljs.com/docs/quickstart/).

Next, load `quill-toggle-fullscreen-button` through any of the options 
presented by [UMD](https://github.com/umdjs/umd).

Load script in HTML:

```html
<script src="quill.toggleFullscreenButton.js"></script>
```

Using [ES6-style `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):

```javascript
import QuillToggleFullscreenButton from 'quill-toggle-fullscreen-button';
```

Using CommonJS-style `require`:

```javascript
const QuillToggleFullscreenButton = require('quill-toggle-fullscreen-button');
```

Then, register the `quill-toggle-fullscreen-button` module:

```javascript
Quill.register('modules/toggleFullscreen', QuillToggleFullscreenButton);

const quill = new Quill('#editor', {
  modules: {
    toggleFullscreen: true
  }
});
```

For an example setup, see the
[example code](example), which can be run with:

```bash
npm start
```

## API

### Configuration

The `quill-toggle-fullscreen-button` module has the following optional configuration:

- `buttonTitle` _string_: sets the title attribute of the toolbar button
- `buttonHTML` _string_: overrides the SVG icon of the toolbar button

Provide these options when setting up the Quill editor:

```javascript
const editor = new Quill('#editor', {
  modules: {
    toggleFullscreen: {
      buttonTitle: 'Toggle fullscreen',
      buttonHTML: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <polyline class="ql-even ql-stroke" points="12 3 15 3 15 6" />
        <polyline class="ql-even ql-stroke" points="6 15 3 15 3 12" />
        <polyline class="ql-even ql-stroke" points="12 15 15 15 15 12" />
        <polyline class="ql-even ql-stroke" points="6 3 3 3 3 6" />
      </svg>`,
    },
  },
});
```

## License

This code is available under the [MIT license](LICENSE-MIT.txt).
