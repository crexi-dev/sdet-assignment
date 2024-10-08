export interface IUser {
    email: string;
    password: string;
    companyName?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}
type IUsers = { [k: string]: IUser }

export const users = {
    test: {
        email: "stev.vargas@gmail.com",
        password: "uw6^j:UaG6r+8ur",
        companyName: "StevVargasTest",
        firstName: "Stev",
        lastName: "Vargas"
    }
} as const satisfies IUsers;
