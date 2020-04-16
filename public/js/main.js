$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/tasks").then(function (data) {
        console.log(data)
        const taskHolder = $('.taskHolder')



        for (let i = 0; i < data.length; i++) {
            var taskCard = $("<div class = taskCard>");
            var taskTitle = $("<p class='taskTitle'>");
            var taskPhoto = $("<img src='../images/goodjob.jfif'>");
            var taskDescript = $("<p class='taskDescript'>");
            taskDescript.text(data[i].description);
            taskTitle.text(data[i].name);
            console.log
            taskCard.append(taskTitle, taskPhoto, taskDescript);
            taskHolder.append(taskCard)

        }
    });
});
