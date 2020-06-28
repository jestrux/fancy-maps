const UI = require("./ui/index");

const initialState = {
    currentScreen: "pick",
    selectedLocation: "",
    fetchingLocation: false,
    fetchLocationError: false,
    mapType: "light",
    zoomLevel: 1,
    mapImageUrl: "",
    selectionWidth: 5,
    selectionHeight: 0,
};

let state = {};

let appUI;

function setState(...args) {
    if(typeof args[0] === 'object'){
        const newState = args[0];
        state = {...state, ...newState};
        
        if(appUI) {
            for (const [key, value] of Object.entries(newState)) {
                appUI.update(key, value);
            }
        };
    }
    else{
        const [key, value] = args;
        state[key] = value;
        if(appUI) appUI.update(key, value);
    }
}

function update(selection) {
    const { Rectangle } = require("scenegraph");
    const itemSelected = selection && selection.items.length > 0;
    
    setState({
        itemSelected,
        selectionIsValid: itemSelected && selection.items[0] instanceof Rectangle
    });

    if(!state.currentScreen){
        setState(initialState);
    }
}

function create({onApply}){
    appUI = new UI({
        state,
        setState,
        onApply: _ => onApply(state)
    });

    return appUI.panel;
}

module.exports = {
    update, 
    create
}