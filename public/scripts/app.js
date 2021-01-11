$(() => {
  $.ajax({
    method: "GET",
    url: "/home/1"
  }).done((user) => {
    console.log(user);
    $('#user').html(`Name: ${JSON.stringify(user)}`);

  });
});





