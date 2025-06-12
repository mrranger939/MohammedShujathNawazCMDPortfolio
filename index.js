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
        } else if(cmd === "cat Education.txt"){
          outputHTML += `<div class="education">
                    <br>
                    <p>Chaitanya Bharathi Institute of Technology</p>
                    <p>Hyderabad, Telangana</p>
                    <p> B.E in Computer Science and Engineering</p>
                    <p>CGPA: 9.55</p>
                    <p>2022 - 2026</p>
                    <div class="breakLineCollection">
                      <hr class="breakLine">
                      <hr class="breakLine">
                      <!-- <p class="breakLineEqual">===================================================================================================================================================================================</p> -->
                    </div>
                    <br>
                    <p>Prathibha Junior College</p>
                    <p>Mahabubnagar, Telangana</p>
                    <p>Intermediate: Mathematics, Physics, Chemistry</p>
                    <p>CGPA: 9.89</p>
                    <p> 2020 - 2022</p>
                    <div class="breakLineCollection">
                      <hr class="breakLine">
                      <hr class="breakLine">
                      <!-- <p class="breakLineEqual">===================================================================================================================================================================================</p> -->
                    </div>
                    <br>
                    <p> Panchavati Vidyalaya</p>
                    <p>Mahabubnagar, Telangana</p>
                    <p>X TGS SSC Board</p>
                    <p>GPA: 10</p>
                    <p>2020</p>
                  </div>`;
        } else if (cmd === 'cat Skills.txt'){
          outputHTML += `<div class="skillsSection">
                    <p><span class="skillName">Languages:</span> Python, Java, JavaScript, C++</p>
                    <p><span class="skillName">Frontend Technologies: </span> HTML/CSS, React, Next, Bootstrap, Tailwind</p>
                    <p><span class="skillName">Backend and Databases:</span> Node.js, Express, Flask, MongoDB, SQL</p>
                    <p><span class="skillName">Machine Learning, Deep Learning </span></p>
                    <p><span class="skillName">Tools: </span>Kafka, Docker, Git</p>
                    <p><span class="skillName">Others: </span>Data Structures and Algorithms</p>
                  </div>`
        }
         else {
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
