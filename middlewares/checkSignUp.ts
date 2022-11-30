import connection from "../database";

export const checkDuplicateUser = async (req: any, res: any, next: any) => {

    connection.query("SELECT rut FROM usuario WHERE email = ? OR rut = ?", [req.body.email, req.body.rut], function (error: any, results: any) {

        if (error) throw error;
        if (results.length != 0) return res.status(400).json({ message: "¡El correo y/o el rut que has introducido ya están registrados!" });
        next();
    });
}