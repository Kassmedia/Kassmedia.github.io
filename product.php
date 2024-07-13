<?php
// Connect to database (replace with your credentials)
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "oja_agbe_harvestify";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get product ID from URL (replace with actual logic)
$productId = $_GET["id"];

// Query product details based on ID
$sql = "SELECT * FROM products WHERE id = $productId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $product = $result->fetch_assoc();
} else {
  echo "<h2>Product Not Found</h2>";
  exit;
}

$conn->close();
?>

<h2><?php echo $product["name"]; ?></h2>
<img src="<?php echo $product["imageUrl"]; ?>" alt="<?php echo $product["name"]; ?>" class="product-image">
<p class="product-description"><?php echo $product["description"]; ?></p>
<p class="product-price">&#8358;<?php echo $product["price"]; ?></p>

<h3>Contact Seller</h3>
<form action="contact-seller.php" method="post">
  <input type="hidden" name="productId" value="<?php echo $productId; ?>">
  <label for="name">Your Name:</label>
  <input type="text" name="name" id="name" required>
  <br>
  <label for="email">Your Email:</label>
  <input type="email" name="email" id="email" required>
  <br>
  <label for="message">Message:</label>
  <textarea name="message" id="message" rows="5"></textarea>
  <br>
  <button type="submit">Send Inquiry</button>
</form>

<h3>Similar Products</h3>
<?php
// Logic to retrieve similar products based on category or other criteria
$similarProducts = array(
  // ... product details for similar items
);

foreach ($similarProducts as $similarProduct) {
  ?>
  <div class="similar-product">
    <a href="product.php?id=<?php echo $similarProduct["id"]; ?>">
      <img src="<?php echo $similarProduct["imageUrl"]; ?>" alt="<?php echo $similarProduct["name"]; ?>">
      <p><?php echo $similarProduct["name"]; ?></p>
    </a>
  </div>
  <?php
}
?>

