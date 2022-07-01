<?php
    require_once('../server/DB.php');
    $db = DB::getInstance();

    $senderId = $_POST['sid'];
    $receiverId = $_POST['rid'];
    $senderKey = $_POST['skey'];
    $receiverKey = $_POST['rkey'];

    $query = "SELECT * FROM session 
              WHERE (sender_id=$senderId OR sender_id=$receiverId) AND (receiver_id=$receiverId OR receiver_id=$senderId)";
    $result = mysqli_query($db, $query);
    $numOfRows = mysqli_num_rows($result);

    if($numOfRows > 0){
      $query = "UPDATE session
                SET sender_key='$senderKey', receiver_key='$receiverKey'
                WHERE (sender_id=$senderId OR sender_id=$receiverId) AND (receiver_id=$receiverId OR receiver_id=$senderId)";
      if($db->query($query) !== true){
        echo "Keys are not updated due to an error".mysqli_error($db);;
      }
    }
    else{
      $query = "INSERT INTO session (sender_id, receiver_id, sender_key, receiver_key)
      VALUES ('$senderId', '$receiverId', '$senderKey', '$receiverKey')";
      if($db->query($query) !== true){
        echo "Keys are not stored due to an error".mysqli_error($db);;
      }
    }
?>