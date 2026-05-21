import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const changeListener = vscode.workspace.onDidChangeTextDocument((event) => {
        if (event.document.languageId !== 'typst') return;

        const editor = vscode.window.activeTextEditor;
        if (!editor || event.contentChanges.length === 0) return;

        const change = event.contentChanges[0];
        if (change.text !== ' ') return;

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

export function deactivate() {}