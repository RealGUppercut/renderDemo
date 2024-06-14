const form = document.getElementById("messageForm");

async function fetchAndRenderRamen() {
  const response = await fetch("https://renderdemo-server.onrender.com/ramen");
  const ramenList = await response.json();
  const ramenListDiv = document.getElementById("ramenList");
  ramenListDiv.innerHTML = "";

  ramenList.forEach((ramen) => {
    const ramenDiv = document.createElement("div");
    ramenDiv.innerHTML = `<p>ID: ${ramen.id}, Flavour: ${ramen.flavour}, Price: ${ramen.price}, Spiciness: ${ramen.spiciness} Time To Cook: ${ramen.time_to_cook}</p>`;
    ramenListDiv.appendChild(ramenDiv);
  });
}

fetchAndRenderRamen();

form.addEventListener("submit", submitButton);

async function submitButton(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  try {
    const response = await fetch(
      "https://renderdemo-server.onrender.com/ramen",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("DATA SAVED - ALL IS WELL");
      fetchAndRenderRamen();
    } else {
      console.log("NOOOOOOOOOO DO NOT WANT");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
