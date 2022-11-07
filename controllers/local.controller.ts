import connection from "../database";
import { Local } from "../models/local";

export function createLocal(req: any, res: any) {

    try {

        const newLocal: Local = { nombre: req.body.nombre, direccion: req.body.direccion, contacto: req.body.contacto, redSocial: req.body.redSocial};

        connection.query("INSERT INTO local SET ?", [newLocal], function (error: any, results: any) {
            
            if (error) throw error;
            else
            res.status(201).json({ message: "Local creado correctamente" });
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export function getAllLocals(req:any, res:any){

    try {

        connection.query("SELECT nombre, direccion, contacto, redSocial FROM local", function (error:any, results:any){

            if(error) {throw error;}
            if (!results.length) return res.status(400).json({ message: "No existe informacion de locales" });
            else { res.status(200).send(results); }
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json(error)
    }
}

export function getLocalByName(req:any, res:any){

    let localName = req.body.localName;

    try {
        connection.query('CALL getArtistByName(?)', [localName], (error:any, results:any) =>{
            if (error) throw error;
            if (!results.length) return res.status(400).json({message: "No existe local con el nombre ingresado"})
            res.status(200).send(results[0]);
        });

    } catch (error) {

        return res.status(500).json(error)
    }
}

export function updateLocal(req:any, res:any){

    const updateLocal: Local = { nombre: req.body.nombre, direccion: req.body.direccion, contacto: req.body.contacto, redSocial: req.body.redSocial};
    let idLocal:number = req.param.idLocal;

    connection.query("UPDATE local SET ? WHERE ID = ?", [updateLocal, idLocal], (req_:any, results:any) => {
        if (!results) {
            res.status(400).send('No existe informacion del local.');
        }
        res.status(200).send(`Local Actualizado correctamente`);
    });


}