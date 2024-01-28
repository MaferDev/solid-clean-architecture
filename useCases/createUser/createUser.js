'use strict';

const userRepository = require('../../repositories/userRepository')
//=====================================
//           CREATE USER = POST
//=====================================

const createUser = async (req, res = response) => {
  let body = req.body;
  try{
    const user = await userRepository.save(body);

    res.status(200).json({
      ok: true,
      message: 'User is ready to save in DB',
      user
    });

  }catch(error){

    if(error) {
      return res.status(500).json({
        ok: false,
        message: 'error in the server | Server Error',
        error: error
      })
    }
  }
};

module.exports = { createUser };
