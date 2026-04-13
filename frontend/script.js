fetch("http://localhost:3000/projects")
.then(res => res.json())
.then(data => {
    const container = document.getElementById("projects");

    data.forEach(project => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;

        container.appendChild(div);
    });
});