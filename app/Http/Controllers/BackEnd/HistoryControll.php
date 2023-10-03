<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use DB;
use Session;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class HistoryControll extends Controller{

    public function sendMail($data, $dataMail) {
        Mail::send('email.email',['data'=>$data, 'dataMail'=>$dataMail], function($message) use ($data) {
            $message->from(env('MAIL_USERNAME', 'it.support@widatra.com'), 'Web e-DMS | do-not-reply');
            $message->to($data['Email'], $data['Employee'])->subject($data['Subject']);
        });
    }

    public function sendMailWeb(){

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
            $mail->isMail();
            $mail->SMTPDebug =4;
//            $mail->AuthType = 'LOGIN';
//            $mail->Host       = 'mail.widatra.com';
            $mail->Host = gethostbyname('mail.widatra.com');
            $mail->SMTPAuth   = true;
//            $mail->SMTPAutoTLS = false;
            $mail->Username   = 'it.support@widatra.com';
            $mail->Password   = 'cinaterias';
            $mail->SMTPSecure = 'ssl';
//            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
//            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            //Recipients
            $mail->setFrom('it.support@widatra.com', 'Verification Reminder | do-not-reply');
            $mail->addAddress('richardus.rizki.k@gmail.com', 'richadus');     //Add a recipient


            //Content
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Subject = 'Here is the subject';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b> IS SERVER';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->isSendmail();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo} ".$e->getMessage();
        }

        return 'success';

    }
    public function storeApi($idmodule,$action,$desc,$userEntry){
        DB::table('history')
            ->insert([
                'IdModule'=>$idmodule,
                'Description'=>$desc,
                'Action'=>$action,
                'From'=>2,  // 2: Form Api
                'UserEntry'=>session('adminvue')->Id
            ]);
    }

    public function store($idmodule,$action,$desc){
        DB::table('history')
            ->insert([
                'IdModule'=>$idmodule,
                'Description'=>$desc,
                'Action'=>$action,
                'UserEntry'=>session('adminvue')->Id
            ]);
    }

    public static function storePrintReport($idmodule){
        DB::table('printed_history')
            ->insert([
                'IdModule'=>$idmodule,
                'UserEntry'=>session('adminvue')->Id
            ]);
    }
}
