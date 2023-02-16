import { boxImages } from '../../db/boxesImg';
import { IBoxReq } from '../../types/requestTypes';

export function drawBoxTitle(box: IBoxReq, userId: string) {
    const active1 = window.location.pathname.split('/').length === 3 ? 'active' : '';
    const active2 =
        window.location.pathname.split('/').length > 3 && window.location.pathname.split('/')[3].includes('card')
            ? 'active'
            : '';
    const active3 =
        window.location.pathname.split('/').length > 3 && window.location.pathname.split('/')[3].includes('ward')
            ? 'active'
            : '';
    console.log(window.location.pathname.split('/').length);
    return `<div class="box__menu-wrapper">
<div class="box__menu">
<div class="box__info">
  <div id="curr-box" class="box-img">${boxImages[box.box_img]}</div>
  <div class="box-description">
      <h4>${box.box_name}</h4>
      <div class="description-bottom">
      <div> <span>Участников: ${box.cards_id.length}</span>
      <div class="dot"></div></div>
      <div  class="admin"><span>Организатор:</span> <span class="admin-name">${
          userId && box.admin_id === Number(userId) ? 'Вы организатор' : box.admin_name
      }</span></div>
      </div>
  </div>
</div>
<div class="box__toggle">
  <div class="toggle-menu">
      <div class="toggle-menu-panel">
          <div class="toggle-menu-item--slider num-1 ${active1}"></div>
          <div class="toggle-menu-item--slider num-2 ${active2}"></div>
          <div class="toggle-menu-item--slider num-3 ${active3}"></div>
      </div>
      <div id="num-1" class="toggle-menu-item ${active1}">
          <span class="txt">Участники</span>
      </div>
      <div id="num-2" class="toggle-menu-item ${active2}"><span class="txt">Моя карточка</span></div>
      <div id="num-3" class="toggle-menu-item ${active3}"><span class="txt">Подопечный</span></div>
  </div>
  ${
      userId && box.admin_id === Number(userId)
          ? `
  <div id="setting" class="toggle-menu-button">
  <div class="toggle-menu-button--inner">
      <span class="svg settings" style="width: 24px; height: 24px; background: none"
          ><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style="width: 1.5rem; height: 1.5rem; background: none"
          >
              <path
                  d="M12.8 3v0a1 1 0 01.941.662l.508 1.415v0c.08.223.237.41.442.528l1.507.87v0a1 1 0 00.677.118l1.48-.267v0a1 1 0 011.045.484l.8 1.38v0a1 1 0 01-.1 1.146l-.97 1.148v0a1 1 0 00-.238.646v1.74a1 1 0 00.237.646l.971 1.148v0a1 1 0 01.1 1.146l-.8 1.38v0a1 1 0 01-1.044.484l-1.48-.267v0a1 1 0 00-.677.118l-1.507.87v0a1.005 1.005 0 00-.442.528l-.508 1.415v0A1 1 0 0112.8 21h-1.6v0a1 1 0 01-.94-.662l-.509-1.415v0a1.009 1.009 0 00-.44-.528l-1.509-.87v0a1 1 0 00-.677-.118l-1.48.267v0A1 1 0 014.6 17.19l-.8-1.38v0a1 1 0 01.1-1.146l.971-1.148v0a1 1 0 00.237-.646v-1.74 0a1 1 0 00-.237-.646l-.96-1.148v0a1 1 0 01-.1-1.146l.8-1.38v0a1 1 0 011.043-.484l1.48.267v0a1 1 0 00.677-.118l1.508-.87h0c.204-.119.36-.306.441-.528l.508-1.415v0A1 1 0 0111.2 3h1.6z"
                  stroke="#333640"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              ></path>
              <path
                  d="M12 14.75a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z"
                  stroke="#333640"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              ></path></svg
      ></span>
  </div></div>`
          : ''
  }
</div></div>
</div>`;
}
