
/*jquery 4 step process
1. target:
2. addEventListener
3(optional) Retarget:
4. Effect
*/


$(() => {
  //target
  $('#newTask').submit(function(event) {
    event.preventDefault();
    console.log($('#addtask').val());
    const addTitle = $('#addtask').val();
    $.ajax({
      type: "POST",
      url: "/home",
      data: {todo_title: addTitle},
      success: function(res) {
        console.log(res);
        console.log("Sucess!");
    }
    }).done((user) => {
      console.log(user);
    });
  })
});
