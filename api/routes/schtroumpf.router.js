const express = require("express");
const router = express.Router();

// importation des modules
const auth = require("../middleware/auth");  

// importation des controllers
const schtroumpfCtrl = require("../controllers/schtroumpf.ctrl");

// routes

router.post("/login", schtroumpfCtrl.loginSchtroumpf);
router.post("/signup", schtroumpfCtrl.createSchtroumpf);

// CRUD
router.get("/", auth, schtroumpfCtrl.getAllSchtroumpfs);
// router.get("/:id", auth, schtroumpfCtrl.getSchtroumpf);
router.put("/:id", auth, schtroumpfCtrl.modifySchtroumpf);
router.delete("/:id", auth, schtroumpfCtrl.deleteSchtroumpf);

module.exports = router;
