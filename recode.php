<?php
// Get the 'code' parameter from the URL
$code = isset($_GET['code']) ? $_GET['code'] : null;

// Use the code as the response code
http_response_code($code);

// Output a message
echo "Response code $code";
?>
