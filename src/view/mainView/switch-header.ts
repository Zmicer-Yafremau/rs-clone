import { animateNavigation } from './animate-navigation';
import { createNote } from './create-note';
import { UserBoxes } from '../../model/userBoxes';
import { Box } from '../../model/box';
export function switchHeader(name = '') {
    const NAVIGATION = document.getElementsByClassName('navigation')[0] as HTMLDivElement;
    if (name) {
        NAVIGATION.innerHTML = `
      <nav class="nav">
        <a href="/account/boxes" class="nav__link text-dark mx-2"><span class="nav__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg></span>  <span class="mx-2">Коробки</span>
        </a>
        <div class="text-dark mx-2" id="parent">
            <div id="notifications" aria-expanded="false">
              <span class="nav__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                </svg>
              </span>  
              <span class="mx-2">Уведомления</span>
            </div>
        </div>  
        <a href="/account/" class="nav__link text-dark mx-2"><span class="nav__icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg></span><span class="mx-2">${name}</span></span>
        </a>
  </nav>
  `;
        const NOTIFICATIONS = document.getElementById('notifications') as HTMLDivElement;
        const NOTIFICATIONS_CONTENT = document.getElementsByClassName(`notifications__content`)[0] as HTMLDivElement;
        if (NOTIFICATIONS) {
            NOTIFICATIONS?.addEventListener(
                'click',
                (event) => {
                    event.stopImmediatePropagation();
                    NOTIFICATIONS.classList.toggle('active');
                    console.log(event.target);
                    if (NOTIFICATIONS.classList.contains('active')) {
                        animateNavigation(0, 580, 20, NOTIFICATIONS_CONTENT);
                    } else {
                        animateNavigation(580, 0, -20, NOTIFICATIONS_CONTENT);
                    }
                },
                false
            );
        }
    } else {
        NAVIGATION.innerHTML = `
      <span class="navigation__reg">
      <a href="/login" class="nav__link">Вход и регистрация</a>
  </span>`;
    }
    const U_BOXES = new UserBoxes();
    const BOXES = new Box();
    setTimeout(async () => {
        const U_BOX_ARR = await U_BOXES.getByUserId(localStorage.id);
        const NAME_ARR = [];
        for (const box_id of U_BOX_ARR[0].user_boxes) {
            const BOX_OBJ = await BOXES.getByBoxId(box_id);
            if (BOX_OBJ.is_draw) {
                NAME_ARR.push(BOX_OBJ.box_name);
            }
        }
        const UNIC_BOX = Array.from(new Set(NAME_ARR));
        const NOTIFICATIONS_CONTENT = document.getElementsByClassName(`notifications__content`)[0] as HTMLDivElement;
        console.log('hello');
        if (UNIC_BOX.length) {
            for (const box_name of UNIC_BOX) {
                createNote(`В коробке ${box_name} прошла жеребьёвка`);
            }
        } else {
            NOTIFICATIONS_CONTENT.innerHTML = '';
            createNote('Уведомлений нет');
        }

        if (NOTIFICATIONS_CONTENT) {
            NOTIFICATIONS_CONTENT.addEventListener(
                'click',
                (event) => {
                    event.stopImmediatePropagation();
                    const ELEMENT = event.target as HTMLElement;
                    console.log('E', ELEMENT);
                    if (ELEMENT.classList.contains('note__close')) {
                        const TO_REMOVE = ELEMENT.parentNode?.parentNode as HTMLDivElement;
                        TO_REMOVE?.remove();
                    }
                },
                false
            );
        }
    }, 0);
    animateNavigation(-100, 0, 2.5, NAVIGATION.children[0] as HTMLElement);
}
