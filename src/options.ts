export default interface QuillFullscreenButtonOptions {
  // Button
  buttonHTML?: string;        // default:  "Fullscreen SVG Icon"
  buttonTitle?: string;       // default:  ""

  // Quill Modules (for the HTML editor)
  editorModules?: {
    // Any modules here will be declared in HTML quill editor instance
  };
}