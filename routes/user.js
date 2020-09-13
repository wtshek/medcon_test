const express = require("express");
const router = express.Router();
const {
  addDoctor,
  addConsultation,
  addBooking,
  getConsultations,
  getBookings,
} = require("../controllers/user");

router.post("/add-doctor/:id", addDoctor);

router.post("/add-consultation/:id", addConsultation);

router.post("/add-booking/:id", addBooking);

router.get("/get-consultations/:id", getConsultations);

router.get("/get-bookings/:id", getBookings);

module.exports = router;
