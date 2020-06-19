const React = require('react');
const { useRef, useEffect } = React;
const worldMap = require('./world-map.png');
require('./styles-new.css');

function resizeImg(width, height) {
    var maxWidth = 600;
    var maxHeight = 420;
    var aspectW = width / maxWidth;
    var aspectH = height / maxHeight;

    let scaledDimensions = {};

    if (aspectW > 1 || aspectH > 1) {
        if (aspectW > aspectH) {
            scaledDimensions.w = maxWidth;
            scaledDimensions.h = height / aspectW;
        }
        else {
            scaledDimensions.w = width / aspectH;
            scaledDimensions.h = maxHeight;
        }
    }

    return scaledDimensions;
}

const Preview = ({mapLocation, zoom = 16, type = "hyb", width = 800, height = 1000}) => {
    const mapImage = useRef(null);
    
    let url = "https://www.mapquestapi.com/staticmap/v5/map?key=WeIoVZDtlQwX3HwGpXiNjk12Ca9eQJUm";
    url += `&center=${mapLocation}`;
    url += `&zoom=${zoom}&type=${type}`;
    url += `&size=${width},${height}`;

    useEffect(() => {
        if(mapLocation && mapLocation.length && mapImage && mapImage.current){
            mapImage.current.src = "";

            setTimeout(() => {
                mapImage.current.src = url;
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapLocation]);

    const { w, h } = resizeImg(width, height);
    
    return (
        <div id="Preview" className="flex-1 flex flex-col text-center items-center justify-center overflow-y-auto">
            { (!mapLocation || !mapLocation.length) && (
                <div style={{backgroundColor: "#f8fbff"}} className="w-full h-full flex flex-col items-center justify-center">
                    <img src={worldMap} alt=""/>
                    <h1 className="text-2xl mt-5 text-gray-500">
                        Pick a location to see it's map preview.
                    </h1>
                </div>
            )}

            { mapLocation && mapLocation.length > 0 && (
                <React.Fragment>
                    <h1 className="text-2xl mb-5">{mapLocation}</h1>
                    <div className="bg-gray-200 relative" style={{width: w, height: h}}>
                        <img ref={mapImage} className="absolute w-full h-full" alt="..."/>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

module.exports = Preview;