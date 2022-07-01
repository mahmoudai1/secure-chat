<?php
  require_once('DB.php');
  $db = DB::getInstance();
  session_start();

  if(isset($_POST['logout'])) 
  {
      $uid = $_SESSION['uid'];
      $query = "UPDATE users SET online=0, logout_timestamp=CURRENT_TIMESTAMP() WHERE id=$uid";

      session_unset();
      session_destroy();

      if($db->query($query) === true){
        header("refresh:0;url=../");
      }
  } 

  function generateRandomToken($db)
  {
      for(;;)  // to make sure that if a key is duplicated, generate a new one automatically
      {
          $length = 16;
          $word = array_merge(range('a', 'z'), range(0, 9), range('A', 'Z'));
          shuffle($word);
          $token = substr(implode($word), 0, $length);

          $query = "SELECT * FROM login_details WHERE token='$token'";
          $queryResult = mysqli_query($db, $query);
          if(mysqli_num_rows($queryResult) == 0)
              break;

      }
      return $token;
  }
?>