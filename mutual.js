(function() {
    var request = require('request');
    request = request.defaults({jar: true})
    var cookie;
    
    process.on('uncaughtException', (err) => {
        console.log(err);
    });

    module.exports.login = function login(uname, passwd) {
        request.post({
            url:    'https://osu.ppy.sh/forum/ucp.php?mode=login',
            form: {
                username: uname,
                password: passwd,
                autologin: 'on',
                login: 'login'
            },
            headers: {
                'user-agent': 'Mozilla/99.99 (compatible; MSIE 99.99; Windows XP 99.99)'
            }
        }, (error, response, body) => {
            console.log('Login success');
            cookie = response.headers['set-cookie'];
        });
    }
    
    module.exports.mutual = function try_mutual(uid, resp) {
        request.post({
            url:    'http://osu.ppy.sh/u/' + uid,
            headers: {
                'user-agent':   'Mozilla/99.99 (compatible; MSIE 99.99; Windows XP 99.99)',
                'cookie':       cookie
            }
        }, (error, response, body) => {
            if (body.indexOf('Mutual') > 0) {
                resp.write('We are already mutual friend.');
                resp.end();
            }
            else {
                var luc = body.match(/var localUserCheck = \"(.*?)\"/)[1];
                request.post({
                    url:    'http://osu.ppy.sh/u/' + uid,
                    headers: {
                        'user-agent':   'Mozilla/99.99 (compatible; MSIE 99.99; Windows XP 99.99)',
                        'cookie':       cookie
                    },
                    form: {
                        'a':                'add',
                        'localUserCheck':   luc
                    }
                }, (error, respond, body) => {
                    if (body.indexOf('Mutual') > 0) {
                        resp.write('We are mutual friend now!');
                        resp.end();
                    }
                    else {
                        // seems that he didn't add me as friend, so we need to revoke.
                        request.post({
                            url:    'http://osu.ppy.sh/u/' + uid,
                            headers: {
                                'user-agent':   'Mozilla/99.99 (compatible; MSIE 99.99; Windows XP 99.99)',
                                'cookie':       cookie
                            },
                            form: {
                                'a':                'remove',
                                'localUserCheck':   luc
                            }
                        }, (error, respond, body) => {
                            // Doing nothing.
                        });
                        resp.write('I\'m not your friend!');
                        resp.end();
                    }
                });
            }
        });
    }
}());
