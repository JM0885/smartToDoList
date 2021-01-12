<<<<<<< HEAD
<<<<<<< HEAD
$(() => {
  $.ajax({
    method: "GET",
    url: "/home/1"
  }).done((user) => {
    console.log(user);
    $('#user').html(`Name: ${JSON.stringify(user)}`);

  });
});
=======
>>>>>>> ba5ae02d5e2e838e1f9207c6132d737460388555

/*jquery 4 step process
1. target:
2. addEventListener
3(optional) Retarget:
4. Effect
<<<<<<< HEAD
>>>>>>> 74d3e527ba439a6d06a0509028f42aabc9a1f42e
=======
*/
>>>>>>> ba5ae02d5e2e838e1f9207c6132d737460388555


<<<<<<< HEAD
<<<<<<< HEAD
$(".btn-task").on('input', function(){
  if(keyCode == 13 && $(".btn-task").val() != "")
  {
    let task = $("<div class=''></div>").text($(".btn-task").val());
    $(".tasks").append(task);
    }
  });
=======
*/
=======
>>>>>>> ba5ae02d5e2e838e1f9207c6132d737460388555
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
<<<<<<< HEAD


>>>>>>> 74d3e527ba439a6d06a0509028f42aabc9a1f42e
=======
>>>>>>> ba5ae02d5e2e838e1f9207c6132d737460388555
