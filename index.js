import {data} from './data.js'
$(document).ready(function () {
  function placeCursorAtEnd(el) {
    el.focus();
  }

  console.log(data)
  function bindPromptEvents($prompt) {
    $prompt.on("input", function () {
      if ($(this).html() === "<br>" || $(this).html() === "") {
        $(this).html("");
      }
    });

    $prompt.on("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = $prompt.text().trim();
        const $output = $prompt.closest(".cmdBox").find(".terminalOutput").last();
        $prompt.addClass("stopCursor");
        let outputHTML = "";
        if (cmd === "ls") {
          const lsData = data.ls;
          outputHTML += `
            <div class="d-flex gap-3 flex-wrap">
              ${lsData.map(item=>`<p>${item}</p>`).join('')}
            </div>
          `;
        } else {
          outputHTML += `<p>command not found: ${cmd}</p>`;
        }

        // Append new prompt and output
        outputHTML += `
          <div class="cmdLine">
            <p class="me-2 systemName">MohammedShujathNawaz@Nawaz-Mohammed:~/portfolio$</p>
            <div class="form-control ms-0 prompt" contenteditable="true"></div>
          </div>
          <div class="terminalOutput"></div>
        `;

        $output.append(outputHTML);

        
        const $newPrompt = $(".prompt").last();
        bindPromptEvents($newPrompt);
        placeCursorAtEnd($newPrompt[0]);
      }

      if (e.key === "Backspace") {
        const text = $prompt.text();
        if (text.length === 0) {
          e.preventDefault();
        }
      }
    });
  }

 
  const $initialPrompt = $(".prompt").last();
  bindPromptEvents($initialPrompt);
  placeCursorAtEnd($initialPrompt[0]);

  
  $(document).on("click", function () {
    const $lastPrompt = $(".prompt").last();
    placeCursorAtEnd($lastPrompt[0]);
  });
});
