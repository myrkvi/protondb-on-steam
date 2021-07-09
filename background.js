
chrome.runtime.onMessage.addListener(
    (message, sender, reply) => {
        if (message.type == "fetch_proton") {
            let req =fetch(
                "https://www.protondb.com/api/v1/reports/summaries/" 
                + message.game_id + ".json");
                
            req.then(r => r.text()).then(json => {
                let data = {json: json.toString(), foo: "bar"};
                const p = new Promise( (resolve, reject) => {resolve(data) });
                console.log("TEST")
                reply(p)
                });
            req.catch(error => {
                let data = {error: error.toString(), foo: "bar"};
                reject(data);
            })
        }
    
        return true;
});