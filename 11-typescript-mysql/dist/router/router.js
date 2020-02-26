"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const Query = `
    SELECT *
    FROM heroes`;
    mysql_1.default.ejecuteQuery(Query, (err, heroes) => {
        //return errors
        if (err) {
            res.status(400).json({
                ok: false,
                eror: err
            });
        }
        else {
            res.status(200).json({
                ok: true,
                heroes: heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    //Escape specials character
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const Query = ` SELECT * FROM heroes where id = ${escapeId}`;
    mysql_1.default.ejecuteQuery(Query, (err, heroe) => {
        //return errors
        if (err) {
            res.status(400).json({
                ok: false,
                eror: err
            });
        }
        else {
            res.status(200).json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });
});
exports.default = router;
