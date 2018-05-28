"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class BrowserContentProvider {
    constructor(host, port) {
        this._onDidChange = new vscode.EventEmitter();
        this.port = port;
        this.host = host;
        this.getUri = this.getUri.bind(this);
    }
    provideTextDocumentContent() {
        const uri = this.getUri()
        return `<style>iframe { background-color: white } </style>
                <iframe src="${uri}" frameBorder="0" width="100%" height="1000px" />`;
    }
    get onDidChange() {
        return this._onDidChange.event;
    }
    update(uri) {
        this._onDidChange.fire(uri);
    }
    getUri(path){
        if (path)
            return vscode.Uri.parse(`http://${this.host}:${this.port}/${path}`);
        return vscode.Uri.parse(`http://${this.host}:${this.port}/`);
    }
}
exports.BrowserContentProvider = BrowserContentProvider;
//# sourceMappingURL=browserContentProvider.js.map