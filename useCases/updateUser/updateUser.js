const User = require("../../database/models/user")

const updateUser = async (req, res = response) => {
    const id = req.params.id;
    let body = req.body;
  
    User.findByIdAndUpdate(
      id,
      body,
      { new: true, userFindAndModify: true },
      async (err, user) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            message: `'Something on the server didn't work right.'`,
            err
          });
        }
  
        if (!user) {
          return res.status(401).json({
            ok: false,
            message: 'User doesnt exist at that address'
          });
        }
  
        const saltRounds = 10;
  
        if (body.password != null) {
          user.password = bcrypt.hashSync(body.password, saltRounds);
        }
  
        await user.save((err, userUpdated) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: `'Something on the server didn't work right.'`,
              err
            });
          }
          if (!userUpdated) {
            return res.status(401).json({
              ok: false,
              message: 'A file doesnt exist at that address'
            });
          }
  
          const userMod = body;
          userMod.password = ':)';
  
          res.status(200).json({
            ok: true,
            message: 'Everyting Okay',
            userMod
          });
        });
      }
    );
  };

module.exports = {
    updateUser
}