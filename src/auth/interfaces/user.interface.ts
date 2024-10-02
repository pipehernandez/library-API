import { Role } from "src/common/enums/role.enum";

export interface User {
    id: number;
    email: string;
    role: Role;
}
