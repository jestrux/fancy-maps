const UI = require("./ui/index");

const initialState = {
    currentScreen: "pick",
    selectedLocation: "New York",
    fetchingLocation: false,
    fetchLocationError: false,
    mapType: "light",
    zoomLevel: 8,
    mapImageUrl: "",
    width: 150,
    height: 90,
    loading: false
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
    const selectionIsValid = itemSelected && selection.items[0] instanceof Rectangle;

    setState({
        itemSelected,
        selectionIsValid
    });

    if(!state.currentScreen){
        setState(initialState);
    }

    if(itemSelected){
        const { width, height } = selection.items[0];
        setState({width, height});
    }
}

function create({onApply}){
    appUI = new UI({
        state: initialState,
        setState,
        onApply: _ => onApply(state)
    });

    return appUI.panel;
}

module.exports = {
    update, 
    create,
    setState
}