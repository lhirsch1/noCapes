var thisUserId = ''
$(document).ready(function () {
    const pathName = window.location.pathname
    //listIdentifier changes what the userTask api call will look like
    let listIdentifier = ''
    const content = $(`.content`);
    
    if(pathName === '/mylist'){
        listIdentifier = 1;
    }
    else if(pathName === '/scorecard'){
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
        $.get(`/api/userTask/myList/${thisUserId}/${listIdentifier}`).then(function (data) {
            console.log(data)
            const taskHolder = $('.taskHolder')


            //consider having one page for both to do and scorecard


            for (let i = 0; i < data.length; i++) {
                console.log('task id ', data[i].TaskId);
                $.get(`/api/task/${data[i].TaskId}`).then(function (taskData) {
                    console.log('inside loop userTask data ', data[i]);
                    console.log('inside loop tast data ', taskData);

                    var taskCard = $("<div class = taskCard>");
                    var taskTitle = $("<p class='taskTitle'>");
                    var taskPhoto = $("<img src='../images/goodjob.jfif'>");
                    var taskDescript = $("<p class='taskDescript'>");
                    var addBtn = $("<button class='addBtn'>");
                    var deleteBtn = $("<button class='deleteBtn'>");

                    //if statement changes button action based on whether it is score or todo
                    if (listIdentifier===1){
                    addBtn.text("Mark Done");
                    //addbtn change to complete
                    //addBtn.val([data[i].id, data[i].confirmation])
                    deleteBtn.text("Remove");
                    }
                    else if (listIdentifier === 2){
                        
                    }

                    
                    taskDescript.text(taskData.description);
                    taskTitle.text(taskData.name);
                    console.log
                    taskCard.append(taskTitle, taskPhoto, taskDescript, addBtn, deleteBtn);
                    taskHolder.append(taskCard)

                   
                })
            }
        }).catch(error => console.log(error))

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