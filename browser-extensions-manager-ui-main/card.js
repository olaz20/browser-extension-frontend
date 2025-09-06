fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load data.json");
    }
    return response.json();
  })
  .then(extensions => {
    const grid = document.querySelector(".grid");

    function renderCards(filter) {
      grid.innerHTML = "";
      const filtered = extensions.filter(ext => {
        if (filter === "all") return true;
        if (filter === "active") return ext.isActive;
        if (filter === "inactive") return !ext.isActive;
      });

      filtered.forEach(ext => {
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
            <button class="remove-btn">Remove</button>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-input" ${ext.isActive ? "checked" : ""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        `;
        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            card.remove();
            const realIndex = extensions.indexOf(ext);
            if (realIndex !== -1){
                extensions.splice(realIndex, 1);
            }});
        grid.appendChild(card);
        const toggle = card.querySelector(".toggle-input");
        toggle.addEventListener("change", () => {
            ext.isActive = toggle.checked; // update in-memory array
            const activeFilter = document.querySelector(".active").classList.contains("selected") ? "active":
            document.querySelector(".inactive").classList.contains("selected") ? "inactive" : "all";
            renderCards(activeFilter); // re-render based on current filter
        })
      });
    }

    // Event listeners for filter buttons
    document.querySelector(".all").addEventListener("click", () => renderCards("all"));
    document.querySelector(".active").addEventListener("click", () => renderCards("active"));
    document.querySelector(".inactive").addEventListener("click", () => renderCards("inactive"));

    // Default: show all on page load
    renderCards("all");
  })
  .catch(error => {
    console.error("Error loading or parsing JSON:", error);
  });











