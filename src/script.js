function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
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
    ss = (ss < 10) ? "0" + ss : ss;

    document.querySelector(".hrs").innerText = hh;
    document.querySelector(".mins").innerText = mm;
    document.querySelector(".secs").innerText = ss;
    document.querySelector(".session").innerText = session;
    let t = setTimeout(function(){ currentTime() }, 1000);
}
currentTime();

async function getContributions(token, username) {
    const headers = {
        "Authorization": "bearer "+token,
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
    try {
        const response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })
        const data = await response.json()
        return {week1: data.data.user.contributionsCollection.contributionCalendar.weeks[51].contributionDays, week2:data.data.user.contributionsCollection.contributionCalendar.weeks[52].contributionDays}
    }catch(err){
        console.log("wrong token");
        console.log(err);
        return false;
    }
}



async function rendering(inp_data){ // inp_data
    var data = await getContributions(inp_data.key,inp_data.username);
    console.log(data)
    if (!data){
        console.log("data not found");
        return
    }

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

var main = function () {
    (async()=>{
        rendering(
            // copy paste the whole access_key.json here to run
        )
    })()
}
main()


// const api_url ="https://zenquotes.io/api/quotes/";

// async function getapi(url)
// {
//   const response = await fetch("https://zenquotes.io/api/random");
//   var data = await response.json();
//   console.log(data);
// }

// getapi(api_url);

// this API doesn't work for "quots" because of Cors error in its server, find a new one
