module.exports = `
    <div id="customizeScreen">
        <h1 x-text="selectedLocation"> </h1>

        <div class="button" uxp-variant="cta" @click="onApply">Apply Map</div>

        <button class="block" @click="changeLocation">Change Location</button>
    </div>
`;