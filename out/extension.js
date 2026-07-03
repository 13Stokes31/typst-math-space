"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    const changeListener = vscode.workspace.onDidChangeTextDocument((event) => {
        if (event.document.languageId !== 'typst') {
            return;
        }
        const editor = vscode.window.activeTextEditor;
        if (!editor || event.contentChanges.length === 0) {
            return;
        }
        const change = event.contentChanges[0];
        if (change.text !== ' ') {
            return;
        }
        const document = editor.document;
        const position = editor.selection.active;
        const lineText = document.lineAt(position.line).text;
        const pos = position.character;
        // Caso: $ _ $ (cursor justo después del $ abierto, antes del espacio)
        if (pos >= 1 && lineText[pos - 1] === '$' && lineText[pos] === ' ' && lineText[pos + 1] === '$') {
            const range = new vscode.Range(position.translate(0, -1), position.translate(0, 2));
            editor.insertSnippet(new vscode.SnippetString('$ $0 $'), range);
        }
        // Caso: $  _ $ (cursor justo después del espacio, antes del $ cierre)
        else if (pos >= 2 && lineText[pos - 2] === '$' && lineText[pos - 1] === ' ' && lineText[pos] === '$') {
            const range = new vscode.Range(position.translate(0, -2), position.translate(0, 1));
            editor.insertSnippet(new vscode.SnippetString('$ $0 $'), range);
        }
    });
    context.subscriptions.push(changeListener);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map