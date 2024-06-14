const form = document.getElementById("messageForm");

form.addEventListener("submit", submitButton);

function submitButton(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  fetch("http://localhost:8080/ramen", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log(event);
}
