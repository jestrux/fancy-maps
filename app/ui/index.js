const CSS = require("./css");
const pickScreen = require("./pick-screen");
const customizeScreen = require("./customize-screen");

function UI({setState, onApply}) {
    const HTML =`
        ${ CSS }

        <div id="fancyMaps" class="fancyMaps">
            <div id="app">
                ${ pickScreen }
                ${ customizeScreen }
            </div>

            <div id="warning">
                <p>This plugin requires you to select a rectangle in the document. Please select a rectangle.</p>
            </div>
        </div>
    `;

    this.panel = document.createElement("div");
    this.panel.innerHTML = HTML;

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
    
    if(!matchingNodes.length)
        return;

    matchingNodes.forEach(node => {
        if(node.hasAttribute('x-model') && node.value !== value)
            node.value = value;
        else if(node.hasAttribute('x-text'))
            node.textContent = value;
    });
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