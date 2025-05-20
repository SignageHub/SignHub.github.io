<?php
// This PHP script handles the form submission from your website's contact form.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data from the form
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "), $name);

    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    $phone = trim($_POST["phone"]);

    $service = trim($_POST["service"]);

    $message = trim($_POST["message"]);

    // --- Basic Validation ---
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete all required fields and ensure a valid email address is provided.";
        exit;
    }

    // --- Configure Email Details ---
    // Set the recipient email address.
    // IMPORTANT: This has been updated to your new email address.
    $recipient = "nyolastanley70@gmail.com"; // <--- UPDATED EMAIL HERE!

    // Set the email subject.
    $subject = "New Contact from Signage Hub Website - $name";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    if (!empty($service)) {
        $email_content .= "Interested Service: $service\n";
    }
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    // Ideally, the 'From' domain should match your website's domain for better deliverability.
    // For now, using a generic noreply or the sender's email.
    $email_headers = "From: Signage Hub Website <noreply@signagehub.github.io>\r\n"; // Consider changing this domain if your website is on a different one
    $email_headers .= "Reply-To: $email\r\n"; // Allows you to reply directly to the sender
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // --- Send the Email ---
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank You! Your message has been sent successfully.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message at this time. Please try again later or contact us directly.";
    }

} else {
    http_response_code(403);
    echo "Access denied. This script can only be accessed via a form submission.";
}
?>