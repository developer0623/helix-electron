import System from '../../models/system';

const SystemsController = {
  GetSystem: (req, res, next) => {
    const system_id = process.env.SYSTEM_ID;

    System.findById(system_id, (err, system) => {
      if (err) { return next(err); }

      res.status(200).json(system);
    });
  }
};

module.exports = SystemsController;
