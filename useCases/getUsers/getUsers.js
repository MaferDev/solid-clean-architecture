const userRepository = require('../../repositories/userRepository')

//=============================================
//              READ LIST USER - GET
//=============================================

const getUsers = async (req, res = response) => {
    try {
      const userDB = await userRepository.getAll();
  
      if (!userDB) {
        return res.status(401).json({
          ok: false,
          message: ''
        });
      }
  
      const total = await User.count();
  
      res.status(200).json({
        ok: true,
        message: 'Everyting ok',
        userDB,
        total
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          ok: false,
          message: `'Something on the server didn't work right.'`,
          error
        });
      }
    }
  };
  
  //=============================================
  //              READ ONE USER ID - GET
  //=============================================
  const getUser = async (req, res = response) => {
    const id = req.params.id;
  
    try {
      const userDB = await userRepository.getOne(id);
  
      if (!userDB) {
        return res.status(401).json({
          ok: false,
          message: `'Something on the server didn't work right.'`
        });
      }
  
      res.status(200).json({
        ok: true,
        message: 'Everyting is normal',
        userDB
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          ok: false,
          message: `'Something on the server didn't work right.'`,
          error
        });
      }
    }
  };

module.exports = {
    getUsers,
    getUser
}