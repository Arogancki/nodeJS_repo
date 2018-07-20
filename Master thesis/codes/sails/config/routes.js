/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'GET /sign/in': { action: 'sign/in/get' },
    'GET /sign/out': { action: 'sign/out/get' },
    'GET /sign/up': { action: 'sign/up/get' },
    'GET /': { action: 'app/get' },
    'GET /data': { action: 'app/data/get' },

    'POST /sign/in': { action: 'sign/in/post' },
    'POST /sign/up': { action: 'sign/up/post' },
    'POST /data': { action: 'app/data/post' },
};
