/**
 * @jest-environment jsdom
 */

import { Model } from '../../src/model';
import { Card } from '../../src/model/card';
require('isomorphic-fetch');

const model = new Model();
const card = new Card();

describe('get array all cards of box by id', () => {
  it('get cards of box', async () => {

    const data = await card.getCardsOfBox(207);
    expect(data).toStrictEqual([{
           "box_id": 207,
           "card_gift": false,
           "card_id": 222,
           "card_img": "hippo",
           "email": "test@mail.ru",
           "phone": null,
           "user_id": 145,
           "user_name": "Test_name",
           "ward_gift": false,
           "ward_id": null,
           "wishes": "Test_wishes",
         }]);
    });
});
