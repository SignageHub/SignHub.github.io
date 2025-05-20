document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = targetElement.getBoundingClientRect().top + window.scrollY - (document.querySelector('.navbar').offsetHeight + 20); // Adjust 20px for extra padding
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update current year in the footer
    const currentYearElements = document.querySelectorAll('#current-year, #current-year-sw'); // Select both IDs if they exist
    currentYearElements.forEach(element => {
        if (element) {
            element.textContent = new Date().getFullYear();
        }
    });

    // --- New Code for Prefilling Contact Form ---
    const prefillService = localStorage.getItem('prefillService');
    const prefillMessage = localStorage.getItem('prefillMessage');

    if (prefillService || prefillMessage) {
        const serviceSelect = document.getElementById('service');
        const messageTextarea = document.getElementById('message');

        if (serviceSelect && prefillService) {
            let foundOption = false;
            // Iterate through options to find a match by text content or value
            for (let i = 0; i < serviceSelect.options.length; i++) {
                // Normalize service name for comparison (e.g., "3D Signs" -> "3d-signs")
                const optionValueNormalized = serviceSelect.options[i].value.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                const serviceNameNormalized = prefillService.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

                if (serviceSelect.options[i].textContent.toLowerCase().includes(serviceNameNormalized) || optionValueNormalized === serviceNameNormalized) {
                    serviceSelect.value = serviceSelect.options[i].value;
                    foundOption = true;
                    break;
                }
            }
            // Fallback: If no specific service is found, try to select "Other"
            if (!foundOption) {
                const otherOption = Array.from(serviceSelect.options).find(option => option.value === 'other');
                if (otherOption) {
                    serviceSelect.value = 'other';
                }
            }
        }

        if (messageTextarea && prefillMessage) {
            messageTextarea.value = prefillMessage;
        }

        // Clean up localStorage after prefilling to avoid prefilling on subsequent visits
        localStorage.removeItem('prefillService');
        localStorage.removeItem('prefillMessage');

        // Optional: Smoothly scroll to the contact form section after prefilling
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const offset = contactSection.getBoundingClientRect().top + window.scrollY - (document.querySelector('.navbar').offsetHeight + 20);
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }
});
