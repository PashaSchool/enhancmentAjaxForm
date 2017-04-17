var result_div = document.getElementById('result'),
	volume = document.getElementById('volume'),
	btn = document.getElementById('html-submit'),
	orig_btn_val = btn.value;

function displayErrors(errors) {
	var inputs = document.getElementsByTagName('input'),
		i = 0,
		len = inputs.length;
	for(; i < len; i += 1) {
		var input = inputs[i];
		if(errors.indexOf(input.name) >= 0) {
			input.classList.add('error');
		}
	}
};

function disabledBtn() {
	btn.disabled = true;
	btn.value = 'Loading..';
}
function enabledBtn() {
	btn.disabled = false;
	btn.value = orig_btn_val;
}

function showSpinner() {
	var spinner = document.getElementById('spiner');
	spinner.style.display = 'block'
}

function hideSpinner() {
	var spinner = document.getElementById('spiner');
	spinner.style.display = 'none'
}

function clearErrors() {
	var inputs = document.getElementsByTagName('input'),
	i = 0,
	len = inputs.length;
	for(;i<len;i+=1) {
		inputs[i].classList.remove('error')
	}
}

function posResult(value) {
	volume.innerHTML = value;
	result_div.style.display = 'block';
};

function clearResul() {
	volume.innerHTML = "";
	result_div.style.display = 'none';
}

function gatherFormData(form) {
	var inputs = form.getElementsByTagName('input'),
		arr = [],
		i = 0,
		max = inputs.length;

	for(; i < max; i += 1) {
		var inputNameValue = inputs[i].name + '=' + inputs[i].value;
		arr.push(inputNameValue);
	}
	return arr.join('&');
}

function calculateMass() {
	clearResul();
	clearErrors();
	showSpinner();
	disabledBtn();

	var form = document.getElementById('masurement-form'),
		action = form.getAttribute('action'),
		form_data = gatherFormData(form),
		xhr = new XMLHttpRequest;

	xhr.open('POST', action, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.onreadystatechange = function() {
		if(xhr.status == 200 && xhr.readyState == 4) {
			var result = xhr.responseText;
			console.log("RESULT: " + result);
			var json = JSON.parse(result);
			hideSpinner();
			enabledBtn();
			if(json.hasOwnProperty('errors') && json.errors.length > 0) {
				displayErrors(json.errors);
			}else {
				posResult(json.volumes);
			}
		}
	};
	xhr.send(form_data);
}


btn.addEventListener("click", function(event) {
	event.preventDefault();
	calculateMass();
});