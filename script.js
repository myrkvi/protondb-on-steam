let steamRegex = /https?:\/\/store\.steampowered\.com\/app\/(\d+)/;
const app_id = steamRegex.exec(window.location.href)[1];

const query_path_proton = "div#root > div > main > div.content > div >div > div > div > div > span";
//const query_path_steam = "div.game_area_purchase_game_wrapper div.game_area_purchase_platform";
const query_path_steam = "div.game_area_purchase_platform";


fetch("https://www.protondb.com/api/v1/reports/summaries/" + app_id + ".json", {mode: 'no-cors'}).then(
    response => response.json()).then(data => {


        document.querySelectorAll(query_path_steam).forEach(platform_area => {
            //let platform_area = document.querySelector(query_path_steam);

            if (platform_area.querySelector(".proton") != null) return null;

            const protondb_url = "https://www.protondb.com/app/" + app_id;

            let el = document.createElement("span");
            el.classList.add("proton");

            let link = document.createElement("a");
            link.setAttribute("href", protondb_url);
            
            platform_area.appendChild(el);
            el.appendChild(link);

            switch (data["tier"]) {
                case "platinum":
                    el.classList.add("platinum");
                    link.textContent = "Platinum";
                    break;

                case "gold":
                    el.classList.add("gold");
                    link.textContent = "Gold";
                    break;

                case "silver":
                    el.classList.add("silver");
                    link.textContent = "Silver";
                    break;

                case "bronze":
                    el.classList.add("bronze");
                    link.textContent = "Bronze";
                    break;

                case "borked":
                    el.classList.add("borked");
                    link.textContent = "Borked";
                    break;
            }

        });

    }
);