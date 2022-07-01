<?php
  require_once('../server/DB.php');
  $db = DB::getInstance();
  session_start();

  $receiverId = $_REQUEST['rid'];

  $whichStatus = $_REQUEST['whichStatus'];
  $uid = $_SESSION['uid'];

  if($whichStatus == "modal"){
    $query = "SELECT online, logout_timestamp FROM users WHERE id=$receiverId";
    $result = mysqli_query($db, $query);
    $row = mysqli_fetch_assoc($result);

    $data = [];
    $isOnline = $row['online'];
    $logOutTimeStamp = time_elapsed_string($row['logout_timestamp']);

    $data[] = $isOnline;
    $data[] = $logOutTimeStamp;

    echo json_encode($data);

  } else if($whichStatus == "home"){
    $query = "SELECT * FROM users WHERE id != $uid ORDER BY username ASC";
    $result = mysqli_query($db, $query);
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
        if($row['online'] == 0) $data[] = "Offline"; else $data[] = "Online";
    }
    echo json_encode($data);
  }

  function time_elapsed_string($datetime, $full = false) {
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = array(
        'y' => 'year',
        'm' => 'month',
        'w' => 'week',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . ' ago' : 'just now';
}
?>