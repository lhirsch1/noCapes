var thisUserId = ''
$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page

    $.get("/api/user_data").then(function (data) {
        thisUserId = data.id
        console.log('id ', thisUserId);
        $(".member-name").text(data.email);
        $.get(`/api/userTask/myList/${thisUserId}`).then(function (data) {
            console.log(data)
            const taskHolder = $('.taskHolder')


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
                    addBtn.text("add");
                    //addbtn change to complete
                    //addBtn.val([data[i].id, data[i].confirmation])
                    deleteBtn.text("delete");
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