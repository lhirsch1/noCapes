$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.email);
      });

      
    $.get("/api/tasks").then(function (data) {
        console.log(data)
        const taskHolder = $('.taskHolder')


        //renders new tasks for user
        for (let i = 0; i < data.length; i++) {
            var taskCard = $("<div class = taskCard>");
            var taskTitle = $("<p class='taskTitle'>");
            var taskPhoto = $("<img src='../images/goodjob.jfif'>");
            var taskDescript = $("<p class='taskDescript'>");
            var addBtn = $("<button class='addBtn'>");
            var deleteBtn = $("<button class='deleteBtn'>");
            addBtn.text("add");
            addBtn.val([data[i].CharityId,data[i].id])
            deleteBtn.text("delete");
            taskDescript.text(data[i].description);
            taskTitle.text(data[i].name);
            console.log
            taskCard.append(taskTitle, taskPhoto, taskDescript, addBtn, deleteBtn);
            taskHolder.append(taskCard)

        }
    }).then(function(data){
        let addBtns = $('.addBtn')
        //onclick to create userTask 
        addBtns.click(function(){

            console.log("this ",this.value)
        })
    }).catch(error => console.log(error))
    
    
});


function addTaskToList(){
    console.log(this.value);

}