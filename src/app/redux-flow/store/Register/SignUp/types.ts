export enum ActionTypes {
    SIGNUP = '@@register_signup/SIGNUP'
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    website: string;
    email: string;
    phone: string;
    password: string;
}

export const defaultStateSignup: UserInfo = {
    id: "",
    firstName: "",
    lastName: "",
    website: "",
    email: "",
    phone: null,
    password: "",
}