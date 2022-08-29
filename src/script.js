function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
      
     let time = hh + " . " + mm + "  " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
}
currentTime();

// so we need username, and peronal authentication token
const username = "HarshAg90";
const ghToken = "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";

async function getContributions(token, username) {
    const headers = {
        'Authorization': `bearer ${token}`,
    }
    const body = {
        "query": `{user(login: "${username}") {
                    contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                        contributionDays {
                            contributionCount
                            weekday
                            date
                        }
                        }
                    }
                    }
                }
            }`
    }
    const response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
    const data = await response.json()
    
    return {week1: data.data.user.contributionsCollection.contributionCalendar.weeks[51].contributionDays, week2:data.data.user.contributionsCollection.contributionCalendar.weeks[52].contributionDays}
}



var rendering_fn = function () {
    (async()=>{
        const data = await getContributions('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', 'HarshAg90');

        const contrib_div = document.querySelector(".contributes");
        const alert_div = document.querySelector(".alert")

        let conrib_list = [];
        let last_cont = 0;
        for (let [key,value] of Object.entries(data.week1)){
            conrib_list.push(value.contributionCount)
            last_cont = value.contributionCount
        }
        for (let [key,value] of Object.entries(data.week2)){
            conrib_list.push(value.contributionCount)
            last_cont = value.contributionCount
        }
        console.log("Past 2 week contribution")
        console.log(conrib_list)

        for (c= (conrib_list.length - 7 );c<conrib_list.length; c++){
            contrib_count = conrib_list[c];
            const contrib_box = document.createElement("Div");
            contrib_box.classList.add("contrib_box");

            if (contrib_count == 0){
                contrib_box.classList.add("zero");
            }else if (contrib_count == 1){
                contrib_box.classList.add("one");
            }else if (contrib_count <= 3){
                contrib_box.classList.add("three");
            }else if (contrib_count > 3){
                contrib_box.classList.add("more");
            }

            contrib_div.appendChild(contrib_box)
        }
        if (last_cont ==0){
            alert_div.innerText = "NO CONTRIBUTIONS TODAY"
            alert_div.classList.add("incomp_commit");
        }else if (last_cont>0){
            alert_div.innerText = last_cont+ " - Contributions made today"
            alert_div.classList.add("comp_commit");
        }
    }
    )()
}

rendering_fn()
