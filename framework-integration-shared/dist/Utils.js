let unique = 0;
export const uuid = (prefix) => {
    const time = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
export const nativeEvents = [
    'BeforePaste',
    'Blur',
    'Click',
    'CompositionEnd',
    'CompositionStart',
    'CompositionUpdate',
    'ContextMenu',
    'Copy',
    'Cut',
    'Dblclick',
    'Drag',
    'DragDrop',
    'DragEnd',
    'DragGesture',
    'DragOver',
    'Drop',
    'Focus',
    'FocusIn',
    'FocusOut',
    'Input',
    'KeyDown',
    'KeyPress',
    'KeyUp',
    'MouseDown',
    'MouseEnter',
    'MouseLeave',
    'MouseMove',
    'MouseOut',
    'MouseOver',
    'MouseUp',
    'Paste',
    'SelectionChange',
];
export const customEvents = [
    'Activate',
    'AddUndo',
    'BeforeAddUndo',
    'BeforeExecCommand',
    'BeforeGetContent',
    'BeforeRenderUI',
    'BeforeSetContent',
    'Change',
    'ClearUndos',
    'CommentChange',
    'Deactivate',
    'Dirty',
    'ExecCommand',
    'GetContent',
    'Hide',
    'IconsLoadError',
    'Init',
    'LoadContent',
    'LanguageLoadError',
    'ModelLoadError',
    'NodeChange',
    'ObjectResizeStart',
    'ObjectResized',
    'ObjectSelected',
    'PluginLoadError',
    'PostProcess',
    'PostRender',
    'PreProcess',
    'ProgressState',
    'Redo',
    'Remove',
    'Reset',
    'ResizeEditor',
    'SaveContent',
    'SetAttrib',
    'SetContent',
    'Show',
    'SkinLoadError',
    'Submit',
    'ThemeLoadError',
    'Undo',
    'VisualAid',
];
export const validEvents = [...nativeEvents, ...customEvents];
export const isTextarea = (element) => (element === null || element === void 0 ? void 0 : element.tagName.toLowerCase()) === 'textarea';
export const normalizePluginArray = (plugins) => {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(/[ ,]/);
};
export const mergePlugins = (initPlugins, inputPlugins) => normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
