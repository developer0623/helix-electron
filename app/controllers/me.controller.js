const MeController = {
  GetMe: (req, res, next) => {
    if(!req.user) {
      return res.sendStatus(401);
    }
    return res.send(req.user);
  },
  UpdateMe: (req, res, next) => {
    if(!req.user) {
      return res.sendStatus(401);
    }

    const user = req.user;

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email_address = req.body.email_address;
    user.mobile_number = req.body.mobile_number;

    user.save((err) => {
      if(err) { return next(err); }

      res.status(200).json(user);
    });
  },
  ChangePassword: (req, res, next) => {
    if(!req.user) {
      return res.sendStatus(401);
    }
    const user = req.user;

    user.verifyPassword(req.body.current_password, (err, isMatch) => {
      if(err) { return next(err); }
      if(!isMatch) {
        return res.status(401).send({minorCode: 1001});
      }

      user.password = req.body.new_password;

      user.save((err) => {
        if(err) { return next(err); }

        res.sendStatus(200);
      });
    });
  }
};

module.exports = MeController;
