const searchTeam = () => {
    const inputField = document.getElementById('input-field')
    const inputFieldText = inputField.value
    inputField.value = ''

    if (inputFieldText == '') {
        document.getElementById('team-badge').innerHTML = `
        <h1 class="text-center mt-4 text-danger"> please write something</h1>`
    }
    else {
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputFieldText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayTeam(data.teams, inputFieldText))
    }
}

const displayTeam = (teams, inputFieldText) => {
    // console.log(teams);
    const teamBadge = document.getElementById('team-badge')
     teamBadge.textContent=''
    if (teams == null) {
        document.getElementById('team-badge').innerHTML = `
            <h1 class="text-center mt-4 text-danger"> ${inputFieldText} Not Found!</h1>

        `
    }
    else {
        teams.forEach(team => {
           console.log(team.idTeam);
            const div = document.createElement('div');
           

            div.innerHTML = `
                <div class="row">
                    <div class="col-lg-6">
                        <div onclick="teamDetails(${team.idTeam})">
                            <img class="badge-img" src="${team.strTeamBadge}" alt="">
                            <a class="strTeam" href="">${team.strTeam}</a>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div id="">
                            <img class="badge-img" src="${team.strTeamJersey}" alt="">
                            <a class="strTeam" href="">${team.strTeam}</a>
                        </div>
                    </div>
                </div>
                `
            teamBadge.appendChild(div)
        });
    }
}


const teamDetails = (id) => {
    console.log(id);
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayTeamDetails(data.teams))
}



const displayTeamDetails=(teams)=>{
    const TeamDetail=document.getElementById('team-details')
    TeamDetail.textContent=''
    teams.forEach(team => {
        const div=document.createElement('div')
        div.innerHTML=`
            <div class="extra-design p-5">
                <div class="row">
                    <div class="col">
                        <dev class="d-flex flex-row justify-content-center align-items-center">
                            <img class="team-image" src="${team.strTeamBadge}" alt="">
                        </dev>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="d-flex flex-row justify-content-center align-items-center">
                        <div class="col-lg-6">
                            
                            <p><strong>Club Name:</strong> ${team.strAlternate}</p>
                            <p><strong>Stablished:</strong> ${team.intFormedYear}</p>
                            <p><strong>Stadium:</strong> ${team.strStadium}</p> 
                            <p><strong>Website:</strong><a href="${team.strFacebook}">${team.strFacebook}</a></p>
                            <p><strong>Facebook:</strong><a href="${team.strFacebook}">${team.strFacebook}</a></p>
                            <p><strong>Youtube:</strong> <a href="${team.strYoutube}">${team.strYoutube}</a></p> 
                        </div>
                        <div class="col-lg-6">
                            <div class="d-flex flex-row justify-content-center align-items-center">
                                <img class="jursy-img" src="${team.strTeamJersey}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
             
        TeamDetail.appendChild(div)
    });  
}

