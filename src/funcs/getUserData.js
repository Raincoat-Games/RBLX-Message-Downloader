// Dependencies
const axios = require("axios");

module.exports = (opts) => {

    return new Promise((resolve, reject) => {

        axios({
            url: `https://www.roblox.com/mobileapi/userinfo`,
            method: "GET",
            headers: {
                "Cookie": ".ROBLOSECURITY=" + opts.cookie + ";",
            },
        }).then((res) => {

            if(!res.data || res.data && typeof(res.data) !== "object") return console.error(["RBLX_COOKIE_ERR", "INVALID_ROBLOX_COOKIE"].join("\n"));
            
            resolve({
                Username: res.data.UserName,
                UserId: res.data.UserID,
            });
    
        }).catch(console.error)

    });

}