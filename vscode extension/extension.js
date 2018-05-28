// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// DEBUGING: https://code.visualstudio.com/docs/nodejs/reactjs-tutorial
const vscode = require('vscode');
const browserContentProvider = require("./src/browserContentProvider");
const axios = require('axios');
const home = require('os').homedir()
const fs = require('fs-extra');
const path = require('path');
const publishPackage = require('mediacentral-publish')

let server={};
require('./server/index.js')({
    openDialogBox,
    openDialogBoxFile,
    errorMessage,
    infoMessage,
    inputMessage
}).then(apps=>{
    server=apps
});

function openDialogBox(){
    return new Promise((resolve)=>{
        vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFiles: false,
            canSelectFolders: true,
            openLabel: 'Open'
        }).then(resolve);
    })
}

function openDialogBoxFile(){
    return new Promise((resolve)=>{
        vscode.window.showOpenDialog({
            canSelectMany: false,
            canSelectFiles: true,
            canSelectFolders: false,
            openLabel: 'Select key'
        }).then(resolve);
    })
}

function errorMessage(message){
    vscode.window.showErrorMessage(message);
}

function infoMessage(message){
    vscode.window.showInformationMessage(message);
}

function inputMessage(message, options){
    return new Promise((resolve)=>{
        vscode.window.showInputBox(Object.assign(options, {prompt: message})).then(resolve)
    })
}

