/**
 * @jest-environment jsdom
 */

import { Card } from '../../src/model/card';
import { Box } from '../../src/model/box';
import { Feedback } from '../../src/model/feedback';

require('isomorphic-fetch');

const card = new Card();
const box = new Box();
const feedback = new Feedback();

//test
describe('get array all cards of the box by boxes id and update selected card', () => {
    it('get cards by boxes id', async () => {
        const data = await card.getCardsOfBox(207);
        expect(data).toStrictEqual([
            {
                box_id: 207,
                card_gift: false,
                card_id: 222,
                card_img: 'hippo',
                email: 'test@mail.ru',
                phone: null,
                user_id: 145,
                user_name: 'Test_name',
                ward_gift: false,
                ward_id: null,
                wishes: 'Test_wishes',
            },
        ]);
    });
    it('update cards property wishes', async () => {
        let data = (await card.getCardsOfBox(207))[0].wishes;
        data = 'Test_wishes_Update';
        expect(data).toStrictEqual('Test_wishes_Update');
    });
});

describe('get boxes properties by known data of box', () => {
    it('get box by boxes id', async () => {
        const data = await box.getByBoxId(207);
        expect(data).toStrictEqual({
            admin_id: 145,
            admin_name: 'Test',
            box_id: 207,
            box_img: 'cup',
            box_name: 'Test',
            cards_id: [222],
            invited_key: '47777',
            is_draw: false,
            year: '2023',
        });
    });
    it('get box by boxes invited key', async () => {
        const data = await box.getByInvitedKey('47777');
        expect(data).toStrictEqual({
            admin_id: 145,
            admin_name: 'Test',
            box_id: 207,
            box_img: 'cup',
            box_name: 'Test',
            cards_id: [222],
            invited_key: '47777',
            is_draw: false,
            year: '2023',
        });
    });
    it('get array of boxes by admin id', async () => {
        const data = await box.getByAdminId(145);
        expect(data).toStrictEqual([
            {
                admin_id: 145,
                admin_name: 'Test',
                box_id: 207,
                box_img: 'cup',
                box_name: 'Test',
                cards_id: [222],
                invited_key: '47777',
                is_draw: false,
                year: '2023',
            },
        ]);
    });
});

describe('take any data to create new feedback, get and delete it', () => {
    it('get new feedback properties', async () => {
        const data = await feedback.create(5, 'I like it', 'Test', 145);
        const feedbackId = await (await feedback.getByUser(145))[0].id;
        expect(data).toStrictEqual({
            id: feedbackId,
            rating: 5,
            text: 'I like it',
            user_name: 'Test',
            user_id: 145,
        });
    });
    it('get feedback properties by users id', async () => {
        const data = await feedback.getByUser(145);
        const feedbackId = await (await feedback.getByUser(145))[0].id;
        expect(data).toStrictEqual([
            {
                id: feedbackId,
                rating: 5,
                text: 'I like it',
                user_name: 'Test',
                user_id: 145,
            },
        ]);
    });
    it('delete feedback', async () => {
        const feedbackId = await (await feedback.getByUser(145))[0].id;
        await feedback.delete(feedbackId);
        const data = await feedback.getByUser(145);
        expect(data).toStrictEqual([]);
    });
});

//test1
describe('take known data to create new box and delete box', () => {
    const key = String(Math.floor(11111 + Math.random() * 88889));
    it('get new boxes properties', async () => {
        const data = await box.create('testName', 'cup', '2023', key, [], 147, false, 'Test1');
        const boxId = await (await box.getByInvitedKey(key)).box_id;
        expect(data).toStrictEqual({
            admin_id: 147,
            admin_name: 'Test1',
            box_id: boxId,
            box_img: 'cup',
            box_name: 'testName',
            cards_id: [],
            invited_key: key,
            is_draw: false,
            year: '2023',
        });
    });
    it('delete new boxes', async () => {
        const boxId = await (await box.getByInvitedKey(key)).box_id;
        await box.delete(boxId);
        const data = await box.getByAdminId(147);
        expect(data).toStrictEqual([]);
    });
});
