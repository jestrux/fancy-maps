const React = require('react');

require('./styles-new.css');

const types = ["hyb", "sat", "light", "dark"];

const Edit = ({city, zoom, type, onChangeCity, onTypeChange, onZoomChange }) => {
    return (
        <div id="EditMap" className="h-full flex flex-col absolute inset-0 p-4">
            <span className="text-xl pt-3">Selected Location</span>
            <div className="mt-3 mb-10 city-preview bg-white shadow border border-grey-900 rounded py-3 pl-3 flex items-center">
                <div className="image rounded overflow-hidden mr-3">
                    <img src={city.image} alt=""/>
                </div>

                <div className="flex-1 text-lg">
                    {city && city.name ? city.name.split(", ")[0] : ""}
                </div>

                <button className="mr-0" uxp-variant="primary"
                    uxp-quiet="true"
                    onClick={onChangeCity}
                >
                    Change
                </button>
            </div>

            <span className="text-xl font-normal">Type</span>
            <div className="flex items-center mt-3 mb-10">
                { types.map(t => (
                    <div className="mr-3" key={t} style={{width: "20%"}}>
                        <div className="rounded-full mb-1 cursor-pointer" style={{padding: "2px", backgroundColor: `${t === type ? '#a6afbd' : ''}`}}
                        onClick={() => onTypeChange(t)}>
                            <div style={{paddingBottom: "100%", backgroundColor: "rgb(250, 251, 253)"}} className="image relative rounded-full overflow-hidden">

                                <div style={{backgroundColor: "rgba(0, 0, 0, 0.087)"}} className="absolute inset-0 flex items-center justify-center">
                                    { t }
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>

            <span className="text-xl font-normal">Zoom Level</span>
            <div className="mt-3">
                <input type="range" min={8} max={24} 
                    value={zoom} 
                    onChange={({target}) => onZoomChange(target.value)}
                />
            </div>
        </div>
    );
}

module.exports = Edit;