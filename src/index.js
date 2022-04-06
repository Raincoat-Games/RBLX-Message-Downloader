// Get User-Defined Enviornmental Variables
require("dotenv").config();

// Dependencies
const fs = require("fs"),
    path = require("path");

// Functions
const {
    getUserData,
    fetchXCSRF,
    getMessages,
    setupDirectories,
} = require("./funcs");

// Configuration
const config = require("./config");

(async () => {

    getUserData({ cookie: process.env.ROBLOX_COOKIE })
        .then((userData) => {

            fetchXCSRF(config, process.env.ROBLOX_COOKIE)
                .then((xcsrf) => {

                    const inboxTypes = ["Inbox", "Archive", "Sent"];

                    for(const type of inboxTypes) {

                        getMessages({xcsrf, cookie: process.env.ROBLOX_COOKIE, pgNum: 1, inboxType: type})
                            .then((initialData) => {

                                let totalPages = initialData.totalPages;

                                new Promise((resolve, reject) => {

                                    let current = 0;

                                    for(let i = 0; i < totalPages; i++) {

                                        current++;

                                        getMessages({xcsrf, cookie: process.env.ROBLOX_COOKIE, pgNum: i, inboxType: type})
                                            .then(async (data) => {
    
                                                // Setup Directories
                                                setupDirectories(`${__dirname}`, userData, data, type)
                                                    .then(() => {
                                            
                                                        data.collection.forEach((message) => {
    
                                                            let title = message.subject.replace(/[<>\/\\:"|?*]/g, "");
                    
                                                            fs.appendFile(
                                                                path.join("outputs", userData.Username, type, `${new Date(message.created).getFullYear()}`, `${title}.txt`),
                                                                `Title: ${message.subject}\nSender: ${message.sender.name}\nDate: ${new Date(message.created).toLocaleDateString()}\n\nMessage:\n${message.body}\n\n`,
                                                                "utf8",
                                                                (err) => {
            
                                                                    if(err) console.error(err);
                                                        
                                                                }
                                                            )   
            
                                                        });
    
                                                    });
    
                                            });
                                        
                                        if(current === totalPages) resolve(`Downloaded all Messages in the ${type} for ${userData.Username}`);
    
                                    }

                                }).then(console.log)

                            })
                        .catch(console.error);

                    }

                })
                .catch(() => {});

        })
        .catch(() => {});

})();