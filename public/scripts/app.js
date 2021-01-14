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

    // console.log($('#addTask').val());
    const addTitle = $('#addTask').val();
    $("#addTask").val("");
    const category = $('#categoriesCard1').val();
    const start_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    $.ajax({
      type: "POST",
      url: "/home",
      data: {
        todo_title: addTitle,
        add_category: category,
        date: start_date
      },
      success: function(res) {
        // console.log(res);
        // console.log("Success!");
        $(".todosTitle").html("");
          loadTitle();
    }
    }).done((user) => {
      console.log(user);
    });
  })

  const createTitleElement = function(objData) {
    const iconMarkup = `<i data-id="${objData.title}" class="fas fa-trash-alt"></i>`
    const markup = `<div class="tasks" data-id="title">
    ${objData.title}
      ${iconMarkup}
      <i class="fas fa-check"></i>
  </div>`
  return markup;
  }
  const renderTitle = function(titles) {

    $(".todosTitle").empty();
    for (let i in titles) {
      $(".todosTitle").prepend(createTitleElement(titles[i]));
    }
};

  const loadTitle = () => {
    $.ajax({
      type: "GET",
      url: "/home",
      success: function(data) {
        renderTitle(data);
      },
    });
  };
  loadTitle();


  //delete task
  $(document).on('click', '.fa-trash-alt', function(e) {
    e.preventDefault();

    const title = $('this').parent().attr('data-id');
    
    console.log($(this).attr('data-id'));
  });


  //   $.ajax({
  //     type: "POST",
  //     url: "/home",
  //     data: {
  //       todo_title: addTitle,
  //       add_category: category,
  //       date: start_date
  //     },
  //     success: function(res) {
  //       // console.log(res);
  //       // console.log("Sucess!");
  //       $(".todosTitle").html("");
  //         loadTitle();
  //   }
  //   }).done((user) => {
  //     console.log(user);
  //   });
  // })

//   const createTitleElement = function(objData) {
//     const markup = `<div class="tasks" id='title'>
//     ${objData.title}
//       <i class="fas fa-trash-alt"></i>
//       <i class="fas fa-check"></i>
//   </div>`
//   return markup;
//   }
//   const renderTitle = function(titles) {

//     $(".todosTitle").empty();
//     for (let i in titles) {
//       $(".todosTitle").prepend(createTitleElement(titles[i]));
//     }
// };
});