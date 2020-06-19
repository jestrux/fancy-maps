const reactShim = require("./react-shim");
const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./App/index.jsx");

function main(selection) {
    let dialog;

    function getDialog() {
        if (dialog == null) {
            dialog = document.createElement("dialog");
            dialog.style.padding = "0";
            ReactDOM.render(<App dialog={dialog} selection={selection} />, dialog);
        }
        return dialog
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