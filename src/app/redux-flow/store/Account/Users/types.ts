export interface User {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export const defaultUser = {
    userID: "-1",
    firstName: "",
    lastName: "",
    email: "",
    role: "Creator"
}

