import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { drawBoxTitle } from '../boxView/boxTitle';
import { addUsrPics } from '../newBoxView/add-usr-pics';

export class EditCardView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

  async render(path: string) {
    const boxId = Number(path);
    const box = await this.controller.boxesController.getBox(boxId);
    const userId = localStorage.getItem('id');
    userId ? userId : null;
    const cards = await this.controller.cardController.getCard(box.box_id);
    const cardId = cards?.find((card) => card.user_id === Number(userId));

      this.root.innerHTML = `
      <div class="box__view">
      ${box && userId ? drawBoxTitle(box, userId) : ''}
  
      <div class="box__edit  box">
      <div class="edit-card__wrapper container">
          <div class="section">
              <h4>Настройки карточки</h4>
          </div>
          <div class="section">
                      <div class="col-4"><h5 class="">Имя и телефон</h5></div>
                      <div class="wrapper__name-phone">
                      <div class="check-section input">
                      <div class="input-box">
                          <label for="inputNameUser" >Ваше имя</label>
                          <input
                              type="text"
                              class="form-control"
                              id="inputNameUser"
                              placeholder=""
                              minlength="1"
                              value="${cardId?.user_name}" 
                          />
                          </div>
                      </div>
                      <div class="check-section input">
                      <div class="input-box">
                          <label for="inputNumberPhone" >Номер телефона</label>
                          <input
                              type="text"
                              class="form-control"
                              id="inputNumberPhone"
                              placeholder=""
                              minlength="1" 
                              value="${cardId?.phone}" 
                          />
                          </div>
                      </div>
                      </div>
          </div>
          <div class="section">
                      <div class="col-4">
                          <h5 class="">Обложка для карточки</h5>
                      </div>
                      <div class="check-section col-5 input">
                          <div class="box__pictures center flex-wrap p-3">
                          </div>
                      </div>
          </div>
          <div class="section card-column">
          <div class="card-row">
                  <div class="col-4"><h5 class="">Пожелания</h5></div>
                  <div class="form-wish">
                  <div class="tip">
                  <div class="tip-icon">
                  <span class="svg info base--clickable">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="width: 1.5rem; height: 1.5rem; background: none;">
                  <path d="M11.996 7a1 1 0 10.009 2 1 1 0 00-.009-2z" fill="#67568C"></path>
                  <path d="M12 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9zM12 12v5" stroke="#67568C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  </path></svg>
                  </span>
                  </div>
                  <section>
                  <div class="layout-row-space-between">
                  <span class="txt-secondary txt">
                  Расскажите о себе, какому подарку вы были бы рады или что точно не хотели бы получить. Вы сможете обновить пожелания даже после проведения жеребьевки — ваш Санта получит об этом уведомление.
                  </span>
                  </div>
                  </section>
                  </div>
                  <div class="check-section input">
                  <div class="input-box">
                  <label for="inputWishes">Пожелания</label>
                  <textarea id="inputWishes" class="form-control" required rows="6"></textarea>
                  </div>
                  </div>
                  </div>
          </div>
          <div class="form-page__footer">
          <div class="form-page__buttons">
          <div class="btn-secondary btn-back">Назад к карточке</div>
          <div class="btn main__button active center">Сохранить изменения</div>
          </div>
          </div>        
          </div>     
          <div class="section">
              <div class="col-4"><h5 class="">Удаление карточки</h5></div>
              <div class="check-section wrapper__name-phone">
              <span class="hint txt-secondary">Вы можете удалить карточку, если не желаете участвовать в игре.</span>
                  <label for="inputDeleteCard" class="">Для подтверждения введите: <strong>Удалить карточку</strong></label>
                  <input
                      type="text"
                      class="form-control"
                      id="inputDeleteCard"
                      placeholder=""
                      minlength="1"
                  />
                  <button id="submit-delete" type="submit" class="btn bg-none">Удалить</button>
              </div>
          </div>
      </div>
    </div> 
      </div>`;
    addUsrPics();
    }
}
