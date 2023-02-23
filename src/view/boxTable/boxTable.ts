import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { getBoxCards, getParticipants } from '../boxView/boxManage';
import { USR_STATE } from '../../db/usr-state';

export class BoxTable {
    constructor(private controller: Controller, private model: Model, private root: Element) {}
    async render(path2: string) {
        const box = await getParticipants(path2, this.controller.boxesController);
        const cards = box ? await getBoxCards(box.box_id, this.controller.cardController) : [];
        const placeToInsert = document.querySelector('.box__view');
        const div = document.createElement('div');
        div.classList.add('box__table', 'center');
        div.innerHTML = ` 
        <h4>Таблица участников</h4>
        <div class="table__info d-flex">
        <p>На этой странице показан актуальный список участников со всей информацией.</p>
        <button id="download" type="button" class="btn bg-light rounded-pill">
        Скачать таблицу
             </button>
          </div> 
        <div class="table-wrapper">
         <table id="exportMe" class="table">
        <thead class="table-head">
            <tr>
                <th>№</th>
                <th class="name">Имя</th>
                <th class="ward">Подопечный</th>
                <th class="santa">Тайный санта</th>
                <th class="giftSent">Подарок получен</th>
                <th class="giftReceived">Подарок отправлен</th>
                <th class="email">Email</th>
                <th class="phone">Телефон</th>
                <th class="wishes">Пожелания</th>
            </tr>
        </thead>
        <tbody class="table__body"></tbody>
        </table></div>`;
        placeToInsert?.append(div);
        const table = document.querySelector('.table__body') as HTMLTableElement;
        if (cards) {
            cards.forEach(async (card, i) => {
                const cardItem = document.createElement('tr');
                const { card_id, user_name, ward_id, wishes, phone, ward_gift, card_gift, email } = card;
                const wardName = cards.find((card) => card.card_id === ward_id)?.user_name;

                const santaName = cards.find((card) => card.ward_id === card_id)?.user_name;
                cardItem.classList.add('card-item');

                cardItem.innerHTML = `<td class="number">${i + 1}</td>
        <td >${user_name}</td>
        <td >${wardName}</td>
        <td >${santaName}</td>
        <td >${card_gift ? 'Да' : 'Нет'}</td>
        <td >${ward_gift ? 'Да' : 'Нет'}</td>
        <td >${email ? email : ''}</td>
        <td >${phone}</td>
        <td >${wishes}</td>
        `;
                table.append(cardItem);
            });
        }
        console.log(USR_STATE);
        this.addListeners();
    }
    addListeners() {
        const toCsv = (table: HTMLElement) => {
            const rows = table.querySelectorAll('tr');
            return [].slice
                .call(rows)
                .map(function (row) {
                    const cells = (row as HTMLElement).querySelectorAll('th,td');
                    return [].slice
                        .call(cells)
                        .map(function (cell) {
                            return (cell as HTMLElement).textContent;
                        })
                        .join(',');
                })
                .join('\n');
        };
        const download = function (text: string, fileName: string) {
            const link = document.createElement('a');
            link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
            link.setAttribute('download', fileName);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        const table = document.getElementById('exportMe') as HTMLElement;
        const exportBtn = document.getElementById('download');
        if (exportBtn) {
            exportBtn.addEventListener('click', function () {
                const csv = toCsv(table);
                download(csv, 'download.csv');
            });
        }
    }
}
