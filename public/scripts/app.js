// *jquery 4 step process
// 1. target:
// 2. addEventListener
// 3(optional) Retarget:
// 4. Effect
// */

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
    const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
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


  $('#categoriesCard2').on('change',function(event) {
    event.preventDefault();
    const tasks = $('#categoriesCard2').val();
      $(".todosTitle .tasks").each(function() {
        const category = $(this).attr("data-id");
        $(this).removeClass("hidden");
        if(category !== tasks){
          $(this).addClass("hidden");
        }
      });
  })


  //delete task
  $(document).on('click', '.fa-trash-alt', function(e) {
    e.preventDefault();

    const id = $(e.target).attr('data-id');
    $.ajax({
    url: `/delete/${id}`,
    method: 'DELETE',
    }).then((res) => { 
      const element = $(this).parent()
      element.remove();
    }).catch(err => {
      console.log("Error, item not removed.", err);
    });
  });

});
