import { data } from "./data.js";
let currentDirectory = "~";

function updatePromptPath() {
  return `MohammedShujathNawaz@Nawaz-Mohammed:${currentDirectory}$`;
}
$(document).ready(function () {
  function placeCursorAtEnd(el) {
    el.focus();
  }

  console.log(data);
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
        const $output = $prompt
          .closest(".cmdBox")
          .find(".terminalOutput")
          .last();
        $prompt.addClass("stopCursor");
        let outputHTML = "";
        if (cmd === "ls") {
          const lsData = data.ls;
          outputHTML += `
            <div class="d-flex gap-3 flex-wrap">
              ${lsData.map((item) => `<p>${item}</p>`).join("")}
            </div>
          `;
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
        }else if (cmd === 'cat resume_fullstack.pdf') {
          outputHTML += `
            <p>Downloading <strong>Full Stack Developer Resume</strong>...</p>
            <a href="./resume_fullstack.pdf" download class="btn btn-sm rb btn-outline mt-2">Click here if download doesn’t start</a>
          `;
        } else if (cmd === 'cat resume_ml.pdf') {
          outputHTML += `
            <p>Downloading <strong>Machine Learning Resume</strong>...</p>
            <a href="./resume_ml.pdf" download class="btn btn-sm btn-outline rb mt-2">Click here if download doesn’t start</a>
          `;
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
        }else if (cmd === "cd Projects") {
          currentDirectory = "~/Projects";
          $prompt.addClass("stopCursor");
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
          return;
        }else if (cmd === "ls" && currentDirectory === "~/Projects") {
          const projectNames = Object.keys(data.projects);
          outputHTML += `
            <div class="d-flex flex-column gap-1">
              ${projectNames.map(name => `<p>${name.replaceAll(" ", "_")}.txt</p>`).join("")}
            </div>
          `;
        }
        else if (cmd.startsWith("cat ") && currentDirectory === "~/Projects") {
          const filename = cmd.replace("cat ", "").replace(".txt", "").replaceAll("_", " ");
          const project = data.projects[filename];

          if (project) {
            outputHTML += `
              <div class="project mb-4">
                <p><strong>${filename}</strong></p>
                <p><span class="text-secondary">Stack:</span> ${project.stack}</p>
                <ul class="mt-2">
                  ${project.points.map(p => `<li>${p}</li>`).join("")}
                </ul>
                <div class="mt-2">
                  <a href="${project.github}" target="_blank" class="btn btn-sm btn-outline-primary me-2">GitHub</a>
                  ${project.live ? `<a href="${project.live}" target="_blank" class="btn btn-sm btn-outline-success">Live</a>` : ""}
                </div>
              </div>
            `;
          } else {
            outputHTML += `<p>Project not found: ${filename}</p>`;
          }
        }

         else if (cmd === "cat Skills.txt") {
          outputHTML += `<div class="skillsSection">
                    <p><span class="skillName">Languages:</span> Python, Java, JavaScript, C++</p>
                    <p><span class="skillName">Frontend Technologies: </span> HTML/CSS, React, Next, Bootstrap, Tailwind</p>
                    <p><span class="skillName">Backend and Databases:</span> Node.js, Express, Flask, MongoDB, SQL</p>
                    <p><span class="skillName">Machine Learning, Deep Learning </span></p>
                    <p><span class="skillName">Tools: </span>Kafka, Docker, Git</p>
                    <p><span class="skillName">Others: </span>Data Structures and Algorithms</p>
                  </div>`;
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
