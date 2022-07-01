<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://kit.fontawesome.com/4733528720.js" crossorigin="anonymous"></script>

  <title>Secured Chat App</title>
  <link rel="stylesheet" type="text/css" href="resources/css/index.css">
  <link rel="stylesheet" type="text/css" href="resources/css/queries.css">
  <link rel="stylesheet" type="text/css" href="vendors/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="vendors/css/normalize.css">
  <link rel="stylesheet" type="text/css" href="vendors/css/Grid.css">
</head>
<body>
  <h1 class="d-flex justify-content-left">Secured Chat App</h1>
  <br/>
  <h1 style="text-align: center; font-size:64px;">
            Login
        </h1>

    <form action="" method="POST" style="margin: 20px auto;">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required name="username">
        </div>

        <div class="input-group mb-3">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" required>
            <div class="input-group-append">
                <button type="submit" class="btn btn-outline-primary w-100" name="login">Login</button>
            </div>
        </div>
    </form>
    <div id="small" style="text-align: center;">
        <small>
            <a href="register.php" class="text-secondary">Register?</a>
        </small>
    </div>
    <?php require_once 'server/server.php'; ?>
</body>
</html>

<script>
	if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>