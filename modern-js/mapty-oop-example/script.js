'use strict';

/*
User story: Description of the application's functionality from the user's perspective
Common format: As a [type of user], I want [an action] so that [a benefit]

In the real-world, you don't have to come with the final flowchart right in the
planning phase. It's normal that it changes throughout implementation!
*/

/*
User story -> Features -> Flowchart -> Architecture -> Implementation
*/

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(
            1
        )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;

        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;

        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const run1 = new Running([123, -12], 5.2, 24, 178);
const cycling1 = new Cycling([123, -12], 27, 41, 145);

// Application Architecture
class App {
    #map;
    #mapZoomLevel = 15;
    #mapEvent;
    #workouts = [];

    constructor() {
        // Get user's position
        this._getPosition();

        // Get data from local storage
        this._getLocalStorage();

        // Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener(
            'click',
            this._moveToPopup.bind(this)
        );
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert('Could not get your position');
                }
            );
        }
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;

        const coords = [latitude, longitude];

        console.log(
            `https://www.google.com/maps/@${latitude},${longitude},11z?hl=vi-VN`
        );

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.#map);

        var marker = L.marker(coords).addTo(this.#map);

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this));

        this.#workouts.forEach((workout) => {
            this._renderWorkoutMarker(workout);
        });
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        // Empty inputs
        inputDistance.value = inputDuration.value = '';
        inputCadence.value = inputElevation.value = '';

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => {
            form.style.display = 'grid';
        }, 1000);
    }

    _toggleElevationField() {
        inputElevation
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
        inputCadence
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        const validInputs = (...inputs) =>
            inputs.every((input) => Number.isFinite(input));
        const allPositive = (...inputs) => inputs.every((input) => input > 0);

        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        let workout;
        const { lat, lng } = this.#mapEvent.latlng;

        // If workout running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;

            // Check if data is valid
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert('Inputs have to be positive numbers!');

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // If workout cyclying, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            // Check if data is valid
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration, elevation)
            )
                return alert('Inputs have to be positive numbers!');

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to workout array
        this.#workouts.push(workout);

        // Render workout on map as marker
        this._renderWorkoutMarker(workout);

        // Render workout on list
        this._renderWorkout(workout);

        // Hide form + Clear input fields
        this._hideForm();

        // Set local storage to all workouts
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(
                `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${
                    workout.description
                }`
            )
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${
            workout.id
        }">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${
                        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
                    }</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                    </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;

        if (workout.type === 'running') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(
                        1
                    )}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `;
        }

        if (workout.type === 'cycling') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(
                        1
                    )}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰️</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `;
        }

        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        if (!workoutEl) return;

        const workout = this.#workouts.find(
            (w) => w.id === workoutEl.dataset.id
        );

        if (!workout) return;

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });

        // using the public interface
        workout.click();
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach((workout) => {
            this._renderWorkout(workout);
        });
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();