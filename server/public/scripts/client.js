$(function() {
    console.log("jquery is setup")
});



// get tasks from the server
function getTasks() {
    $("#tasksTableBody").empty();
    $.ajax({
        type: 'GET',
        url: `/tasks`
    }).then(function (response) {
        console.log("GET /tasks response", response);
        // append data to the DOM
        // for (let i = 0; i < response.length; i++) {
        //     $('#songsTableBody').append(`
        //         <tr data-id=${response[i].id}>
        //             <td>${response[i].artist}</td>
        //             <td>${response[i].track}</td>
        //             <td>${response[i].rank}
        //                 <button class="btn-vote">UP</button>
        //                 <button class="btn-vote">DOWN</button>
        //             </td>
        //             <td>${response[i].published}</td>
        //             <td>
        //                 <button class="btn-delete" data-id=${response[i].id}>Delete</button>
        //             </td>
        //         </tr>
        //     `);
        // }
    });
}
