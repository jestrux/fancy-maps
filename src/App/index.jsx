const React = require('react');
const { useState } = React;
const Editor = require("./Editor/index.jsx");
const Preview = require("./Preview/index.jsx");

require('./tailwind.min.css');
require('./styles-new.css');

const XdMaps = ({dialog}) => {
    const dar = {
        name: "Dar es Salaam",
        image: "https://d13k13wj6adfdf.cloudfront.net/urban_areas/dar-es-salaam-0106cbeeb1.jpg"
    };

    const [city, setCity] = useState({});
    const [zoom, setZoom] = useState(16);
    const [type, setType] = useState("hyb");
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(1000);

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
                    <div className="flex-1"></div>

                    <button uxp-variant="primary"
                        className="mr-2"
                        onClick={() => dialog.close()}
                    >
                        Cancel
                    </button>
                    
                    <button disabled={!city || !city.name || !city.name.length} 
                        onClick={() => dialog.close()} uxp-variant="cta">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

module.exports = XdMaps;