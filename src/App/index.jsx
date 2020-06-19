const React = require('react');
const { useState, useEffect } = React;
const { ImageFill } = require("scenegraph");

const Editor = require("./Editor/index.jsx");
const Preview = require("./Preview/index.jsx");

const { error } = require("../xd-utils/dialogs");
const { downloadImage, getMapUrl } = require("../utils");

require('./tailwind.min.css');
require('./styles-new.css');

const XdMaps = ({dialog, selection}) => {
    const [city, setCity] = useState({});
    const [zoom, setZoom] = useState(16);
    const [type, setType] = useState("hyb");
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(1000);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const node = selection.items[0];
        setWidth(parseInt(node.width));
        setHeight(parseInt(node.height));
    }, [selection]);

    async function setMapImageAsFill(){
        setApplying(true);
        try {
            const url = getMapUrl({mapLocation: city.name, zoom, type, width, height});
            const tempFile = await downloadImage(url);
            const imageFill = new ImageFill(tempFile);
            const node = selection.items[0];
            node.fill = imageFill;
            node.fillEnabled = true;
            setApplying(false);
        } catch (errMsg) {
            console.log("Error applying fill:", errMsg);
            await error("Error", errMsg);
            setApplying(false);
            return;
        }
    }

    return (
        <div id="xdMaps" className="flex">
            <Editor 
                city={city}
                zoom={zoom}
                type={type}
                onCityChange={setCity}
                onTypeChange={setType}
                onZoomChange={setZoom}
            />

            <div className="bg-white border-l border-grey-500 flex-1 flex flex-col">
                <Preview 
                    mapLocation={city ? city.name : null} 
                    zoom={zoom}
                    type={type}
                    width={width}
                    height={height}
                />

                <div id="appActions" className="border-t border-grey-500 py-2 px-3 flex items-center">
                    <div className="flex-1 flex items-center">
                        { applying && (
                            <span>Saving image...</span>
                        ) }
                    </div>

                    <button uxp-variant="primary"
                        className="mr-2"
                        disabled={applying}
                        onClick={() => dialog.close()}
                    >
                        Cancel
                    </button>
                    
                    <button disabled={!city || !city.name || !city.name.length || applying}
                        onClick={setMapImageAsFill} uxp-variant="cta">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

module.exports = XdMaps;