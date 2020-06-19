const React = require('react');
const { useState } = React;
const Editor = require("./Editor/index.jsx");
const Preview = require("./Preview/index.jsx");

require('./tailwind.min.css');
require('./styles-new.css');

const XdMaps = ({dialog}) => {
    const [city, setCity] = useState({});

    return (
        <div id="xdMaps" className="flex">
            <Editor onCityChange={setCity} />

            <div className="bg-white border-l border-grey-500 flex-1 flex flex-col">
                <Preview mapLocation={city ? city.name : null} />

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