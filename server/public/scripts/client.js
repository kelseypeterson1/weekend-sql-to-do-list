// calling jQuery
$(readyNow);

// setting up click listeners
function readyNow() {
    console.log('jquery is setup');
    getTasks();
    $('#btn-submit').on('click', postTask);
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
