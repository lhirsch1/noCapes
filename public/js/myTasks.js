var thisUserId = ''
$(document).ready(function () {
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
        //if there is time change this to one call with a join
        //get usertasks by status and ID. get info from task
        $.get(`/api/userTask/myList/${thisUserId}/${listIdentifier}`).then(function (data) {
            console.log("new way log", data)
            const taskHolder = $('.taskHolder')
            var myTasks = data[0]
            myTasks.forEach(
                ({ Taskid, TaskName, TaskDescription, CharityName, confirmation }) => {
                    var taskCard = $("<div class = taskCard>");
                    var taskTitle = $("<p class='taskTitle'>");
                    var taskPhoto = $("<img src='../images/goodjob.jfif'>");
                    var taskDescript = $("<p class='taskDescript'>");
                    var taskCharity = $("<p class='taskCharity'>");
                    var addBtn = $("<button class='addBtn'>");
                    var deleteBtn = $("<button class='deleteBtn'>");

                    //if statement changes button action based on whether it is score or todo
                    if (listIdentifier === 1) {
                        addBtn.text("Mark Done");
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
                    console.log
                    taskCard.append(taskCharity, taskTitle, taskPhoto, taskDescript, addBtn, deleteBtn);
                    taskHolder.append(taskCard)
                });
        })
    });
});

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
    console.log(this.value);

}