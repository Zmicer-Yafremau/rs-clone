export interface ICard {
    id: number;
    userName: string;
    wardId: number;
    cardImg: string;
    randomKey: string;
    wishes: string;
    boxId: number;
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

export interface IFeedback {
    rating: number;
    text: string;
    userName: string;
    userId: number;
}
