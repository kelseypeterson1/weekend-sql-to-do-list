// calling jQuery
$(readyNow);

// setting up click listeners
function readyNow() {
    console.log('jquery is setup');
    getTasks();
    $('#btn-submit').on('click', addInputs);
};

function addInputs() {
    console.log('submit button pressed')
}

// get tasks from the server
function getTasks() {
    $("#tasksTableBody").empty();
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
                    <td>
                        <button class="btn-delete" data-id=${response[i].id}>Delete</button>
                    </td>
                </tr>
            `);
        }
    });
}
