const React = require('react');
const { useRef, useEffect } = React;
const { getMapUrl } = require("../../utils");
require('./styles-new.css');

function resizeImg(width, height) {
    var maxWidth = 580;
    var maxHeight = 490;
    var aspectW = width / maxWidth;
    var aspectH = height / maxHeight;

    let scaledDimensions = {
        w: width, h: height
    };

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

const Preview = ({mapLocation, zoom, type, width, height}) => {
    const mapImage = useRef(null);
    const url = getMapUrl({mapLocation, zoom, type, width, height});

    useEffect(() => {
        if(mapLocation && mapLocation.length && mapImage && mapImage.current){
            if(!mapImage.current.src || !mapImage.current.src.length)
                mapImage.current.src = url;
            else{
                mapImage.current.src = "";

                setTimeout(() => {
                    mapImage.current.src = url;
                }, 10);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapLocation, zoom, type, width, height]);

    const { w, h } = resizeImg(width, height);
    const showImage = mapLocation && mapLocation.length > 0;
    
    return (
        <div id="Preview" className="relative flex-1 flex flex-col text-center items-center justify-center overflow-y-auto">
            { (!mapLocation || !mapLocation.length) && (
                <div style={{backgroundColor: "#f8fbff"}} className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                    <div style={{backgroundColor: "#e6ecf5"}} className="w-24 h-24 rounded-full flex items-center justify-center">
                        <svg fill="#7e889a" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
                    </div>

                    <p className="text-2xl mt-5 text-gray-500">
                        Pick a location to see it's map preview.
                    </p>
                </div>
            )}

            <div className="bg-gray-200 relative" style={{width: w, height: h, opacity: showImage  ? 1 : 0}}>
                <img ref={mapImage} className="absolute w-full h-full" alt="..." />
            </div>
        </div>
    );
}

module.exports = Preview;