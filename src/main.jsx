const reactShim = require("./react-shim");
const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./App/index.jsx");
const ErrorDialog = require("./ErrorDialog.jsx");

function main(selection) {
    let dialog;

    function getDialog() {
        // const supportedNodes = ["Artboard", "Rectangle", "Ellipse"];
        const supportedNodes = ["Artboard", "Rectangle"];
        
        if (!selection || !selection.items || !selection.items.length)
            return getErrorDialog("Nothing selected!");
        else if(!supportedNodes.includes(selection.items[0].constructor.name))
            return getErrorDialog(`${selection.items[0].constructor.name} is not supported!`);
        else
            return getAppDialog();
    }
    
    function getAppDialog() {
        if (dialog == null) {
            dialog = document.createElement("dialog");
            dialog.style.padding = "0";
            ReactDOM.render(<App dialog={dialog} selection={selection} />, dialog);
        }
        return dialog;
    }
    
    function getErrorDialog(error) {
        if (dialog == null) {
            dialog = document.createElement("dialog");
            dialog.style.padding = "0";
            ReactDOM.render(<ErrorDialog dialog={dialog} error={error} />, dialog);
        }
        return dialog;
    }

    return document.body.appendChild(getDialog()).showModal().then(result => {
        console.log("dialog closed")
    })
}

module.exports = {
    commands: {
        main
    }
};