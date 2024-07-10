/**
 * POST localhost:8080/eComm/api/v1/auth/signup
 * 
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller")
const authMw = require("../middlewares/auth.mw")

module.exports = (app) => {
    app.post("/eComm/api/v1/auth/signup", [authMw.verifySignUpBody], authController.signup)


    /**
     * 
     * POST localhost:8080/eComm/api/v1/auth/signin
     * 
     */

    app.post("/eComm/api/v1/auth/signin",[authMw.verifySignInBody], authController.signin)

}   