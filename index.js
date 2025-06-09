$(document).ready(function () {
  const $prompt = $("#prompt");
  $prompt.on("input", function () {
    if ($(this).html() === "<br>" || $(this).html() === "") {
      $(this).html("");
    }
  });
  function placeCursorAtEnd(el) {
    el.focus();
  }
  placeCursorAtEnd($prompt[0]);
  $(document).on("click", function () {
    placeCursorAtEnd($prompt[0]);
  });
  $prompt.on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Backspace") {
      const text = $prompt.text();
      console.log(text);

      if (text.length === 0) {
        e.preventDefault();
      }
    }
  });
});
