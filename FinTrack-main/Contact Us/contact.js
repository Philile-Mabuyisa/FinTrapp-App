document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission
  
  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const fileInput = document.getElementById("file");

  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validate email using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      emailInput.focus();
      return;
  }

  // Read file as array buffer if a file is selected
  let fileArrayBuffer = null;
  if (fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(event) {
          fileArrayBuffer = event.target.result;
          sendFormData(name, surname, email, message, fileArrayBuffer);
      };
      reader.readAsArrayBuffer(fileInput.files[0]);
  } else {
      sendFormData(name, surname, email, message, fileArrayBuffer);
  }
});

function sendFormData(name, surname, email, message, fileArrayBuffer) {
  alert("Thank you for contacting us, we will get back to you soon!");

  // Reset form fields
  document.getElementById("name").value = '';
  document.getElementById("surname").value = '';
  document.getElementById("email").value = '';
  document.getElementById("message").value = '';
  document.getElementById("file").value = '';

  // Save form data to a text file
  const formData = `Name: ${name}\nSurname: ${surname}\nEmail: ${email}\nMessage: ${message}\nFile Array Buffer: ${fileArrayBuffer}`;
  const blob = new Blob([formData], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "formData.txt";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}