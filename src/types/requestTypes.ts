export interface ICard {
    userName: string;
    wardId: number | null;
    cardImg: string;
    wishes: string;
    boxId: number;
    userId: number;
    phone: string;
    wardGift: boolean;
    cardGift: boolean;
}
export interface ICardReq {
    card_id: number;
    user_name: string;
    ward_id: number | null;
    card_img: string;
    wishes: string;
    box_id: number;
    user_id: number;
    phone: string;
    wardGift: boolean;
    cardGift: boolean;
}
export interface IBox {
    boxName: string;
    boxImg: string;
    year: string;
    invitedKey: string;
    cardsId: number[];
    adminId: number;
    isDraw: boolean;
    adminName: string;
}
export interface IBoxReq {
    box_id: number;
    box_name: string;
    box_img: string;
    year: string;
    invited_key: string;
    cards_id: number[];
    admin_id: number;
    is_draw: boolean;
    admin_name: string;
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
