export interface ICard {
    id: number;
    userName: string;
    wardId: number;
    cardImg: string;
    randomKey: string;
    wishes: string;
    boxId: number;
}
export interface ICardReq {
    id: number;
    user_name: string;
    ward_id: number;
    card_img: string;
    random_key: string;
    wishes: string;
    box_id: number;
}
export interface IBox {
    id: number;
    boxName: string;
    boxImg: string;
    year: string;
    invitedKey: string;
    cardsId: number[];
    adminId: number;
    isDraw: true;
}
export interface IBoxReq {
    box_id: number;
    box_name: string;
    box_img: string;
    year: string;
    invited_key: string;
    cards_id: number[];
    admin_id: number;
    is_draw: true;
}
export interface IUserBoxes {
    id: number;
    userBoxes: number[];
    accountId: number;
}
export interface IUserBoxesReq {
    id: number;
    user_boxes: number[];
    account_id: number;
}
export interface IFeedback {
    rating: number;
    text: string;
    user_name: string;
    userId: number | null;
}
export interface IFeedbackReq {
    rating: number;
    text: string;
    user_name: string;
    user_id: number | null;
}
