import {Router, Request, Response} from 'express';
import MYSQL from '../mysql/mysql';

const router = Router();


router.get('/heroes',(req: Request, res: Response)=> {

    const Query = `
    SELECT *
    FROM heroes`;

    MYSQL.ejecuteQuery(Query, (err: any, heroes: Object[])=>{

        //return errors
        if(err){
            
            res.status(400).json({
                ok:false,
                eror: err
            });
            
        } else {
            res.status(200).json({
                ok:true,
                heroes: heroes
            });

        }

    });

});

router.get('/heroes/:id',(req: Request, res: Response)=> {

    const id = req.params.id;

    //Escape specials character
    const escapeId = MYSQL.instance.cnn.escape(id);

    const Query = ` SELECT * FROM heroes where id = ${escapeId}`;

    MYSQL.ejecuteQuery(Query, (err: any, heroe: Object[])=>{

        //return errors
        if(err){
            
            res.status(400).json({
                ok:false,
                eror: err
            });
            
        } else {
            res.status(200).json({
                ok:true,
                heroe: heroe[0]
            });

        }

    });


});

export default router;
