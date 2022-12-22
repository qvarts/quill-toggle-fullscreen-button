import {Quill} from 'quill';
import QuillFullscreenButtonOptions from "./options";

const toggleFullscreenIcon = require("../assets/toggle-fullscreen-icon.svg") as string;

export default class QuillToggleFullscreenButton {
  public static DEFAULTS: QuillFullscreenButtonOptions = {
    buttonHTML: toggleFullscreenIcon,
    buttonTitle: '',
  };

  public readonly quill: Quill;
  public readonly options: QuillFullscreenButtonOptions;

  private readonly _toolbarEl: HTMLElement;

  constructor(quill: Quill, options: QuillFullscreenButtonOptions = {}) {
    this.quill = quill;
    this.options = this._setDefaults(options);

    // Add toggle fullscreen button to all quill toolbar instances
    const toolbarModule = quill.getModule("toolbar");

    if (!toolbarModule) {
      throw new Error(
        'quill.toggleFullscreenButton requires the "toolbar" module to be included too'
      );
    }

    this._toolbarEl = toolbarModule.container;

    const buttonContainer = document.createElement('span') as HTMLSpanElement;
    buttonContainer.classList.add('ql-formats');

    const button = document.createElement('button') as HTMLButtonElement;
    button.type = "button";
    button.classList.add('ql-fullscreen');
    button.onclick = this._toggleFullscreen.bind(this);
    if (this.options.buttonHTML) {
      button.innerHTML = this.options.buttonHTML;
    }
    if (this.options.buttonTitle) {
      button.title = this.options.buttonTitle;
    }

    buttonContainer.append(button);
    this._toolbarEl.append(buttonContainer);
  }

  private _setDefaults(options: QuillFullscreenButtonOptions): QuillFullscreenButtonOptions {
    options = Object.assign({}, options);

    options.buttonHTML ||= QuillToggleFullscreenButton.DEFAULTS.buttonHTML;
    options.buttonTitle ||= QuillToggleFullscreenButton.DEFAULTS.buttonTitle;

    return options;
  }

  private _toggleFullscreen(e: MouseEvent) {
    e.preventDefault();

    const editorContainer = this.quill.root?.closest('.ql-container');
    if (!editorContainer) {
      throw new Error(
        'Quill editor container not exist'
      );
    }

    let editorWrapEl: HTMLElement | null = editorContainer.parentElement;

    // if IN fullscreen mode
    if (editorWrapEl && editorWrapEl.classList.contains('ql-editor-wrap')) {
      if (editorContainer instanceof HTMLElement) {
        editorContainer.classList.remove('is-fullscreen');
        editorContainer.style.height = '';
      }

      // moves editor elements outside the wrapper and remove it
      editorWrapEl.after(...Array.from(editorWrapEl.childNodes));
      editorWrapEl.remove();

      if (e.currentTarget instanceof Element) {
        e.currentTarget.classList.remove('ql-active');
      }

      return;
    }

    // if NOT IN fullscreen mode
    let toolbarHeight = this._toolbarEl.offsetHeight;

    // create wrapper
    editorWrapEl = document.createElement('div');
    editorWrapEl.classList.add('ql-editor-wrap');
    editorWrapEl.style.position = 'fixed';
    editorWrapEl.style.top = '0';
    editorWrapEl.style.left = '0';
    editorWrapEl.style.width = '100%';
    editorWrapEl.style.height = '100%';
    editorWrapEl.style.backgroundColor = 'white';
    editorWrapEl.style.zIndex = '9999';

    if (editorContainer instanceof HTMLElement) {
      editorContainer.classList.add('is-fullscreen');
      editorContainer.style.height = `calc(100% - ${toolbarHeight}px)`;
    }

    // moves editor elements inside the wrapper
    editorContainer.after(editorWrapEl);
    editorWrapEl.append(this._toolbarEl);
    editorWrapEl.append(editorContainer);

    if (e.currentTarget instanceof Element) {
      e.currentTarget.classList.add('ql-active');
    }
  }
}

(window as any)["QuillToggleFullscreenButton"] = QuillToggleFullscreenButton;