const setPath= (path) => {
    const url = `http://${server.host}:${server.apps['new-app']}/path`;
    return axios.post(url, {path: path}, {
        headers: { "X-Requested-With": 'app-creator-tool' }
    });
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This lines of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let newProject = vscode.commands.registerCommand('extension.NewCloudUXApp', function () {
        if (!server.host) {
            vscode.window.showErrorMessage('Wait for extension to set up');
            // Opening workspace after creation
            // terminal.sendText('code --add "C:\\Users\\MOLESZCZ\\Desktop\\demo"');
        } else {
            const workspacePath = (vscode.workspace.workspaceFolders !== undefined && vscode.workspace.workspaceFolders[0].uri.fsPath) || home;
            setPath(workspacePath).then(() => {
                const provider = new browserContentProvider.BrowserContentProvider(server.host, server.apps['new-app']);
                const registration = vscode.workspace.registerTextDocumentContentProvider("http", provider);
                context.subscriptions.push(registration);
                const previewUri = provider.getUri('new-app');
                vscode.commands.executeCommand("vscode.previewHtml", previewUri, vscode.ViewColumn.Active, "New App").then(() => {
                }, (reason) => {
                    console.error(reason);
                    vscode.window.showErrorMessage(reason);
                });
            }).catch(error => {
                vscode.window.showErrorMessage(error)
            });
        }
    });

    let projectProperties = vscode.commands.registerCommand('extension.displayProjectPropertiesApp', function () {
        // The code you place here will be executed every time your command is executed
        if (vscode.workspace.workspaceFolders === undefined && server.host) {
            vscode.window.showErrorMessage('You need to open your project folder to see it\'s properties');
        } else {
            const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
            setPath(workspacePath).then(() => {
                const provider = new browserContentProvider.BrowserContentProvider(server.host, server.apps['project-properties']);
                const registration = vscode.workspace.registerTextDocumentContentProvider("http", provider);
                context.subscriptions.push(registration);
                const previewUri = provider.getUri('project-properties');
                vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Active, 'Project Properties')
            }).catch(error => {
                vscode.window.showErrorMessage(error)
            });
        }
    });

    let projectPropertiesService = vscode.commands.registerCommand('extension.displayProjectPropertiesService', function () {
        // The code you place here will be executed every time your command is executed
        if (vscode.workspace.workspaceFolders === undefined && server.host) {
            vscode.window.showErrorMessage('You need to open your project folder to see it\'s properties');
        } else {
            const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
            setPath(workspacePath).then(() => {
                const provider = new browserContentProvider.BrowserContentProvider(server.host, server.apps['project-properties-service']);
                const registration = vscode.workspace.registerTextDocumentContentProvider("http", provider);
                context.subscriptions.push(registration);
                const previewUri = provider.getUri('project-properties-service');
                vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Active, 'Project Properties')
            }).catch(error => {
                vscode.window.showErrorMessage(error)
            });
        }
    });

    let publishProject = vscode.commands.registerCommand('extension.publishProject', function () {
        // The code you place here will be executed every time your command is executed
        return vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: 'Publishing...'}, p => {
            const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
            p.report({message: 'Please enter a password to your key' })
            publishButton.hide();
            return inputMessage('Please enter a password to your key', {
                ignoreFocusOut: false,
                password: true
            }).then(input=>{
                if (input === undefined){
                    return;
                }
                let didProgress = (err, step, remaining)=>{
                    if (err) return console.error(step, err);
                    return new Promise(r=>{
                        p.report({message: `Publishing status: ${step}... (${remaining} steps remains)` })
                        setTimeout(r, 500)
                    })
                }
                return publishPackage({
                        project: workspacePath,
                        password: input,
                        didProgress: didProgress
                    }).then(data=>{
                        vscode.window.showInformationMessage('Publishing complete');
                        return data;
                    }).catch(err=>{
                        vscode.window.showErrorMessage(err.message);
                        return err;
                    }).then(data=>{
                        fs.exists(data.config.dir).then(exists=>{
                            if (!exists) return
                            return fs.remove(data.config.dir).catch(e=>{})
                        })
                    })
            }).then(data=>{
                publishButton.show();
            })
        });
    });

    let newProjectButton;
    // Create as needed
    if (!newProjectButton) {
        newProjectButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        newProjectButton.text = `$(plus) New Cloud Project`;
        newProjectButton.command = 'extension.NewCloudUXApp';
        newProjectButton.show();
    }

    let projectPropertiesButton;
    // Create as needed
    if (!projectPropertiesButton) {
        projectPropertiesButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        projectPropertiesButton.text = `$(list-unordered) Project Properties`;
        projectPropertiesButton.command = 'extension.displayProjectPropertiesApp';
        projectPropertiesButton.hide();
    }

    let projectPropertiesServiceButton;
    // Create as needed
    if (!projectPropertiesServiceButton) {
        projectPropertiesServiceButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        projectPropertiesServiceButton.text = `$(list-unordered) Project Properties`;
        projectPropertiesServiceButton.command = 'extension.displayProjectPropertiesService';
        projectPropertiesServiceButton.hide();
    }

    let publishButton;
    // Create as needed
    if (!publishButton) {
        publishButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        publishButton.text = `$(triangle-right) Publish`;
        publishButton.command = 'extension.publishProject';
        publishButton.hide();
    }

    // This if shows project properties and publish only if it detects that app is avid app based on src/package.json
    if (vscode.workspace.workspaceFolders !== undefined && server.host) {
        // First it checks if workspace is opened and server is running. Server was needed to handle file system integration
        const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const configPath = path.join(workspacePath, 'src', 'package.json');
        const configPathService = path.join(workspacePath, 'project.act');
        if(fs.existsSync(configPath)){
            // only if config file exists we check for it
            const avidAppConfig = require(configPath);
            // If it exists we make sure if it's avidd config by looking for avid property in JSON file
            if(avidAppConfig.hasOwnProperty('avid')) {
                projectPropertiesButton.show();
                publishButton.show();
            }
        }
        if (fs.existsSync(configPathService)){
            projectPropertiesServiceButton.show();
            publishButton.show();
        }
    }
    
    context.subscriptions.push(newProject);
    context.subscriptions.push(projectProperties);
    context.subscriptions.push(publishProject);
    context.subscriptions.push(projectPropertiesService);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;