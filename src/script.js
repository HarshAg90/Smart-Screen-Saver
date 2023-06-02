// function currentTime() {
//     let date = new Date(); 
//     let hh = date.getHours();
//     let mm = date.getMinutes();
//     let ss = date.getSeconds();
//     let session = "AM";

//     if(hh == 0){
//         hh = 12;
//     }
//     if(hh > 12){
//         hh = hh - 12;
//         session = "PM";
//     }

//     hh = (hh < 10) ? "0" + hh : hh;
//     mm = (mm < 10) ? "0" + mm : mm;
//     ss = (ss < 10) ? "0" + ss : ss;

//     document.querySelector(".hrs").innerText = hh;
//     document.querySelector(".mins").innerText = mm;
//     document.querySelector(".secs").innerText = ss;
//     document.querySelector(".session").innerText = session;
//     let t = setTimeout(function(){ currentTime() }, 1000);
// }
// currentTime();

var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true

function updateTime () {
  var now = new Date
  
  var lastHours = last.getHours().toString()
  var nowHours = now.getHours().toString()
  if (lastHours !== nowHours) {
    updateContainer(hoursContainer, nowHours)
  }
  
  var lastMinutes = last.getMinutes().toString()
  var nowMinutes = now.getMinutes().toString()
  if (lastMinutes !== nowMinutes) {
    updateContainer(minutesContainer, nowMinutes)
  }
  
  var lastSeconds = last.getSeconds().toString()
  var nowSeconds = now.getSeconds().toString()
  if (lastSeconds !== nowSeconds) {
    //tick()
    updateContainer(secondsContainer, nowSeconds)
  }
  
  last = now
}

function tick () {
  tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer (container, newTime) {
  var time = newTime.split('')
  
  if (time.length === 1) {
    time.unshift('0')
  }
  
  
  var first = container.firstElementChild
  if (first.lastElementChild.textContent !== time[0]) {
    updateNumber(first, time[0])
  }
  
  var last = container.lastElementChild
  if (last.lastElementChild.textContent !== time[1]) {
    updateNumber(last, time[1])
  }
}

function updateNumber (element, number) {
  //element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true)
  second.textContent = number
  
  element.appendChild(second)
  element.classList.add('move')

  setTimeout(function () {
    element.classList.remove('move')
  }, 990)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 990)
}

setInterval(updateTime, 100)
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
        document.querySelector(".contributes").innerHTML = `<h1>Offline</h1>`;
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
rendering({
    key:"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",
    username:"harshag90"
})