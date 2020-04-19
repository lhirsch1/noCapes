const exif = require('exif-js');


/*
Checklist

upload photo
check exif data for location maybe in userTask
compare to charity location
approve if within range
marks task as done

*/






var thisUserId = ''
$(document).ready(function () {
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
          console.log('nope')
        }
      }
      
      function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude);
      }

      getLocation()
    
    console.log('window ', window.navigator.geolocation)
    const pathName = window.location.pathname
    //listIdentifier changes what the userTask api call will look like
    let listIdentifier = ''
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
                ({ Taskid, TaskName, TaskDescription, CharityName, confirmation }) => {
                    var taskCard = $("<div class = taskCard>");
                    var taskTitle = $("<p class='taskTitle'>");
                    var taskPhoto = $("<img src='../images/goodjob.jfif'>");
                    var taskDescript = $("<p class='taskDescript'>");
                    var taskCharity = $("<p class='taskCharity'>");
                    var addBtn = $("<button class='addBtn'>");
                    var deleteBtn = $("<button class='deleteBtn'>");
                    addBtn.val(Taskid)

                    //if statement changes button action based on whether it is score or todo
                    if (listIdentifier === 1) {
                        addBtn.text("Mark Done");
                        markTaskDone(addBtn.value)
                        //addbtn change to complete
                        //addBtn.val([data[i].id, data[i].confirmation])
                        deleteBtn.text("Remove");
                    }
                    else if (listIdentifier === 2) {
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

function markTaskDone(id){
    //$.put(`/api/userTask/${id}`)
}

$(document).on('click', '.addBtn', function () {
    var confirmBool;

    //just a lil sugar 
    this.value[2] === 't' ? confirmBool = 1 : confirmBool = 0


    //clicking add button creates a userTask and removes from the new task queue
    $.post('/api/userTasks', {
        completionStatus: 1,
        photo: 'hi',
        confirmed: confirmBool,
        TaskId: this.value[0],
        UserId: thisUserId
    })
})
function addTaskToList() {


}


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		console.log(dist);
	}
}

distance(44.941311999999996,-93.28721920000001,44.963650,-93.278590,"M")

//function gets current location 
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log('Please enable location services')
    }
  }
  
  function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude);
    distance(position.coords.latitude, position.coords.longitude, charLat, charLong, "M")
  }

  getLocation()