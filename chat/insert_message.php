<?php
  require_once('../server/DB.php');
  require_once('../modules/methods.php');
  $db = DB::getInstance();

  $senderId = $_POST['sid'];
  $receiverId = $_POST['rid'];
  $message = $_POST['msg'];
  $encMethodId = $_POST['eid'];
  $isFile = $_POST['isFile'];
  $fileName = $_POST['fileName'];

  $keyAes = "";
  $cipherAes = "";
  $senderKeyAes = "";
  $receiverKeyAes = "";

  $keyDes = "";
  $cipherDes = "";
  $senderKeyDes = "";
  $receiverKeyDes = "";

  $c1Gamal = "";
  $xaGamal = "";
  $qGamal = "";
  $esGamal = "";

  $p = 0;
  $q = 0;
  $n = 0;
  $z = 0;
  $e = 0;
  $d = 0;
  $c = "";
  $everySeparate = "";

  // echo $message;

  if($encMethodId == 0){
    $query = "SELECT * FROM session 
              WHERE (sender_id=$senderId OR sender_id=$receiverId) AND (receiver_id=$receiverId OR receiver_id=$senderId)";
    $result = mysqli_query($db, $query);
    $numOfRows = mysqli_num_rows($result);

    if($numOfRows > 0){
      $row = mysqli_fetch_assoc($result);
      $senderKeyDes = $row['sender_key'];
      $receiverKeyDes = $row['receiver_key'];

      $des = new DES();
      $messageDes = $message;

      $cipher = $des->DES_ENCRYPT($messageDes, $senderKeyDes);
      $cipherDesSplit = str_split($cipher, 32);
      $cipherDes= base_convert($cipherDesSplit[0], 2, 16) . base_convert($cipherDesSplit[1], 2, 16);

      $eMessage = $cipherDes;
    }
  }
  else if($encMethodId == 1){
    $query = "SELECT * FROM session 
              WHERE (sender_id=$senderId OR sender_id=$receiverId) AND (receiver_id=$receiverId OR receiver_id=$senderId)";
    $result = mysqli_query($db, $query);
    $numOfRows = mysqli_num_rows($result);

    if($numOfRows > 0){
      $row = mysqli_fetch_assoc($result);
      $senderKeyAes = $row['sender_key'];
      $receiverKeyAes = $row['receiver_key'];

      $aes = new AES();
      $messageAes = $message;

      $messageAes = str_split($messageAes,16);
      for($i=0; $i<count($messageAes); $i++)
      {
          $messageAes[$i] = str_pad($messageAes[$i],16,'#',STR_PAD_LEFT);
      }

      for($i=0 ; $i<count($messageAes) ; $i++)
      {
          $cipher = $aes->AES_ENCTYPT($messageAes[$i], $senderKeyAes);
          // $cipher = hex2bin($cipher);  MySQL can not store it
          $cipherAes .= $cipher;
      }

      $eMessage = $cipherAes;
    }
  }
  else if($encMethodId == 2){
    $rsa = new RSA();
    $pRsa = $rsa->findRandomPrime(-1);
    $qRsa = $rsa->findRandomPrime($pRsa);
    $nRsa = $rsa->compute_n($pRsa, $qRsa);
    $zRsa = $rsa->eular_z($pRsa, $qRsa);
    $eRsa = $rsa->find_e($zRsa);
    $dRsa = $rsa->find_d($eRsa, $zRsa);
    list($cRsa, $everySeparateRsa) = $rsa->encrypt($message, $eRsa, $nRsa);
    $eMessage = $cRsa;
  }
  else if($encMethodId == 3){
    $c1Gamal = $_POST['c1Gamal'];
    $xaGamal = $_POST['xaGamal'];
    $qGamal = $_POST['qGamal'];
    $everySeparateGamal = $_POST['esGamal'];
    $eMessage = $message;
  }

  $query = "SELECT token from login_details WHERE uid=$senderId";
  $result = mysqli_query($db, $query);
  $row = mysqli_fetch_assoc($result);
  $senderToken = $row['token'];

  $query = "SELECT token from login_details WHERE uid=$receiverId";
  $result = mysqli_query($db, $query);
  $row = mysqli_fetch_assoc($result);
  $receiverToken = $row['token'];

  $query = "INSERT INTO chat (sender_id, receiver_id, message, is_file, file_name, enc_method, s_token, r_token) VALUES($senderId, $receiverId, '$eMessage', $isFile, '$fileName', $encMethodId, '$senderToken', '$receiverToken')";
  if($db->query($query) !== true){
    echo "Messsage Has not sent due to an error -1. ".mysqli_error($db);
  }
  else{
    $lastChatId = $db->insert_id;
    if($encMethodId == 0){
      $query = "INSERT INTO des (message_id, cipher, sender_key, receiver_key) VALUES ($lastChatId, '$cipherDes', '$senderKeyDes', '$receiverKeyDes')";
      if($db->query($query) !== true){
        echo "Messsage Has not sent due to an error 1. ".mysqli_error($db);
      }
    }
    else if($encMethodId == 1){
      $query = "INSERT INTO aes (message_id, cipher, sender_key, receiver_key) VALUES ($lastChatId, '$cipherAes', '$senderKeyAes', '$receiverKeyAes')";
      if($db->query($query) !== true){
        echo "Messsage Has not sent due to an error 1. ".mysqli_error($db);
      }
    }
    else if($encMethodId == 2){
      $query = "INSERT INTO rsa (message_id, d, n, every_separate) VALUES ($lastChatId, '$dRsa', '$nRsa', '$everySeparateRsa')";
      if($db->query($query) !== true){
        echo "Messsage Has not sent due to an error 2. ".mysqli_error($db);
      }
    }
    else if ($encMethodId == 3){
      $query = "INSERT INTO gamal (message_id, c1, xa, q, every_separate) VALUES ($lastChatId, '$c1Gamal', '$xaGamal', '$qGamal', '$everySeparateGamal')";
      if($db->query($query) !== true){
        echo "Messsage Has not sent due to an error 3. ".mysqli_error($db);
      }
    }
  }
?>