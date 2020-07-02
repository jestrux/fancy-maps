const { create, update, setState } = require("./app/index");
const { downloadImage, getMapUrl } = require("./app/utils");
const { error } = require("./xd-utils/index");

let panel;

function applyMap(state){
    const { ImageFill } = require("scenegraph");

    require("application").editDocument(async (selection) => {
        const {selectedLocation, zoomLevel, mapType, width, height} = state;
        const url = getMapUrl({selectedLocation, zoomLevel, mapType, width, height});

        setState("loading", true);
        try {
            const tempFile = await downloadImage(url);

            const imageFill = new ImageFill(tempFile);
            const node = selection.items[0];
            node.fill = imageFill;
            node.fillEnabled = true;
            setState("loading", false);
        } catch (errMsg) {
            console.log("Error applying fill:", errMsg);
            await error("Error", errMsg);
            setState({loading: false, error: errMsg});
            return;
        }
    });
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
