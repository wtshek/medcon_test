const express = require("express");
const router = express.Router();
const { connection } = require("../js/databse");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("welcome to clinic api");
});

router.get("/clinics", (req, res) => {
  connection.query(
    `SELECT clinics.clinic_name, clinics.phone, clinics.addr, doctors.first_name, doctors.last_name 
     FROM clinics join doctors 
     ON clinics.id = doctors.clinic_id;`,
    (err, results) => {
      if (err) return res.status(400);
      console.log(results);
      res.status(200).send(results);
    }
  );
});

/**
 * @description get clinics
 *
 * @returns names, phone numberes, doctors
 */

module.exports = router;
