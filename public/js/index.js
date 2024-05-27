// IMAGE INPUT LOGIC
var loadFile = function(event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);

  if (event.target.files[0]) {
    document.querySelector(`input[type="submit"]`).classList.remove("hidden");

    // TODO: fix text appended more if choosing another file
    document.querySelector(`label[for="file_upload"]`).append(`(${event.target.files[0].name})`);
  }
};

// INPUT NUMBER RESTRICTOR
Array.from(document.querySelectorAll('input[type="number"]')).map(element => {
  element.addEventListener("keypress", function(evt) {
    if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
    }
  });

  element.addEventListener("paste", function(e) {
    e.preventDefault();
    var pastedText = '';
    if (window.clipboardData && window.clipboardData.getData) { // IE
      pastedText = window.clipboardData.getData('Text');
    } else if (e.clipboardData && e.clipboardData.getData) {
      pastedText = e.clipboardData.getData('text/plain');
    }

    this.value = pastedText.replace(/\D/g, '');
  })
});
