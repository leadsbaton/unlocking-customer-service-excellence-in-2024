import { EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_PUBLIC_KEY } from '../../utils/mail2.js';

window.onload = function () {
  emailjs.init(EMAIL_PUBLIC_KEY);

  const form = document.getElementById("downloadForm");
  const timestampInput = document.getElementById("timestamp");
  const submitBtn = form.querySelector("button[type='submit']");

  const showDialog = (message, isSuccess = true) => {
    const dialog = document.createElement("div");
    dialog.className = `fixed top-10 right-10 bg-${isSuccess ? 'green' : 'red'}-600 text-white px-6 py-3 rounded shadow-lg z-50`;
    dialog.innerText = message;
    document.body.appendChild(dialog);
    setTimeout(() => dialog.remove(), 3000);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const company = document.getElementById("companyName").value.trim();
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const email = document.getElementById("companyEmail").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();

    // Validate inputs
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPhone = /^[0-9]{10,11}$/.test(phone);

    if (!firstName || !lastName || !company || !jobTitle || !email || !phone) {
      showDialog("Please fill in all required fields.", false);
      return;
    }

    if (!isValidEmail) {
      showDialog("Invalid email address.", false);
      return;
    }

    if (!isValidPhone) {
      showDialog("Phone number must be 10 or 11 digits.", false);
      return;
    }

    // Confirm details
    const confirmation = confirm(
      `Please confirm your details:\n
First Name: ${firstName}
Last Name: ${lastName}
Company: ${company}
Job Title: ${jobTitle}
Email: ${email}
Phone: ${phone}

Click OK to proceed.`
    );
    if (!confirmation) return;

    // Set timestamp
    const now = new Date();
    timestampInput.value = now.toLocaleString();

    // Show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white inline mr-2" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>Sending...`;

    // Send email via EmailJS
    emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, form)
      .then(() => {
        showDialog("Message sent successfully!");
        alert('Thank you! Your download will begin shortly.');
        form.reset();

        // Trigger file download
        const link = document.createElement("a");
        link.href = "https://leadsbaton.github.io/transform-cx-2025-report/assets/pdf/Customer_Service_Benchmark_Report_2024.pdf";
        link.download = "Customer_Service_Benchmark_Report_2024.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showDialog("Failed to send message.", false);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
};
