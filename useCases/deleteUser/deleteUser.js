const userRepository = require('../../repositories/userRepository')
const deleteUser = async (req, res = response) => {
  const id = req.params.id;

  try {
    const userDB = await userRepository.getOne(id);

    if (!userDB) {
      return res.status(401).json({
        ok: false,
        message: `'There is no with this ID: ' ${id}`
      });
    }

    const userDelete = await userRepository.remove(userDB._id);

    res.status(200).json({
      ok: true,
      message: 'Everyting is normal',
      userDelete
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

module.exports = { deleteUser };
