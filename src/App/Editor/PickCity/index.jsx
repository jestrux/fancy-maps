const React = require('react');
const { useState } = React;
const cities = require('./cities');
const cityNames = Object.keys(cities);

require('./styles-new.css');

const PickCity = ({onCityClick}) => {
    const [searchQuery, setSearchQuery] = useState("");
    let filteredCityNames = cityNames.filter(name => name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
    
    if(searchQuery.length)
        filteredCityNames = filteredCityNames.sort((a, b) => a.toLowerCase().indexOf(searchQuery.toLowerCase()) - b.toLowerCase().indexOf(searchQuery.toLowerCase()));

    return (
        <div id="PickCity" className="h-full flex flex-col">
            <div className="border-b border-grey-700 py-2 px-3">
                <h1 className="text-xl mb-1">Pick A City</h1>
                <input type="text" placeholder="Search cities, E.g. Nashville" 
                    onChange={({target}) => setSearchQuery(target.value)}
                />
            </div>
            { !filteredCityNames.length && (
                <p className="text-lg p-3">
                    No results found for <strong className="font-bold">{searchQuery}</strong>.
                </p>
            )}
            <div className="overflow-y-auto flex-1">
                <div className="mb-1 p-2 flex flex-wrap" style={{gridAutoRows: "max-content"}}>
                    {
                        filteredCityNames.map(city => (
                            <div className="p-2" style={{width: "50%"}}>
                                <div className="cursor-pointer hover:opacity-50 city-item text-center group"
                                    onClick={() => onCityClick({name: city, image: cities[city]})}
                                >
                                    <div className="image relative">
                                        <img className="absolute w-full h-full" 
                                            src={cities[city]} loading="lazy" alt="..." />
                                    </div>
                                    <p>{city.split(", ")[0]}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

module.exports = PickCity;