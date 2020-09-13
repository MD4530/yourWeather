
import { fetchRequest } from './fetchRequest.mjs';
import { weatherForecastM } from './process.mjs';
import { about } from './base-function.mjs';

function main() {
    document.addEventListener('DOMContentLoaded', (e) => {
        // condition check for which page user are in.
        if (e.target.activeElement.id === 'index') {
            fetchRequest();
            document.getElementById('leftSide').className = '';
            document.getElementById('rightSide').className = '';
        } else if (e.target.activeElement.id === 'forecastBody') {
            weatherForecastM();
        } else {
            about();
            document.getElementById('leftSide').className = 'hidden';
            document.getElementById('rightSide').className = 'hidden';
        }

    });
}

main();