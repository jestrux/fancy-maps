const CSS = require("./css");
const pickScreen = require("./pick-screen");
const { getMapUrl } = require("../utils");
const customizeScreen = require("./customize-screen");

function UI({state, setState, onApply}) {
    const HTML =`
        ${ CSS }

        <div id="fancyMaps" class="fancyMaps">
            <div id="app">
                ${ pickScreen }
                ${ customizeScreen }
            </div>

            <div id="warning">
                <p style="margin: 1rem 0; font-size: 0.9rem">Please select a shape to start your travels.</p>
                <img width="100%" src="images/empty-space.png" alt="..." />
            </div>

            <div id="loader">
                <div id="loaderContent" class="text-center">
                    <img width="80px" src="images/loader.png" alt="..." />
                    <p>
                        Heading to your destination...
                    </p>
                </div>
                
                <img src="images/shadow.png" />
            </div>
        </div>
    `;

    this.panel = document.createElement("div");
    this.panel.innerHTML = HTML;

    this.state = state;

    this.methods = {
        setState,
        onApply,
        submitLocation: () => {
            setState('currentScreen', 'customize');
        },
        changeLocation: () => {
            setState('currentScreen', 'pick');

            setTimeout(() => {
                document.querySelector("#locationInput").focus();
            }, 50);
        },
    };
    
    this.setupEventListeners();

    for (const [key, value] of Object.entries(this.state)) {
        this.update(key, value);
    }
}

UI.prototype.setupEventListeners = function(){
    this.panel.querySelectorAll("[x-model], [@click], [@submit]").forEach(node => {
        if(node.hasAttribute('x-model')){
            const modelAttr = node.getAttribute("x-model");
            node.addEventListener("input", ({target}) => this.methods.setState(modelAttr, target.value));
        }
        else if(node.hasAttribute('@click') || node.hasAttribute('@submit')){
            const isButton = node.hasAttribute('@click');
            const actionAttr = isButton ? node.getAttribute("@click") 
                : node.getAttribute("@submit");

            const [functionName, argString] = actionAttr.replace(')', '').split('(');
            const args = argString ? argString.replace(/'|\s/g, '').split(',') : [];
            node.addEventListener(`${isButton ? 'click' : 'submit'}`, _ => this.methods[functionName](...args));
        }
    });
}

UI.prototype.applyDataBinding = function(key, value){
    const matchingNodes = Array.from(this.panel.querySelectorAll(`[x-model="${key}"], [x-text="${key}"]`));
    
    if(matchingNodes.length){
        matchingNodes.forEach(node => {
            if(node.hasAttribute('x-model') && node.value !== value)
                node.value = value;
            else if(node.hasAttribute('x-text'))
                node.textContent = value;
        });
    }


    this.state[key] = value;

    const urlDeps = ["selectedLocation", "zoomLevel", "mapType"];
    
    if(urlDeps.includes(key)){
        const {selectedLocation, zoomLevel, mapType} = this.state;
        const url = getMapUrl({selectedLocation, zoomLevel, mapType, width: 400, height: 300});
        const mapPreview = document.querySelector("#mapPreview");

        if(!mapPreview.src || !mapPreview.src.length)
            mapPreview.src = url;
        else{
            mapPreview.src = "";

            setTimeout(() => {
                mapPreview.src = url;
            }, 10);
        }
    }
}

UI.prototype.update = function(key, value){
    const el = document.querySelector("#fancyMaps");

    if(key === 'observe' || !el || !el.className)
        return;

    var prefix = `ui-${key}-`;
    var classes = el.className.split(" ").filter(c => c.indexOf(prefix, 0) !== 0);
    el.className = classes.join(" ").trim() + ` ${prefix + value}`;

    this.applyDataBinding(key, value);
}

module.exports = UI;