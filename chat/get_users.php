<?php
  require_once('../server/DB.php');
  $db = DB::getInstance();
  $uid = $_SESSION['uid'];

  $query = "SELECT * FROM users WHERE id != $uid ORDER BY username ASC";
  $result = mysqli_query($db, $query);
  $table = "<table class='table table-hover' id='users-table' style='margin: 40px auto; width:60%; box-shadow: -2px 6px 10px rgb(235, 235, 235); border-bottom: 1px solid #eeeeee'>
              <thead class='table-dark'>
                <th>User</th>
                <th>Status</th>
                <th>Chat</th>
              </thead>";
  while($row = mysqli_fetch_assoc($result)){
    $rid = $row['id'];
    $username = $row['username'];
    $online = $row['online'];
    $last_timestamp = $row['last_timestamp'];

    $dot = "";
    $status = "Offline";

    if($online == 1){
      $dotColor = "#198853";
      $chatColor = "#0E6DFD";
      $status = "Online";
    }
    else{
      $dotColor = "#6C757D";
      $chatColor = "#6C757D";
      $status = "Offline";
    }

    $status = "<span class='receiver-public-statusText'>$status</span>";
    $dot = "<i style='font-size:10px; color:$dotColor; transition: all 3s;' class='fas fa-circle align-middle receiver-public-dot'></i>";

    $table .= "
    <tr>
      <td class='fw-light' style='padding-left: 20px;'>".ucfirst($username)."</td>
      <td>$status &nbsp $dot</td>
      <td>
        <button class='btn btn-sm border-0' data-bs-toggle='modal' data-bs-target='#chatModal' data-bs-senderId='$uid' data-bs-receiverId='$rid' data-bs-username='$username' data-bs-status='$online'><i style='font-size:18px; color:$chatColor;' class='receiver-public-chatIcon fas fa-comments align-middle'></i></button>
      </td>
      </tr>";
  }
  echo $table;
?>