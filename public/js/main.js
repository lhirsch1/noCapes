var thisUserId;

$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page

    $.get("/api/user_data").then(function (data) {
        thisUserId = data.id
        console.log('id ', thisUserId);
        $(".member-name").text(data.email);

        $.get(`/api/newtasks/` + thisUserId).then(function (data) {
            console.log("main js task ", data)
            const taskHolder = $('.taskHolder')

            newTasks = data[0];

            newTasks.forEach(
                ({ taskid, taskName, taskDescription, charityName, confirmation }) => {
                   
                    
                    var taskCard = $("<div class='taskCard'>");
                    var taskTitle = $("<p class='taskTitle'>");
                    var taskCharity = $("<p class='taskCharity'>");
                    var taskPhoto = $("<img src='../images/goodjob.jfif'>");
                    var taskDescript = $("<p class='taskDescript'>");
                    var addBtn = $("<button class='addBtn'>");
                    var deleteBtn = $("<button class='deleteBtn'>");
                    addBtn.text("Add To List");
                    addBtn.val([taskid,confirmation])
                    deleteBtn.text("Not Interested");
                    taskDescript.text(taskDescription);
                    taskTitle.text(taskName);
                    taskCharity.text(charityName)
                    console.log("data i : ")
                    taskCard.append(taskCharity, taskTitle, taskPhoto, taskDescript, addBtn, deleteBtn);
                    taskHolder.append(taskCard)
                
                
                });


            //renders new tasks for user
            // for (let i = 0; i < data.length; i++) {
            //     var taskCard = $("<div class='taskCard'>");
            //     var taskTitle = $("<p class='taskTitle'>");
            //     var taskCharity = $("<p class='taskCharity'>");
            //     var taskPhoto = $("<img src='../images/goodjob.jfif'>");
            //     var taskDescript = $("<p class='taskDescript'>");
            //     var addBtn = $("<button class='addBtn'>");
            //     var deleteBtn = $("<button class='deleteBtn'>");
            //     addBtn.text("Add To List");
            //     addBtn.val([data[i].id, data[i].confirmation])
            //     deleteBtn.text("Not Interested");
            //     taskDescript.text(data[i].description);
            //     taskTitle.text(data[i].name);
            //     console.log("data i : ", data[0])
            //     taskCard.append(taskTitle, taskPhoto, taskDescript, addBtn, deleteBtn);
            //     taskHolder.append(taskCard)

            // }
        }).catch(error => console.log(error))

    })






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
    });

    //popper.createPopper($(this),)
    alert('added to list')
    $(this).siblings().remove()
    $(this).remove()
})
function addTaskToList() {
    console.log(this.value);

}