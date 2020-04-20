

var thisUserId = '';
var thisTask;
let userLat;
let userLng;
let charLat;
let charLng;
let listIdentifier = ''
let userDistance;
$(document).ready(function () {

    console.log('window ', window.navigator.geolocation)
    const pathName = window.location.pathname
    //listIdentifier changes what the userTask api call will look like
    //1 means todo list
    //2 is scorecard

    const content = $(`.content`);

    if (pathName === '/mylist') {
        listIdentifier = 1;
    }
    else if (pathName === '/scorecard') {
        listIdentifier = 2
        //rendering score
        const scoreBoard = $(`<div class='scoreboard'>`);
        const points = $(`<p class='pointHolder'>`)
        points.text('howdy!')
        scoreBoard.append(points);
        content.prepend(scoreBoard)
    }
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page


    $.get("/api/user_data").then(function (data) {
        thisUserId = data.id
        console.log('id ', thisUserId);
        $(".member-name").text(data.email);


        //This call gets the tasks to populate either the todo list or the scoreboard
        //
        $.get(`/api/userTask/myList/${thisUserId}/${listIdentifier}`).then(function (data) {
            console.log("new way log", data)
            const taskHolder = $('.taskHolder')
            var myTasks = data[0]
            //creates a new card for each task
            myTasks.forEach(
                ({UserTaskId, TaskId, TaskName, TaskDescription, CompletionMessage, CharityName, CharityPhoto, CharityId, confirmed, TaskBadge }) => {
                    var taskCard = $("<div class = taskCard>");
                    var taskTitle = $("<p class='taskTitle'>");
                    var taskPhoto = $(`<img src='../images/${CharityPhoto}'>`);
                    var taskDescript = $("<p class='taskDescript'>");
                    var taskCharity = $("<p class='taskCharity'>");
                    var addBtn = $("<button class='addBtn'>");
                    var deleteBtn = $("<button class='deleteBtn'>");
                    console.log("taskid", TaskId)
                    addBtn.val([TaskId])

                    //if statement changes button action based on whether it is score or todo
                    if (listIdentifier === 1) {
                        addBtn.text("Mark Done");
                        addBtn.attr('data-toggle', 'modal');
                        addBtn.attr('data-target', '#completeModal');
                        addBtn.attr('data-completionMessage', CompletionMessage);
                        addBtn.attr('data-TaskName', TaskName);
                        addBtn.attr('data-confirm', confirmed);
                        addBtn.attr('data-charId', CharityId);
                        addBtn.attr('data-userTaskId', UserTaskId)

                        //addbtn change to complete
                        //addBtn.val([data[i].id, data[i].confirmation])
                        deleteBtn.text("Remove");
                    }
                    else if (listIdentifier === 2) {

                        const trophyButton = $(`<button class='trophyBtn'>`);
                        trophyButton.text('View Trophies');
                        taskHolder.append(trophyButton)
                        addBtn.text("View Details")
                    }
                    taskDescript.text(TaskDescription);
                    taskTitle.text(TaskName);
                    taskCharity.text(CharityName)
                    taskCard.append(taskCharity, taskTitle, taskPhoto, taskDescript, addBtn, deleteBtn);
                    taskHolder.append(taskCard)
                });
        })
    });
});

function markTaskDone(id) {
    console.log("mark task")
    //     $.put(`/api/userTask/${id}`)
}



$(document).on('click', '.addBtn', function () {
    //if todo
    const modalBody = $('.modal-body')
    const completionMessage = $(`<p class='completionMessage'>`);
    const taskName = $(`<p class='taskName'>`);
    let completionDirections = $(`<p class='completionDirections'>`)
    if (listIdentifier === 1) {

        console.log(this.dataset)
        console.log(this.dataset.completionmessage)
        modalBody.empty()
        
        taskName.text(this.dataset.taskname);
        
        completionMessage.text(this.dataset.completionmessage);
        modalBody.append(completionMessage)
        //confirmation 0 means location based confirmation
        if (this.dataset.confirm === "0") {
            const modalButton = $('#submitTask');
           thisTask = this.dataset.usertaskid;
           console.log("this task", thisTask)
           


            completionDirections.text('Checking location...');
            

            modalBody.append(completionDirections)
            
            userLoc = getLocation();
        
            $.get(`/api/charity/${this.dataset.charid}`).then(function (data) {
                console.log(data)
                var normStAddress = data[0].streetAddress.replace(/\s/g, "+");
                var normCity = data[0].city.replace(/\s/g, "+");
                console.log('address', data[0].streetAddress)
                console.log('normalized address ', normStAddress)
                var address = `${data[0].streetAddress} ${data[0].city} ${data[0].zipCode} ${data[0].state}`;
                console.log(address)
                //api call takes address of charity and converts into coordinates
                $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${normStAddress},+${normCity},+${data[0].state}&key=AIzaSyC-_L6Oc4Q6H7fQruQLjF2TfW2EL-eB9yo`).then(function (data) {
                    charLat = data.results[0].geometry.location.lat;
                    charLng = data.results[0].geometry.location.lng;
                    console.log("Charitylat = ", charLat);
                    console.log("Charitylon = ", charLng);
                    distance(userLat, userLng, charLat, charLng, "M")
                    
                }).then(
                    //if the distance is within range, the event is considered complete. later there will be other ways to confirm
                    function(){
                        if (userDistance < .4){
                            
                            completionDirections.html('Location confirmed! </br> Press Save to complete');
                            modalBody.append(completionDirections)
                            modalButton.prop('disabled', false)

                        }
                        else{
                            console.log("nope")
                        }
                    }
                )
                // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
            })

            console.log("user distance ", userDistance)
            
            
        }
       

    }
    //if scorecard
    else if (listIdentifier === 2) {

    }
})

//function gets current location 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('Please enable location services')
    }
}

function showPosition(position) {
    userLat = position.coords.latitude
    userLng = position.coords.longitude
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        console.log('distance ', dist);
        userDistance = dist;
    }
}


$(document).on('click', '#submitTask', function (){
    console.log(' this is the task! ', thisTask )
   
    $.ajax({
        url: `/api/userTasks/${thisTask}`,
        type: 'PUT',
        success: function(response){
            console.log(response)
        }
    })
    

})



