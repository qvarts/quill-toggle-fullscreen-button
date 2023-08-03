import { Quill } from 'quill';
import QuillFullscreenButtonOptions from "./options";
export default class QuillToggleFullscreenButton {
    static DEFAULTS: QuillFullscreenButtonOptions;
    readonly quill: Quill;
    readonly options: QuillFullscreenButtonOptions;
    private readonly _toolbarEl;
    constructor(quill: Quill, options?: QuillFullscreenButtonOptions);
    private _setDefaults;
    private _toggleFullscreen;
}
