export enum LocalStorageItemKeys {
  HEADER_TOKEN_KEY = 'access-token',
  ADMIN_TOKEN_KEY= 'admin-token',
  CURRENT_NODE = 'current-node',
  CURRENT_PROFILE = 'current-profile',
  I18N_LANGUAGE = 'lang'
}

export enum GraphQLErrorCodes {
  UNAUTHENTICATED = 'UNAUTHENTICATED'
}

export const editorConfig = {
  plugins: [
    'Alignment',
    'Autoformat',
    'AutoImage',
    'AutoLink',
    'Autosave',
    'Base64UploadAdapter',
    'BlockQuote',
    'Bold',
    'CKFinder',
    'CKFinderEditing',
    'CKFinderUploadAdapter',
    'CloudServices',
    'Code',
    'CodeBlock',
    'DataFilter',
    'DataSchema',
    'EasyImage',
    'Essentials',
    'ExportPdf',
    'ExportWord',
    'FindAndReplace',
    'Font',
    'FontBackgroundColor',
    'FontColor',
    'FontFamily',
    'FontSize',
    'GeneralHtmlSupport',
    'Heading',
    'Highlight',
    'HorizontalLine',
    'HtmlEmbed',
    'Image',
    'ImageBlockEditing',
    'ImageCaption',
    'ImageEditing',
    'ImageInlineEditing',
    'ImageInsert',
    'ImageResize',
    'ImageStyle',
    'ImageTextAlternative',
    'ImageToolbar',
    'ImageUpload',
    'ImageUtils',
    'Indent',
    'IndentBlock',
    'Italic',
    'LineHeight',
    'Link',
    'LinkEditing',
    'LinkImage',
    'LinkImageEditing',
    'List',
    'ListStyle',
    'MathType',
    'MediaEmbed',
    'MediaEmbedToolbar',
    'Mention',
    'PageBreak',
    'Paragraph',
    'PasteFromOffice',
    'RemoveFormat',
    'SpecialCharacters',
    'SpecialCharactersArrows',
    'SpecialCharactersCurrency',
    'SpecialCharactersLatin',
    'SpecialCharactersMathematical',
    'SpecialCharactersText',
    'StandardEditingMode',
    'Strikethrough',
    'Subscript',
    'Superscript',
    'Table',
    'TableCaption',
    'TableCellProperties',
    'TableKeyboard',
    'TableMouse',
    'TableProperties',
    'TableSelection',
    'TableToolbar',
    'TextPartLanguage',
    'TextTransformation',
    'TodoList',
    'Underline',
    'WordCount'
  ],
  toolbar: {
    items: [
      'heading', '|',
      'alignment', 'lineHeight', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
      'findAndReplace', '|',
      'code', 'codeBlock', 'specialcharacters', '|',
      'insertTable', '|',
      'outdent', 'indent', '|',
      'uploadImage', 'blockQuote', '|',
      'undo', 'redo'
    ]
  },
  lineHeight: {
    options: [0, 0.5, 1, 1.5, 2]
  },
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original'
      },
      {
        name: 'resizeImage:10',
        value: '10',
        icon: 'small'
      },
      {
        name: 'resizeImage:20',
        value: '20',
        icon: 'small'
      },
      {
        name: 'resizeImage:30',
        value: '30',
        icon: 'small'
      },
      {
        name: 'resizeImage:40',
        value: '40',
        icon: 'large'
      },
      {
        name: 'resizeImage:50',
        value: '50',
        icon: 'large'
      },
      {
        name: 'resizeImage:60',
        value: '60',
        icon: 'large'
      },
      {
        name: 'resizeImage:70',
        value: '70',
        icon: 'large'
      },
      {
        name: 'resizeImage:80',
        value: '80',
        icon: 'large'
      },
      {
        name: 'resizeImage:90',
        value: '90',
        icon: 'large'
      },
      {
        name: 'resizeImage:100',
        value: '100',
        icon: 'large'
      }
    ],
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      'imageStyle:inline',
      'imageStyle:side',
      'imageStyle:block',
      'imageStyle:alignBlockLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignBlockRight',
      '|',
      'toggleImageCaption',
      'imageTextAlternative',
      'linkImage',
      'resizeImage'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableproperties'
    ]
  }
}