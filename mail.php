<?
require_once 'PHPMailer/PHPMailerAutoload.php';

$admin_email = array();
foreach ( $_POST["admin_email"] as $key => $value ) {
  array_push($admin_email, $value);
}

// $admin_email = 'goodnduck@gmail.com';
$admin_email[] = 'goodnduck@gmail.com';

$form_subject = trim($_POST["form_subject"]);

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';


$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "admin_email" && $key != "form_subject" ) {
    if (is_array($value)) {
      $val_text = '';
      foreach ($value as $val) {
        if ($val && $val != '') {
          $val_text .= ($val_text==''?'':', ').$val;
        }
      }
      $value = $val_text;
    }
    $message .= "
    " . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
    <td style='padding: 10px; width: auto;'><b>$key</b></td>
    <td style='padding: 10px; width: 100%;'>$value</td>
    </tr>
    ";
  }
}
$message = "<table style='width: 50%;'>$message</table>";

// от кого
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Blanchard');

// кому
foreach ( $admin_email as $key => $value ) {
  $mail->addAddress($value);
}

// тема письма
$mail->Subject = $form_subject;

// тело письма
$body = $message;
// $mail->isHTML(true);
$mail->msgHTML($body);

$mail->send();

?>
