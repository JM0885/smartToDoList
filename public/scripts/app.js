$(() => {
  $.ajax({
    method: "GET",
    url: "/home/1"
  }).done((user) => {
    console.log(user);
    $('#user').html(`Name: ${JSON.stringify(user)}`);

  });
});

//append new task input to task list

$(document).ready(function () {
$("#task_input").on('input', function(){
  if(keyCode == 13 && $("#task_input").val() != "")
  {
    let task = $("<div class='task_input'></div>").text($("#addtask").val());
    $(".tasks").append(task);
    } 
  });
});

$(".btn-task").on('input', function(){
  if(keyCode == 13 && $(".btn-task").val() != "")
  {
    let task = $("<div class=''></div>").text($(".btn-task").val());
    $(".tasks").append(task);
    }
  });