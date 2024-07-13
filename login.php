<?php
// Session start (optional for remembering login state across pages)
session_start();

// Error message (optional)
$errorMessage = "";

// Check if login form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get form data
  $username = $_POST["username"];
  $password = $_POST["password"];

  // Replace with your logic to validate username and password against database
  // (e.g., connect to database, query user table)
  $validLogin = validateLogin($username, $password);

  if ($validLogin) {
    // Login successful
    $_SESSION["username"] = $username; // Set session variable (optional)
    header("Location: profile.php"); // Redirect to profile page (replace with actual page)
    exit;
  } else {
    // Login failed
    $errorMessage = "Invalid username or password.";
  }
}

function validateLogin($username, $password) {
  // Replace with actual logic to validate credentials against database
  // This is a placeholder example, replace with your database connection and queries
  if ($username == "admin" && $password == "password123") {
    return true;
  } else {
    return false;
  }
}
?>

<h2>Login</h2>
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
  <?php if (!empty($errorMessage)) { ?>
    <p class="error-message"><?php echo $errorMessage; ?></p>
  <?php } ?>
  <label for="username">Username:</label>
  <input type="text" name="username" id="username" required>
  <br>
  <label for="password">Password:</label>
  <input type="password" name="password" id="password" required>
  <br>
  <button type="submit">Login</button>
</form>

<p>Don't have an account? <a href="register.php">Register Here</a></p>

