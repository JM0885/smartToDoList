// *jquery 4 step process
// 1. target:
// 2. addEventListener
// 3(optional) Retarget:
// 4. Effect
// */

/* const fetchCategory = function () {
  $.ajax({
    type: "GET",
    url: "/categories",
    data: {},
    success: function (res) {
      console.log("fetchting categories", res[0]);
    }
  });
};

fetchCategory(); */

$(() => {

  //target
  $('#newTask').submit(function (event) {
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
    }).done((user) => {
      console.log("success");
    });
  })


  const createTitleElement = function(objData) {
    const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
    const markup = `<div class="tasks" data-id="${objData.category_id}">

    ${objData.title}
      ${iconMarkup}
      <i data-id="${objData.id}" class="fas fa-check"></i>
  </div>`

    return markup;
  }
  
  const createCompletedElement = function(objData) {
    const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
    const markup = `<div class="comptasks" data-id="${objData.category_id}">
    ${objData.title}
      ${iconMarkup}
  </div>`
  return markup; 
  }

  const renderTitle = function(titles) {
    $(".todosTitle").empty();
    for (let i in titles) {
      if (titles[i].end_date === null) {
        console.log("Executed1");
      $(".todosTitle").prepend(createTitleElement(titles[i]));
      }
    }
};

const renderCompleted = function(task) {
  $(".completedTitle").empty();
  console.log("Task " + task[0].end_date);
  for (let i in task) {
    if (task[i].end_date !== null) {
      console.log("Executed");
    $(".completedTitle").prepend(createCompletedElement(task[i]));
    }
  }
};

  const loadTitle = () => {
    $.ajax({
      type: "GET",
      url: "/home",
      success: function (data) {
        renderTitle(data);
        renderCompleted(data);
        console.log(data);
      },
    });
  };
  loadTitle();





  $('#categoriesCard2').on('change',function(event) {
    event.preventDefault();
    const tasks = $('#categoriesCard2').val();
    console.log("tasks", tasks);
    $(".todosTitle .tasks").each(function() {
      const category = $(this).attr("data-id");
      console.log("THIS", this);
      if(category !== tasks){
          $(this).addClass("hidden");
          console.log("Category hidden",category);
        }else{
          $(this).removeClass("hidden");
          console.log("Category Not Hidden", category);
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

  //completed task
  $(document).on('click', '.fa-check', function(e) {
    e.preventDefault();

    const id = $(e.target).attr('data-id');
    $.ajax({
    url: `/complete/${id}`,
    method: 'POST',
    }).then((task) => {
      const element = $(this).parent()
      element.remove();
      $(".completedTitle").prepend(createCompletedElement(task));
    }).catch(err => {
      console.log("Error, item not removed.", err);
    });
  });

});
