const exoress = require('express');
const router = express.Router();

// importation des modules
// const auth = require("../middleware/auth");

// importation des controllers
const schtroumpfCtrl = require("../controllers/schtroumpf.ctrl");

// routes

router.post("/login", schtroumpfCtrl.loginSchtroumpf);
router.post("/signup", schtroumpfCtrl.createSchtroumpf);

// CRUD
router.get("/", schtroumpfCtrl.getAllSchtroumpfs);
router.get("/:id", schtroumpfCtrl.getSchtroumpf);
router.put("/:id", schtroumpfCtrl.modifySchtroumpf);
router.delete("/:id", schtroumpfCtrl.deleteSchtroumpf);

