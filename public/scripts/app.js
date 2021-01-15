// *jquery 4 step process
// 1. target:
// 2. addEventListener
// 3(optional) Retarget:
// 4. Effect
// */

$(() => {
  const $todoCount = $(".todo-count");
  $('#newTask').submit(function (event) {
    event.preventDefault();
    const addTask = $('#addTask').val();
    console.log(addTask);
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

      success: function (res) {
        $(".todosTitle").html("");
        loadTitle();
      }
    }).done((user) => {
      console.log("success");
    });
  })

  //template markup for task list
  //category dependent info is interpolated
  const createTitleElement = function (objData) {
    if (objData.category_id === 1) {
      const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
      const markup = `<div class="tasks" data-id="${objData.category_id}">
    ${objData.title}
    <img class="img-hover" src="${objData.img_url}" alt="update" loading="lazy">
      ${iconMarkup}
      <i data-id="${objData.id}" class="fas fa-check"></i>
  </div>`;
      return markup;

    } else if (objData.category_id === 2){
            const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
      const markup = `<div class="tasks" data-id="${objData.category_id}">
    ${objData.title}
    <a href=${objData.info_url}>
    <img class="img-hover" src="${objData.img_url}" alt="update" loading="lazy">
    </a>
      ${iconMarkup}
      <i data-id="${objData.id}" class="fas fa-check"></i>
  </div>`;
      return markup;

    } else if (objData.category_id === 3) {
      const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
      const markup = `<div class="tasks" data-id="${objData.category_id}">
    ${objData.title}
    <div>By ${objData.author}</div>
      ${iconMarkup}
      <i data-id="${objData.id}" class="fas fa-check"></i>
  </div>`;
      return markup;

    } else if (objData.category_id === 4) {
      const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
      const markup = `<div class="tasks" data-id="${objData.category_id}">
    ${objData.title}
    <div>${objData.resto_title}</div>
      ${iconMarkup}
      <i data-id="${objData.id}" class="fas fa-check"></i>
  </div>`;
      return markup;
    }
  };

  //template markup for completed tasks
  const createCompletedElement = function (objData) {
    const iconMarkup = `<i data-id="${objData.id}" class="fas fa-trash-alt"></i>`
    const markup = `<div class="comptasks" data-id="${objData.category_id}">
    ${objData.title}
      ${iconMarkup}
  </div>`
    return markup;
  }

  //renders task list
  const renderTitle = function (titles) {
    $(".todosTitle").empty();
    let todoCount = 0;
    console.log("titles", titles)
    for (let i in titles) {
      if (titles[i].end_date === null && titles[i].title !== '' && titles[i].title !== null) {
        $(".todosTitle").prepend(createTitleElement(titles[i]));
        todoCount++;
      }
    }
    $todoCount.text(todoCount);
    return titles;
  };

  //renders completed tasks
  const renderCompleted = function (task) {
    $(".completedTitle").empty();
    for (let i in task) {
      if (task[i].end_date !== null) {
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
      },
    });
  };
  loadTitle();

  //sorts task list
  $('#categoriesCard2').on('change', function (event) {
    event.preventDefault();
    const tasks = $('#categoriesCard2').val();
    console.log("TASKS;", tasks);
    $(".todosTitle .tasks").each(function () {
      const category = $(this).attr("data-id");
      if (tasks === 'all') {
        $(this).removeClass("hidden");
      } else if (category !== tasks) {
        $(this).addClass("hidden");
      } else {
        $(this).removeClass("hidden");
      }
    });
  })

  //sorts completed tasks
  $('#categoriesCard3').on('change', function (event) {
    event.preventDefault();
    const tasks = $('#categoriesCard3').val();
    console.log("Tasks", tasks);
    $(".completedTitle .comptasks").each(function () {
      const category = $(this).attr("data-id");
      if (tasks === 'all') {
        $(this).removeClass("hidden");
      } else if (category !== tasks) {
        $(this).addClass("hidden");
      } else {
        $(this).removeClass("hidden");
      }
    });
  })


  //delete task
  $(document).on('click', '.fa-trash-alt', function (e) {
    e.preventDefault();

    const id = $(e.target).attr('data-id');
    $.ajax({
      url: `/delete/${id}`,
      method: 'DELETE',
    }).then((res) => {
      const element = $(this).parent()
      element.remove();
      loadTitle();
    }).catch(err => {
      console.log("Error, item not removed.", err);
    });
  });

  //completed task
  $(document).on('click', '.fa-check', function (e) {
    e.preventDefault();

    const id = $(e.target).attr('data-id');
    $.ajax({
      url: `/complete/${id}`,
      method: 'POST',
    }).then((task) => {
      const element = $(this).parent()
      element.remove();
      $(".completedTitle").prepend(createCompletedElement(task));
      loadTitle();
    }).catch(err => {
      console.log("Error, item not removed.", err);
    });
  });

});
