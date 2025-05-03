<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $prenom = htmlspecialchars($_POST['prenom']);
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "ugo.radiguet@sts-sio-caen.info";
    $subject = "Nouveau message de $prenom $nom";
    $body = "Nom: $prenom $nom\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: merci.html");
    } else {
        header("Location: contact.html?error=1");
    }
} else {
    header("Location: contact.html");
}
?>