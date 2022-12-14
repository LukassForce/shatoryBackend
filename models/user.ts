export interface User {
    rut: string;
    name: string;
    lastName: string;
    password: string | undefined;
    email: string;
    rol:number;
}
// rol
// 0 = user
// 1 = admin
// 2 = artist