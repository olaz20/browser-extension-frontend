
const grid = document.querySelector(".grid");

fetch("data.json").then(response => {
    if(!response.ok){
      throw new Error("Failed to load data.json");
    }
    return response.json(
    ).
    then(extensions => {
        grid.innerHTML = "";
        extensions.forEach(ext => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <div class="card-header">
                  <img src="${ext.logo}" alt="${ext.name} logo">
                  <div class="card-details">
                    <h2>${ext.name}</h2>
                    <p>${ext.description}</p>
                  </div>
               </div>
                <div class="card-footer">
                    <button class="remove-btn"> Remove </button>
                    <label class="toggle-switch">
                    <input type="checkbox" class="toggle-input">
                    <span class="toggle-slider"></span>
                   </label>
                </div>   
            `;
            grid.appendChild(card);
        });
        }).catch(error => {
            console.error("Error parsing JSON:", error);
        })
    });

