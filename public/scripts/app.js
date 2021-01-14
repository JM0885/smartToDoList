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

    ${objData.title}
      ${iconMarkup}
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


  const loadTitle = () => {
    $.ajax({
      type: "GET",
      url: "/home",
      success: function(data) {
        renderTitle(data);
      },
    });
  };

