$(document).ready(function () {
  $(".heading").text("Computer Items");

  // FETCHING DATA FROM JSON FILE
  $.getJSON("Items.json", function (data) {
    var card = "";
    const active = data;
    const deleted = [];
    var totalPrice = 0;

    // ITERATING THROUGH OBJECTS
    $.each(data, function (key, value) {
      // DATA FROM JSON OBJECT
      card += '<div class="card">';
      card += '<div class="card-body">';
      card +=
        '<h5 class="card-title">Brand:' +
        (value.brand ? value.brand : value.name) +
        "</h5>";
      card += '<p class="card-text">Model:' + value.model + "</p>";

      card += '<p class="card-text">Type:' + value.type + "</p>";

      card += '<p class="card-text">Price:' + value.price + "</p>";

      card +=
        '<button class="card-action btn btn-danger btn-action" value=' +
        value.id +
        ">" +
        "Delete" +
        "</button>";

      card += "</div>";
      card += "</div>";

      totalPrice += value.price;
    });

    var activeSubTotal = totalPrice;
    var deletedSubTotal = 0;
    // appending card in active section initially
    $("#activeCart").append(card);
    $("#totalPrice").text(totalPrice);
    $("#activeSubTotal").text(activeSubTotal);
    $("#deletedSubTotal").text(deletedSubTotal);

    $(".btn-action").click(function () {
      if ($(this).text() == "Delete") {
        var activeValue = $(this).attr("value");
        var index = active.findIndex(function (o) {
          return o.id === parseInt(activeValue);
        });
        if (index !== -1) {
          console.log(typeof active[index]);
          activeSubTotal -= active[index].price;
          deletedSubTotal += active[index].price;
          deleted.push(...active.splice(index, 1));
        }
        $(this)
          .removeClass("btn-danger")
          .addClass("btn-success")
          .text("Restore");
        $("#deletedCart").append($(this).parent().parent());
        $("#activeSubTotal").text(activeSubTotal);
        $("#deletedSubTotal").text(deletedSubTotal);
      } else if ($(this).text() == "Restore") {
        var deleteValue = $(this).attr("value");
        var index2 = deleted.findIndex(function (o) {
          return o.id === parseInt(deleteValue);
        });
        if (index2 !== -1) {
          activeSubTotal += deleted[index2].price;
          deletedSubTotal -= deleted[index2].price;
          active.push(...deleted.splice(index2, 1));
        }
        $(this)
          .removeClass("btn-success")
          .addClass("btn-danger")
          .text("Delete");
        $("#activeSubTotal").text(activeSubTotal);
        $("#deletedSubTotal").text(deletedSubTotal);
        $("#activeCart").append($(this).parent().parent());
      }
    });
  });
});
