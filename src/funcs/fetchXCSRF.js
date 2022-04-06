const axios = require("axios");

module.exports = (config, cookie) => {

    return new Promise((resolve, reject) => {

        // Resolve CSRF Token in Cache
        const cache = config.cache.xcsrf.get(cookie);
        if(cache) return resolve(cache);

        axios({
            url: "https://auth.roblox.com/v2/logout",
            method: "POST",
            headers: {
                "Cookie": ".ROBLOSECURITY=" + cookie + ';',
            }
        }).catch((res) => {

            const xcsrf = res.response.headers["x-csrf-token"];

            // Resolve
            if(xcsrf) {
                
                // Add to Cache
                config.cache.xcsrf.set(cookie, xcsrf);
                setTimeout(() => {

                    // Expire after 5 Minutes
                    config.cache.xcsrf.delete(cookie);
                
                }, 300000);
         
                return resolve(xcsrf);
                
            } else {
                
                // Delete any stored CSRF token
                config.cache.xcsrf.delete(cookie);
                
                return reject(["RBLX_CSRF_ERROR", "DIDNT_RECEIVE_CSRF"])

            }

        });

    });

}