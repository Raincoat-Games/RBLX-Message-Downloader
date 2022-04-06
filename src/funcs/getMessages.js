// Dependencies
const axios = require("axios");

module.exports = (opts) => {

    return new Promise((resolve, reject) => {

        axios({
            url: `https://privatemessages.roblox.com/v1/messages?pageNumber=${opts.pgNum}&pageSize=25&messageTab=${opts.inboxType}`,
            method: "GET",
            headers: {
                "Cookie": ".ROBLOSECURITY=" + opts.cookie + ";",
                "X-CSRF-TOKEN": opts.xcsrf,
            }
        }).then((res) => {
    
            resolve(res.data);
            
        }).catch(console.error)

    })

}