import { data } from "./data.js";

let directoryStack = ["~"];
let commandHistory = [];
let historyIndex = -1;

function updatePromptPath() {
  return `MohammedShujathNawaz@Nawaz-Mohammed:${directoryStack.join("/")}$`;
}

$(document).ready(function () {
  function placeCursorAtEnd(el) {
    el.focus();
  }

  function bindPromptEvents($prompt) {
    $prompt.on("input", function () {
      if ($(this).html() === "<br>" || $(this).html() === "") {
        $(this).html("");
      }
    });

    $prompt.on("keydown", function (e) {
        // --- Tab Auto-Completion ---
        if (e.key === "Tab") {
          e.preventDefault();
          const currentText = $prompt.text().trim();
          const tokens = currentText.split(" ");
          const cmd = tokens[0];
          const arg = tokens.slice(1).join(" ");
          const currentDirectory = directoryStack.join("/");

          let suggestions = [];

          if (tokens.length === 1) {
            // Suggest command names
            suggestions = [
              "ls", "cd", "cat", "clear", "help",
              "cat Education.txt", "cat Experience.txt", "cat AboutMe.txt",
              "cat Skills.txt", "cat Contact.txt",
              "cat resume_fullstack.pdf", "cat resume_ml.pdf"
            ];
          } else if (cmd === "cd") {
            suggestions = data.ls; // Suggest folder names
          } else if (cmd === "cat") {
            if (currentDirectory === "~") {
              suggestions = [
                "Education.txt", "Experience.txt", "AboutMe.txt",
                "Skills.txt", "Contact.txt", "resume_fullstack.pdf", "resume_ml.pdf"
              ];
            } else if (currentDirectory === "~/Projects") {
              suggestions = Object.keys(data.projects).map(p => p.replaceAll(" ", "_") + ".txt");
            }
          }

          const matchPrefix = tokens[tokens.length - 1];
          const matches = suggestions.filter(s => s.startsWith(matchPrefix));

          if (matches.length === 1) {
            tokens[tokens.length - 1] = matches[0];
            $prompt.text(tokens.join(" "));
          } else if (matches.length > 1) {
            // Show options below prompt
            const $output = $prompt.closest(".cmdBox").find(".terminalOutput").last();
            const listHTML = `<div class="d-flex flex-wrap gap-2">${matches.map(m => `<p>${m}</p>`).join("")}</div>`;
            $output.append(listHTML);
          }

          placeCursorAtEnd($prompt[0]);
          return;
        }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = $prompt.text().trim();
        
        if (cmd) {
          commandHistory.push(cmd);
          historyIndex = commandHistory.length;
        }
        const $output = $prompt
          .closest(".cmdBox")
          .find(".terminalOutput")
          .last();
        $prompt.addClass("stopCursor");

        let outputHTML = "";

        // Handle commands
        const currentDirectory = directoryStack.join("/");

        // ---- Basic Commands ----
        if (cmd === "ls" && currentDirectory === "~") {
          outputHTML += `<div class="d-flex gap-3 flex-wrap">
            ${data.ls.map((item) => `<p>${item}</p>`).join("")}
          </div>`;
        } else if (cmd === "cat Education.txt") {
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
        } else if (cmd === "cat Contact.txt") {
          outputHTML += `<div class="contactSection">
            <p><span class="contactLabel">Phone:</span> 9391090496</p>
            <p><span class="contactLabel">Email:</span> <a href="mailto:mohammedshujathnawaz@gmail.com">mohammedshujathnawaz@gmail.com</a></p>
            <p><span class="contactLabel">LinkedIn:</span> <a href="https://www.linkedin.com/in/mohammed-shujath-nawaz/" target="_blank">https://www.linkedin.com/in/mohammed-shujath-nawaz/</a></p>
            <p><span class="contactLabel">GitHub:</span> <a href="https://github.com/mrranger939" target="_blank">https://github.com/mrranger939</a></p>
          </div>`;
        } else if (cmd === "cat resume_fullstack.pdf") {
          outputHTML += `<p>Downloading Full Stack Resume...</p>
                         <a href="./resume_fullstack.pdf" download>Click to download</a>`;
        } else if (cmd === "cat resume_ml.pdf") {
          outputHTML += `<p>Downloading ML Resume...</p>
                         <a href="./resume_ml.pdf" download>Click to download</a>`;
        } else if (cmd === "cat Experience.txt") {
          outputHTML += `
          <div class="experience mb-4">
            <br>
            <div class="mb-2">
              <p class="fw-bold mb-1">Software Developer Intern</p>
              <p class="mb-1">GrapplTech</p>
              <p class="mb-1">June 2024 – July 2024</p>
              <p class="mb-2">Remote</p>
            </div>
            <ul class="mb-3">
              <li>Contributed to the development of a component library, enhancing reusability and consistency across projects.</li>
              <li>Designed and developed multiple Hero sections, improving visual appeal and user experience for the company’s web applications.</li>
            </ul>
            <div class="breakLineCollection">
              <hr class="breakLine">
              <hr class="breakLine">
            </div>
          </div>
        `;
        } else if (cmd === "cat AboutMe.txt") {
          outputHTML += `
        <div class="aboutMe mb-4">
          <br>
          <p class="mb-3">
            I'm <strong>Mohammed Shujath Nawaz</strong>, a Computer Science undergraduate at Chaitanya Bharathi Institute of Technology, with a CGPA of 9.55. I’m passionate about building useful, scalable software and continuously learning new technologies. During my internship at GrapplTech, I contributed to UI consistency by developing a reusable component library and designing responsive interfaces.
          </p>
          <p class="mb-3">
            My portfolio includes projects that solve real-world problems using clean, scalable code. I’ve built a YouTube video summarizer using Whisper and BART for efficient content extraction, a real-time chat-based safety platform, and a full-stack video streaming system. These projects reflect my ability to handle everything from backend logic to frontend design, and my comfort working with tools like Flask, Node.js, React, MongoDB, and Docker.
          </p>
          <p>
            I enjoy solving challenging problems, working on collaborative development teams, and writing code that’s both functional and maintainable.
          </p>
        </div>
      `;
        } else if (cmd === "cat Skills.txt") {
          outputHTML += `<div class="skillsSection">
                    <p><span class="skillName">Languages:</span> Python, Java, JavaScript, C++</p>
                    <p><span class="skillName">Frontend Technologies: </span> HTML/CSS, React, Next, Bootstrap, Tailwind</p>
                    <p><span class="skillName">Backend and Databases:</span> Node.js, Express, Flask, MongoDB, SQL</p>
                    <p><span class="skillName">Machine Learning, Deep Learning </span></p>
                    <p><span class="skillName">Tools: </span>Kafka, Docker, Git</p>
                    <p><span class="skillName">Others: </span>Data Structures and Algorithms</p>
                  </div>`;
        }

        // ---- Directory Navigation ----
        else if (cmd.startsWith("cd ")) {
          const target = cmd.split(" ")[1];
          
          if (target === "..") {
            if (directoryStack.length > 1) {
              directoryStack.pop(); // move one level up
            }
          } else if (data.ls.includes(target)) {
            directoryStack.push(target); // go into folder
          } else {
            outputHTML += `<p>No such directory: ${target}</p>`;
          }

          outputHTML += `<div class="cmdLine">
            <p class="me-2 systemName">${updatePromptPath()}</p>
            <div class="form-control ms-0 prompt" contenteditable="true"></div>
          </div>
          <div class="terminalOutput"></div>`;

          $output.append(outputHTML);
          const $newPrompt = $(".prompt").last();
          bindPromptEvents($newPrompt);
          placeCursorAtEnd($newPrompt[0]);
          return;
        }

        // ---- Projects Handling ----
        else if (cmd === "ls" && currentDirectory === "~/Projects") {
          const projectNames = Object.keys(data.projects);
          outputHTML += `<div class="d-flex flex-column gap-1">
            ${projectNames
              .map((name) => `<p>${name.replaceAll(" ", "_")}.txt</p>`)
              .join("")}
          </div>`;
        }else if (cmd === "help") {
          outputHTML += `
            <p>Available Commands:</p>
            <ul>
              <li>ls</li>
              <li>cd &lt;folder&gt;</li>
              <li>cat &lt;filename&gt;</li>
              <li>cat resume_fullstack.pdf</li>
              <li>cat resume_ml.pdf</li>
              <li>man</li>
              <li>help</li>
            </ul>
          `;
        }
 
        else if (
          cmd.startsWith("cat ") &&
          currentDirectory === "~/Projects"
        ) {
          const filename = cmd
            .replace("cat ", "")
            .replace(".txt", "")
            .replaceAll("_", " ");
          const project = data.projects[filename];
          if (project) {
            outputHTML += `
              <div class="project mb-4">
                <p><strong>${filename}</strong></p>
                <p><span class=" rb">Stack:</span> ${project.stack}</p>
                <ul class="mt-2">
                  ${project.points.map((p) => `<li>${p}</li>`).join("")}
                </ul>
                <div class="mt-2">
                  <a href="${
                    project.github
                  }" target="_blank" class="btn btn-sm btn-outline rb me-2">GitHub</a>
                  ${
                    project.live
                      ? `<a href="${project.live}" target="_blank" class="btn btn-sm btn-outline rb">Live</a>`
                      : ""
                  }
                </div>
              </div>`;
          } else {
            outputHTML += `<p>Project not found: ${filename}</p>`;
          }
        }

        // ---- Fallback ----
        else {
          outputHTML += `<p>command not found: ${cmd}</p>`;
        }

        // Append new prompt
        outputHTML += `
          <div class="cmdLine">
            <p class="me-2 systemName">${updatePromptPath()}</p>
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
        if ($prompt.text().length === 0) {
          e.preventDefault();
        }
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          $prompt.text(commandHistory[historyIndex]);
          placeCursorAtEnd($prompt[0]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          $prompt.text(commandHistory[historyIndex]);
          placeCursorAtEnd($prompt[0]);
        } else {
          historyIndex = commandHistory.length;
          $prompt.text(""); // Empty input
        }
      }
    });
  }

  const $initialPrompt = $(".prompt").last();
  bindPromptEvents($initialPrompt);
  placeCursorAtEnd($initialPrompt[0]);

  $(document).on("click", function () {
    placeCursorAtEnd($(".prompt").last()[0]);
  });
});
