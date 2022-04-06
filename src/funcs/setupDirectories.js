const fs = require("fs"),
    path = require("path");

module.exports = (dirName, userData, data, inboxType) => {

    return new Promise((resolve, reject) => {

        let dates = data.collection.map((x) => new Date(x.created).getFullYear());
        dates = [...new Set(dates)]
    
        fs.mkdir(
            path.join(dirName, "outputs"), 
            (err) => {
    
                if(!err) console.log("Created Outputs Folder")
    
                fs.mkdir(
                    path.join(dirName, "outputs", userData.Username),
                    (err) => {
    
                        if(!err) console.log(`Created ${userData.Username} Folder`)
    
                        fs.mkdir(
                            path.join(dirName, "outputs", userData.Username, inboxType),
                            (err) => {
    
                                if(!err) console.log(`Created ${inboxType} Folder for ${userData.Username}`);
    
                                dates.forEach((year) => {
    
                                    fs.mkdir(
                                        path.join(dirName, "outputs", userData.Username, inboxType, `${year}`),
                                        (err) => {
            
                                            if(!err) console.log(`Created ${year} Folder for ${userData.Username} in ${inboxType}`);
            
                                            resolve();

                                        }
                                    )
            
                                });
    
                            }
                        )
    
                    }
                )                                    
    
            }
        );

    })

}