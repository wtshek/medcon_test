const { connection } = require("../js/databse");

//--------- post functions ---------

const addDoctor = (req, res) => {
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  const findDrSQL = `
    SELECT * FROM doctors
    WHERE clinic_id = "${id}" AND first_name="${first_name}" AND last_name="${last_name}";
  `;

  const insertDrSQL = `
    INSERT INTO doctors VALUES("${first_name}", "${last_name}", "${id}")
  `;

  connection.query(findDrSQL, (err, result) => {
    if (err) return res.status(400);

    if (result.length >= 1)
      return res
        .status(300)
        .send("This information is already added into database");

    connection.query(insertDrSQL, (err, result) => {
      if (err) return res.status(300);

      return res.status(200).send("Information is updated.");
    });
  });
};

const addConsultation = (req, res) => {
  const id = req.params.id;
  const {
    d_fname,
    d_lname,
    p_fname,
    p_lname,
    diagnosis,
    medication,
    fee,
    follow_up,
  } = req.body;

  const insertConsSQL = `
      INSERT INTO consultations(
          d_fname, 
          d_lname, 
          p_fname, 
          p_lname, 
          diagnosis, 
          medication, 
          fee, 
          follow_up, 
          clinic_id)
      VALUES(
          "${d_fname}", "${d_lname}","${p_fname}", 
          "${p_lname}", "${diagnosis}", "${medication}", "${fee}", 
          "${follow_up}", "${id}"
        )
    `;

  connection.query(insertConsSQL, (err, result) => {
    if (err) return res.status(300);

    return res.status(200).send("Information is updated.");
  });
};

const addBooking = (req, res) => {
  const id = req.params.id;
  const { d_fname, d_lname, p_fname, p_lname, from, to } = req.body;

  const insertBKSQL = `
      INSERT INTO bookings(
          d_fname, 
          d_lname, 
          p_fname, 
          p_lname, 
          t_from,
          t_to, 
          clinic_id)
      VALUES(
          "${d_fname}", "${d_lname}","${p_fname}", 
          "${p_lname}", STR_TO_DATE("${from}", '%Y/%m/%d %T'), STR_TO_DATE("${to}", '%Y/%m/%d %T'), "${id}"
        )
    `;

  connection.query(insertBKSQL, (err, result) => {
    if (err) return res.status(300);

    return res.status(200).send("Information is updated.");
  });
};

//--------- get functions ---------

function getFunc(req, res, table) {
  const id = req.params.id;
  const sql = `
      SELECT ${table}.*, clinics.clinic_name 
      FROM ${table}
      JOIN clinics
      ON clinic_id=clinics.id
    `;

  connection.query(sql, (err, result) => {
    if (err) return res.status(300);

    return res.status(200).send(result);
  });
}

const getConsultations = (req, res) => {
  getFunc(req, res, "consultations");
};

const getBookings = (req, res) => {
  getFunc(req, res, "bookings");
};

module.exports = {
  addDoctor,
  addConsultation,
  addBooking,
  getConsultations,
  getBookings,
};
