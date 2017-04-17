<?php 
	session_start();
	if( !isset($_SESSION['favorites'])) {
		$_SESSION['favorites'] = [];
	}

	function is_favorite($id) {
		return in_array($id, $_SESSION['favorites']);
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
		<div id="masurements">
			<p>eneter total point </p>
			<form action="process.php" id="masurement-form" method="POST">
				<input type="text" name="length">
				<br>
				<input type="text" name="width">
				<br>
				<input type="text" name="height">
				<br>
				<input type="submit" value="Submit" id="html-submit">
				<!-- <input type="button" value="Ajax Submit" id="ajax-submit"> -->
			</form>
		</div>
		<div id="spiner"><img src="spinner.gif" alt="spinner" class="spinner_img"></div>
		<div id="result">
			<p>Result is: <span id="volume"></span></p>
		</div>
	<script src="script.js"></script>
</body>
</html>