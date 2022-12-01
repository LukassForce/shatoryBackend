import connection from "../database";
import { Evento } from "../models/evento";

export function addEvento(req: any, res: any){

    try {
        
        const newEvento: Evento = {
            nombreEvento: req.body.nombreEvento,
            locacion: req.body.locacion,
            fecha: req.body.fecha,
            idLoc: req.body.idLoc,
            idArt: req.body.idArt
        };

        connection.query("INSERT INTO evento SET ?", [newEvento], function (error: any, results: any) {

            if (error) throw error;
            else res.status(201).json({ message: "Evento creado correctamente" });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export function getEventoById(req: any, res: any){

    let idEvento = req.params.id;

    try {
        
        connection.query("SELECT * from evento where idEvento = ()", (idEvento), (error: any, results:any )=>{
            if(error) throw error;
            if(!results) return res.status(400).json({message: "No existe informacion de este evento"});
            
            res.status(200).send(results);
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export function getAllEvento(req:any, res:any){

    try {

        connection.query("SELECT * FROM evento", (error: any, results: any) =>{

            if(error) throw error;
            if(!results.length) return res.status(400).json({message: "No existe informacion de eventos"});
            res.status(200).send(results);
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
}

export function deleteEventoById(req: any, res: any){

    let idEvento = req.params.id;

    try {
        
        connection.query("DELETE from evento where idEvento = (?)",(idEvento),(error: any, results: any)=>{
            if(error) throw error;
            if(!results) return res.status(400).json({message: "No existe el evento que se quiere eliminar"});
            res.status(200).json({message: "Evento eliminado correctamente"});
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export function updateEventoById(req: any, res: any){

    let idEvento: number = req.params.id;
    
    const updatedEvento: any = { 
        nombreEvento: req.body.nombreEvento,
        locacion: req.body.locacion,
        fecha: req.body.fecha,
        idEvento: req.body.idEvento,
        idLoc: req.body.idLoc
    };

    try {

        connection.query("UPDATE evento SET ? WHERE ID = ?", [updatedEvento, idEvento], (error: any, results: any) => {
            
            if(error) throw error;
            res.status(200).json({message: "Evento actualizado correctamente"});
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }

}