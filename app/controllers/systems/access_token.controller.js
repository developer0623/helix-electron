import AccessToken from '../../models/oauth_token';
import Client from '../../models/oauth_client';

const AccessTokenController = {
  CreateAccessToken: (req, res, next) => {
    const oauth_client_id = req.body.oauth_client_id;
    const oauth_access_token = req.body.oauth_access_token;
    const oauth_refresh_token = req.body.oauth_refresh_token;

    Client.findOne({
      client_id: oauth_client_id
    })
    .then((client) => {
      if(!client) {
        console.log(`No Client ${oauth_client_id}`);

        res.sendStatus(400);
      } else {
        AccessToken.findOne({
          client: client,
          user: req.user
        })
        .then((access_token) => {
          if(access_token) {
            access_token.access_token = oauth_access_token;
            access_token.refresh_token = oauth_refresh_token;
          } else {
            access_token = new AccessToken();

            access_token.access_token = oauth_access_token;
            access_token.refresh_token = oauth_refresh_token;
            access_token.client = client;
            access_token.user = req.user;
          }
          access_token.save()
          .then(() => {
            res.json(access_token);
          })
          .catch((err) => {
            res.status(400).json(err)
          });
        })
        .catch((err) => {
          console.log(`Error ${err}`);

          res.status(400).json(err);
        })
      }
    })

  },
  GetAccessTokens: (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;

    const params = {
      query: {},
      paging: { page: page, limit: pageSize, sort: { createdAt: 'desc' } },
    };
    AccessToken.paginate(params.query, params.paging, (err, result) => {
      if (err) { return next(err); }

      return res.json({ results: result.docs,
        total: Number(result.total),
        limit: Number(result.limit),
        offset: Number(result.offset),
        current_page: Number(result.page),
        max_pages: Math.ceil(result.total / pageSize)
      });
    });
  },
  DeleteAccessToken: (req, res, next) => {
    AccessToken.findByIdAndRemove(req.params.access_token_id, (err, at) => {
      if(err) { return next(err); }

      res.sendStatus(204);
    })
  },
}

module.exports = AccessTokenController;
