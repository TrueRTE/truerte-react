"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePlugins = exports.normalizePluginArray = exports.isTextarea = exports.validEvents = exports.customEvents = exports.nativeEvents = exports.uuid = void 0;
let unique = 0;
const uuid = (prefix) => {
    const time = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
exports.uuid = uuid;
exports.nativeEvents = [
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
exports.customEvents = [
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
exports.validEvents = [...exports.nativeEvents, ...exports.customEvents];
const isTextarea = (element) => (element === null || element === void 0 ? void 0 : element.tagName.toLowerCase()) === 'textarea';
exports.isTextarea = isTextarea;
const normalizePluginArray = (plugins) => {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(/[ ,]/);
};
exports.normalizePluginArray = normalizePluginArray;
const mergePlugins = (initPlugins, inputPlugins) => (0, exports.normalizePluginArray)(initPlugins).concat((0, exports.normalizePluginArray)(inputPlugins));
exports.mergePlugins = mergePlugins;
