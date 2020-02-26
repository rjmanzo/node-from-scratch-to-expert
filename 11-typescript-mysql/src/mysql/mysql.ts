import mysql from 'mysql';

 export default class MYSQL {

    //Singleton patron
    private static _instance: MYSQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        console.log('Clase inicializada');
        
        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'admin',
            database : 'node_dev'
        }); 
        
        this.conectarDB();

        }

        public static get instance(){
            return this._instance || (this._instance = new this());
        }

        static ejecuteQuery(query: string, callback: Function){

            //console.log('llego hasta aqui!');

            this._instance.cnn.query(query, (err, results: Object[], fields)=> {

                if(err){
                    console.log(err);
                    return callback(err);
                }

                if(results.length === 0){
                    console.log('No hay registros para la Query solicitada');
                    return;
                } else {
                    
                    callback(null, results);
                }

            });

        } 

        private conectarDB() {

            this.cnn.connect((error: mysql.MysqlError)=> {

                    if(error){
                        console.log(error.message);
                        return;
                    }
                    
                    console.log('connected as id ' + this.cnn.threadId);

                }
            );

        }
 
 }