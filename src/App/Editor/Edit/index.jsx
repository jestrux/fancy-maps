const React = require('react');

require('./styles-new.css');

const Edit = ({city, onChangeCity}) => {
    return (
        <div id="EditMap" className="h-full flex flex-col absolute inset-0">
            <div className="p-3">
                <div className="city-preview bg-white shadow rounded p-3 flex items-center">
                    <div className="image rounded overflow-hidden mr-3">
                        <img src={city.image} alt=""/>
                    </div>

                    <h1>{city.name.split(", ")[0]}</h1>

                    <button uxp-variant="primary"
                        className="ml-auto"
                        onClick={onChangeCity}
                    >
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
}

module.exports = Edit;