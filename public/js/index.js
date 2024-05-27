// IMAGE INPUT LOGIC
$("#file_upload").on("change", function(evt) {
  const file = evt.target.files[0];

  if (file) {
    var image = $("#output");
    image.attr("src", URL.createObjectURL(file));
    $("input[type='submit']").removeClass("hidden");
    // TODO: fix text appended more if choosing another file
    $("label[for='file_upload']").append(`(${file.name}) `)
  }
});

// INPUT NUMBER RESTRICTOR
$("input[type='number']").on("keypress", function(evt) {
  if (evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});

// PASTE RESTRICTOR
$("input[type='number']").on("paste", function(evt) {
  evt.preventDefault();
  var pastedText = '';
  if (window.clipboardData && window.clipboardData.getData) { // IE
    pastedText = window.clipboardData.getData('Text');
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    pastedText = evt.clipboardData.getData('text/plain');
  }

  this.value = pastedText.replace(/\D/g, '');
});

// FORM VALIDATION. DISABLE SUBMIT 
// IF EMPTY
$("form").on("change", function(evt) {
  var tile_height = $("input[name='tile_height']");
  var tile_width = $("input[name='tile_width']");

  if (tile_height.val() != "" && tile_width.val() != "") {
    $('input[type=submit]').removeAttr('disabled');
  } else {
    evt.preventDefault();
    $('input[type=submit]').attr('disabled', 'disabled');
  }
});
