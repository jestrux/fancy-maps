const React = require('react');
const { useState } = React;
const PickCity = require('./PickCity/index.jsx');
const Edit = require('./Edit/index.jsx');
const { useEffect } = require('react');

require('./styles-new.css');

const Editor = ({onCityChange}) => {
    const [city, setCity] = useState(null);

    useEffect(() => {
        if(city && city.name)
            onCityChange(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[city]);

    return (
        <div id="Editor" className="relative">
            <React.Fragment>
                <PickCity onCityClick={setCity} />

                { city && (
                    <Edit city={city} onChangeCity={() => setCity(null)} />
                )}
            </React.Fragment>
        </div>
    );
}

module.exports = Editor;