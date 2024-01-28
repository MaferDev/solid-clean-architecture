const User = require("../../database/models/user")

//=============================================
//              LOGIN USER - POST
//=============================================

const login = async (req, res = response) => {
    let body = req.body;
  
    if (body.email) {
      User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message: `'Something on the server didn't work right.'`,
            err
          });
        }
  
        if (!userDB) {
          return res.status(400).json({
            ok: false,
            message:
              'Server didnt understand the URL you gave it, You need wil check ID, if user exist.',
            err
          });
        }
  
        if (!bcrypt.compareSync(body.password, userDB.password)) {
          return res.status(400).json({
            ok: false,
            message:
              'Server refuse to give you a file, authentication wont help, your information is not valid.',
            err
          });
        }
  
        let token = jwt.sign(
          {
            user: userDB
          },
          process.env.SEED,
          { expiresIn: process.env.expiresIn }
        );
  
        res.status(200).json({
          ok: true,
          message: 'Login was Success',
          userDB,
          token
        });
      });
    }
  };

module.exports = {
    login
}