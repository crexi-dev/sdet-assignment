export interface IUser {
    email: string;
    password: string;
    companyName?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}
type IUsers = { [k: string]: IUser };

/**
 * In a real world scenarios users may not have the same credentials across environments.
 * Thus, this would be a function return that would use the environment to determine
 * the appropriate credentials.
 * Also if credentials have access to sensitive information, say in production, this
 * could either be stored in a secret, or use envelope encryption.
 */
export const users = {
    test: {
        email: "stev.vargas@gmail.com",
        password: "uw6^j:UaG6r+8ur",
        companyName: "StevVargasTest",
        firstName: "Stev",
        lastName: "Vargas",
    },
} as const satisfies IUsers;
