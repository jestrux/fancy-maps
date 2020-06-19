const React = require('react');
const PickCity = require('./PickCity/index.jsx');
const Edit = require('./Edit/index.jsx');

require('./styles-new.css');

const Editor = (props) => {
    return (
        <div id="Editor" className="relative">
            <PickCity 
                onCityClick={props.onCityChange} 
            />

            { props.city && props.city.name && (
                <Edit
                    onChangeCity={() => props.onCityChange(null)}
                    {...props}
                />
            )}
        </div>
    );
}

module.exports = Editor;