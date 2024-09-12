import { Role } from "./userRoles";

export type SuccessfulLoginResponse = {
    message: string;
    role: Role
};