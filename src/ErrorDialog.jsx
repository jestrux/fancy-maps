const React = require('react');
const { Text, Color } = require("scenegraph");

function ErrorDialog(props){
    function onDoneClick(e){
        // const selection = this.props.selection;
        // const newText = new Text();
        // newText.text = this.state.name;
        // newText.styleRanges = [{
        //     length: newText.text.length,
        //     fill: new Color("#00F"),
        //     fontSize: 50
        // }];
        // selection.insertionParent.addChild(newText);
        // newText.moveInParentCoordinates(100, 100);
        props.dialog.close();
    }

    const error = props.error && props.error.length ? props.error : "Unknown error!";

    return (
        <form style={{ width: 300, padding: "0" }} onSubmit={onDoneClick}>
            <h1>{ error }</h1>
            <footer style={{ padding: "0" }}>
                <button type="submit" uxp-variant="cta">Done</button>
            </footer>
        </form>
    );
}

module.exports = ErrorDialog;