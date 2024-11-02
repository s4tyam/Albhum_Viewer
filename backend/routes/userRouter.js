const express = require("express");
const router = express.Router();
const Protect = require("../middleware/auth");

const {
  login_function,
  register_function,
  get_user,
  logout_function,
  send_otp,
  verify_otp,
  reset_password,
} = require("../controllers/userControllers");

router.route("/new").post(register_function);
router.route("/login").post(login_function);
router.route("/logout").get(Protect, logout_function);
router.route("/me").get(Protect, get_user);
router.route("/forgetpassword/sendotp").post(send_otp);
router.route("/forgetpassword/verifyotp").post(verify_otp);
router.route("/forgetpassword/resetpassword").post(reset_password);

module.exports = router;
