import { AngularEditorConfig } from '@kolkov/angular-editor';

export class AngularEditorConfigShared {
    private angularEditorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: false,
        height: '25rem',
        minHeight: '5rem',
        minWidth: '0',
        translate: 'no',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Adicione uma descrição...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            { class: 'arial', name: 'Arial' },
            { class: 'times-new-roman', name: 'Times New Roman' },
            { class: 'calibri', name: 'Calibri' },
            { class: 'comic-sans-ms', name: 'Comic Sans MS' },
        ],
        uploadUrl: 'v1/image',
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            [
                'undo',
                'redo',
                'strikeThrough',
                'subscript',
                'superscript',
                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                'justifyFull',
                'indent',
                'outdent',
                'insertUnorderedList',
                'insertOrderedList',
                'heading',
                'fontName',
            ],
            [
                'fontSize',
                'textColor',
                'backgroundColor',
                'customClasses',
                'link',
                'unlink',
                'insertHorizontalRule',
                'removeFormat',
                'toggleEditorMode',
            ],
        ],
    };

    constructor() { }

    public default() {
        return this.angularEditorConfig;
    }
}