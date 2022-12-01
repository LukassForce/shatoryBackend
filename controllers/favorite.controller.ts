import connection from "../database";

export function addFav(req: any, res: any) {

    let rutUser = req.body.rutUser;
    let idArtist = req.body.idArtist;

    try {

        connection.query("INSERT INTO Favorito (rutUser, idArtista) VALUES (?, ?)", [rutUser, idArtist], (error: any, results: any) => {

            if (error) throw error;
            res.status(201).json({ message: "Agregado a favorito correctamente" })
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
}

export function getFavByRut(req: any, res: any) {

    let rutUser = req.params.rut;

    try {

        connection.query("Select * FROM Favorito where rutUser = ?", [rutUser], (error: any, results: any) => {

            if (error) throw error;
            res.status(201).send(results)
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
}