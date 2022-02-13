// calling jQuery
$(readyNow);

// setting up click listeners
function readyNow() {
    console.log('jquery is setup');
    getTasks();
    $('#btn-submit').on('click', postTask);
    $('#tasksTable').on('click', '.btn-complete', completeTask);
    $('#tasksTable').on('click', '.btn-delete', deleteTask);
};

// send new task to server based on user input
function postTask() {
    console.log('submit button pressed')
    let taskObject = {
        task: $('#task').val(),
        owner: $('#owner').val(),
        date: $('#date').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskObject
    }).then( function (response) {
        $('#task').val(''),
        $('#owner').val(''),
        $('#date').val(''),
        getTasks();
    });
}

// determine if task should have a 'complete' or 'delete' button
function buttonCreation(completeStatus) {
    if (completeStatus === false) {
        return '<button class="btn-complete" data-id=${response[i].id}>Complete</button>'
    } else {
        return '<button class="btn-delete" data-id=${response[i].id}>Delete</button>'
    } 
}

// get tasks from the server
function getTasks() {
    $("#tasksTable").empty();
    $.ajax({
        type: 'GET',
        url: `/tasks`
    }).then(function (response) {
        console.log("GET /tasks response", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            // turn date into readable format
            let date = new Date(response[i].due);
            let formattedDate = date.toLocaleDateString();
            $('#tasksTable').append(`
                <tr data-id=${response[i].id}>
                    <td>${response[i].task}</td>
                    <td>${response[i].owner}</td>
                    <td>${formattedDate}</td>
                    <td>${buttonCreation(response[i].complete)}</td>
                </tr>`)
        }
    });
}

// 'complete' button will change status of task in database through the server
function completeTask() {
    let id = $(this).closest('tr').data().id
    console.log(id);

    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {
            status: 'complete'
        }
    }).then(function(response) {
        getTasks();
    }).catch(function(err){
        console.log(err);
    })
}

// 'delete' button will remove task from database through the server
function deleteTask() {
    let id = $(this).closest('tr').data().id
    console.log(id);

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    })
    .then(function(response) {
        console.log('Task deleted');
        getTasks();
    })
    .catch(function(error) {
        console.log('Error deleting task', error);
    })
}