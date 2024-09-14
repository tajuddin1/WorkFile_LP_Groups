<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Include Composer's autoloader

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formId = isset($_POST['formId']) ? $_POST['formId'] : '';

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = ''; // SMTP username
    $mail->Password = 'xxxx xxxx xxxx xxxx'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587; // SMTP port

    try {
        // Set email metadata
        $mail->setFrom('contact@lpgroups.com', 'LP Groups');
        $mail->addAddress('itstaj7272@gmail.com'); // Recipient email

        // Get form fields based on form ID
        $name = isset($_POST['name_' . $formId]) ? $_POST['name_' . $formId] : '';
        $email = isset($_POST['email_' . $formId]) ? $_POST['email_' . $formId] : '';
        $company = isset($_POST['company_' . $formId]) ? $_POST['company_' . $formId] : 'N/A';
        $website = isset($_POST['website_' . $formId]) ? $_POST['website_' . $formId] : 'N/A';
        $position = isset($_POST['position_' . $formId]) ? $_POST['position_' . $formId] : 'N/A';
        $goals = isset($_POST['goals_' . $formId]) ? $_POST['goals_' . $formId] : '';

        // Email subject and body
        $mail->Subject = "New Contact Form Submission";
        $mailContent = "Name: $name<br>Email: $email<br>Company: $company<br>Website: $website<br>Position: $position<br>Goals: $goals";
        $mail->isHTML(true);
        $mail->Body = $mailContent;

        // Send the email
        if ($mail->send()) {
            echo 'success'; // Return success message
        } else {
            echo 'error'; // Return error message
        }
    } catch (Exception $e) {
        echo 'error'; // Catch any PHPMailer errors
    }
}
?>
