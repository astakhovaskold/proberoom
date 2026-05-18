export interface Room {
    id: string;
    name: string;
    createdAt: Date;
}

export interface User {
    id: string;
    name: string;
    roomId: string;
}

export interface Message {
    id: string;
    userId: string;
    roomId: string;
    text: string;
    createdAt: Date;
}
