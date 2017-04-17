<?php
	sleep(1);
	function is_ajax_request() {
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
			&& $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
	};

	$length = isset($_POST['length']) ? (int) $_POST['length'] : '';
	$width = isset($_POST['width']) ? (int) $_POST['width'] : '';
	$height = isset($_POST['height']) ? (int) $_POST['height'] : '';

	$errors = [];
	if($length == '') { $errors[] = 'length'; };
	if($width == '')  { $errors[] = 'width'; };
	if($height == '') { $errors[] = 'height'; };

	if(!empty($errors)) {
		if(is_ajax_request()) {
			$result_array = array('errors' => $errors);
			echo json_encode($result_array);
		} else {
			echo "<p>The errors is: " . implode(', ', $errors) . "</p>";
			echo "<a href=\"index.php\">Back</a>";
		}
		exit;
	}

	$volume = $length * $width * $height;

	if(is_ajax_request()) {
		echo json_encode(array('volumes' => $volume));
	}else {
		echo "<p>The result is: ". $volume . "</p>";
		echo "<a href=\"index.php\">Back</a>";
	}
?>