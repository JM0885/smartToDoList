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
    const addTask = $('#addTask').val();
    $("#addTask").val("");
    const category = $('#categoriesCard1').val();
    const start_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    $.ajax({
      type: "POST",
      url: "/home",
      data: {
        addTask: addTask,
        category: category,
        start_date: start_date
      },
      success: function(res) {
        $(".todosTitle").html("");
          loadTitle();
    }
    }).done(() => {
      console.log("done");
    });
  })

  const createTitleElement = function(objData) {
    console.log("objectData",objData.category_id);
    const markup = `<div class="tasks" id='title' data-id="${objData.category_id}">
    ${objData.title}
      <i class="fas fa-trash-alt"></i>
      <i class="fas fa-check"></i>
  </div>`
  return markup;
  }
  const renderTitle = function(titles) {
    // console.log(titles);
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
});
