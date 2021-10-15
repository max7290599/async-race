import { CarModel } from '../models/car-model';
import { renderCarImage } from './render-car-image';

export const renderCar = (car: CarModel): string => `
<div class="general-buttons">
  <button class="button select-button" id="select-car-${car.id}">Select</button>
  <button class="button remove-button" id="remove-car-${car.id}">Remove</button>
  <span class="car-name">${car.name}</span>
</div>
<div class="road">
  <div class="launch-pad">
    <div class="control-panel">
        <button class="icon start-engine-button"
        id="start-engine-car-${car.id}"
        ${car.isEngineStarted ? 'disabled' : ''}>A</button>
      <button class="icon stop-engine-button"
        id="stop-engine-car-${car.id}"
        ${!car.isEngineStarted ? 'disabled' : ''}>B</button>
    </div>
  </div>
  <div class="road-tracy">
    <div class="car" id="car-${car.id}">
      ${renderCarImage(car.color)}
    </div>
    <div class="flag" id="flag-${car.id}">&#127937</div>
</div>
`;
