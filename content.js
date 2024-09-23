var title = document.querySelector("#summary-val").textContent;
var description = document.querySelector("#description-val").textContent;

(async () => {
    await fetch('https://hackathonapi20240922091054.azurewebsites.net/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title, description: description}),
    })
    .then(response => response.json())
    .then(data => {
        if(!data){
          return;
        }
        if(!data.document){
            return;
        }

        // containers
        var badge = document.createElement("div");
        badge.setAttribute("id", "hackathon-badge");
        badge.classList.add("aui-inline-dialog");
        badge.style.width = "500px";
        badge.style.display = "block";
        var contents = document.createElement("div");
        contents.classList.add("contents");
        contents.classList.add("aui-inline-dialog-contents");
        contents.style.padding = "10px";

        // text
        var header = document.createElement("p");
        header.style.color = "red";
        header.style.fontWeight = "bold";
        header.textContent = "Possible solution found in Guardians inquiry documentation:";
        var problem = document.createElement("p");
        problem.innerHTML = "<strong>Problem</strong>: " + data.document.problem;
        var investigation = document.createElement("p");
        investigation.innerHTML = "<strong>Investigation</strong>: " + data.document.investigation;
        var recommendation = document.createElement("p");
        recommendation.innerHTML = "<strong>Recommendation</strong>: " + data.document.recommendation;
        var related = document.createElement("p");
        related.innerHTML = "Related ticket: <a target='_blank' href='https://jira.beeline.com/browse/" + data.document.related + "'>"+ data.document.related + "</a>"
        
        // close
        var close = document.createElement("a");
        close.textContent = "Close";
        close.style.float = "right";
        close.addEventListener("click", function(){ document.querySelector("#hackathon-badge").style.display = "none"; });

        // append elements
        contents.appendChild(header);
        contents.appendChild(problem);
        contents.appendChild(investigation);
        contents.appendChild(recommendation);
        contents.appendChild(related);
        contents.appendChild(close);
        badge.appendChild(contents);
        document.querySelector('#summary-val').insertAdjacentElement('afterend', badge);
    });
  })();

