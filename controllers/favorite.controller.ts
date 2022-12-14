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

        connection.query("CALL getFavoritesByRut(?)", [rutUser], (error: any, results: any) => {

            if (error) throw error;
            
            res.status(200).send(results[0])
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
}

export function getFavByRutAndIdArtist(req: any, res: any) {
    
        let rutUser = req.params.rut;
        let idArtist = req.params.idArtist;
    
        try {
    
            connection.query("SELECT * FROM Favorito WHERE rutUser = (?) AND idArtista = (?)", [rutUser, idArtist], (error: any, results: any) => {
    
                if (error) throw error;
                if (!results.length) return res.status(400).json({ message: "No se encuentra relacion" });
    
                res.status(200).send(results);
            })
    
        } catch (error) {
    
            console.log(error);
            return res.status(500).json(error);
        }
}

export function deleteFav(req: any, res: any) {

    let rutUser = req.params.rut;
    let idArtist = req.params.idArtist;

    try {

        connection.query("DELETE FROM Favorito WHERE rutUser = (?) AND idArtista = (?)", [rutUser, idArtist], (error: any, results: any) => {

            if (error) throw error;
            res.status(200).json({ message: "Eliminado de favorito correctamente" })
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
}