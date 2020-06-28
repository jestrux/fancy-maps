const { create, update } = require("./app/index");
let panel;

function applyMap(state){
    console.log("State: ", state);
}

function show(event) {
    if (!panel) {
        panel = create({
            onApply: applyMap
        });
        event.node.appendChild(panel);
    }
}

module.exports = {
    panels: {
        enlargeRectangle: {
            show,
            update: () => {
                const { selection } = require("scenegraph");
                update(selection);
            }
        }
    }
};
