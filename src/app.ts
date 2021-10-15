import { getForm } from './component/form';
import { getRenderNav } from './component/nav';
import { renderPagination } from './component/pagination';
import { renderWinners } from './component/winner';

export const render = async (): Promise<void> => {
  const html = `
    ${getRenderNav()}
    <div id="garage-view">
      ${getForm('create')}
      ${getForm('update')}
      <div class="race-controls">
        <button class="button race-button primary" id="race">Race</button>
        <button class="button reset-button primary" id="reset">Reset</button>
        <button class="button generator-button" id="generator">Generate cars</button>
      </div>
      <div id="garage"></div>
      <div>
        <p class="message" id="message"></p>
      </div>
    </div>
    <div id="winners-view" style="display: none">
      ${renderWinners()}
    </div>
  ${renderPagination()}
  `;
  const root = document.createElement('div');
  root.insertAdjacentHTML('afterbegin', html);
  document.body.appendChild(root);
};
