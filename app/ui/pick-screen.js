module.exports = `
    <div id="pickScreen">
        <form class="row break" method="dialog" @submit="submitLocation">
            <input id="locationInput" placeholder="Enter location" 
                x-model="selectedLocation"
            />

            <div class="button" uxp-variant="action" @click="submitLocation">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
            </div>
        </form>
    </div>
`;