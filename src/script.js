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

async function doFetch(gql){
    const headers = {
        'Content-type': 'application/json',
        'Authorization': 'token ' + ghToken,
    }

    let req = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: headers,
        body:  JSON.stringify(gql)
    })

    let response = await req.json()
    return response.data
}
async function getContributions(login) {
    const gql = {query: `
    {
      user(login: "${login}") {
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
    }
    `}
  
    contib = await doFetch(gql)
  
    return contib
}

var fn = function (username, ghToken) {
    (async()=>{  
        let response = await getContributions(username)
        console.log(response);
    }
    )()
}

fn()
