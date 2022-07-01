<?php require('../server/chat_server.php'); ?>
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://kit.fontawesome.com/4733528720.js" crossorigin="anonymous"></script>

  <title>Secured Chat App</title>
  <link rel="stylesheet" type="text/css" href="../resources/css/chat.css">
  <link rel="stylesheet" type="text/css" href="../vendors/css/normalize.css">
  <link rel="stylesheet" type="text/css" href="../vendors/css/Grid.css">
  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  <!-- JavaScript Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src='https://cdn.jsdelivr.net/npm/big.js@6.0.0/big.min.js'></script>
</head>

<body>
  <h1 class="justify-content-left d-inline">Secured Chat App</h1>
  <?php if(isset($_SESSION['uid']) && isset($_SESSION['username'])): ?>
    <div style="float:right;">
      <form href="" method="POST" style="width: 0%; float: right;">
        <button type="submit" style='text-align:left; margin-left:40px; margin-top:3px;' class="btn btn-outline-danger btn-sm" id="logoutBtn" onmouseover="hover('logout');" onmouseout="out('logout');" name="logout">
            <p class="card-text" id="logoutP"> <strong>Logout</strong><i class="fas fa-sign-out-alt animate__animated animate__fadeInLeft" id="logoutIcon" style="display: none; margin-left:7px;"></i></p>
        </button>
      </form>
    </div>
  <br/>

  <h1 style="text-align: center; font-size:48px;" class="animate__animated animate__fadeIn"><?php echo "Welcome, <strong>".$_SESSION['username']; ?></strong>&nbsp<i style="font-size:16px;" class='fas fa-circle align-middle text-success'></i></h1>
  <?php require_once('get_users.php'); ?>

  <div class="modal fade fast" id="chatModal" tabindex="-1" aria-labelledby="chatModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-light" id="chatModalLabel">Chat with </h5>
            <div class="animate__animated animate__fadeInDown animate__faster" id="last-seen" style="font-style:italic; font-size:10px; font-weight:300; color:#666; float:right; margin-top:5px; margin-left:5px;">Status</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="mb-3">
              <!-- <label for="chat-box" class="col-form-label">Chat:</label> -->
              <!-- <input type="text" class="form-control disabled" id="chat-box"> -->
              <div id="chat-box" style="height:500px; background-color:#efefef; border:1px solid #ddd; overflow: auto; padding:16px; margin: 25px 15px 0px 15px; border-radius:8px;">
                <!-- <div style="width:100px; height:100px; background-color:red;">SCROLL TEST</div> -->
              </div>
        </div>
        <div class="modal-body">
          <form href="" method="POST">
            <div class="mb-3">
              <!-- <label for="message-text" class="col-form-label">Message:</label> -->
              <textarea class="form-control" id="message-text" oninput="this.style.height = '';this.style.height = this.scrollHeight + 'px'" style="height:60px;" required focus placeholder="Type a message..." onkeyup="messageTextChanged()"></textarea>

              <select id="enc-method" style="margin-top:15px; padding:8px; cursor:pointer; border-radius:8px; background-color:#f3f3f3; width: 100%;">
                <option disabled>Encryption Method - </option>  
                <option value="des">DES</option>
                <option value="aes">AES</option>
                <option selected value="rsa">RSA</option>
                <option value="gamal">ElGamal</option>
              </select>            
            </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <label class="btn btn-outline-dark" for="upload-file" style="cursor: pointer;"><i style="font-size:16px;" class='fas fa-file-export'></i></label>
            <input type="file" id="upload-file" name="upload-file" style="opacity: 0; position: absolute; z-index: -1;">
            <a id="link" download style="display: none"></a>
          <button type="button" class="btn btn-outline-success" id="send-button" disabled onclick="sendClicked();">Send&nbsp&nbsp<i style="font-size:16px;" class='fas fa-paper-plane'></i></button>
        </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    
  <?php else: ?>
    <div class='text-danger' style='font-size: 16px; font-weight: bold; margin-top:20px; text-align:center;'>Not Logged In, <a href="../" class="text-primary">Login?</a></div>
  <?php endif; ?>
        
</body>
</html>
<?php include_once "../modules/methods.php" ?>
<script src="../modules/methods.js"></script>
<script src="../resources/js/vars.js"></script>
<script src="../resources/js/utilities.js"></script>
<script src="../resources/js/chatBubbles.js"></script>
<script src="../resources/js/home.js"></script>
<script src="../resources/js/ajax.js"></script>
<script src="../resources/js/chat.js"></script>