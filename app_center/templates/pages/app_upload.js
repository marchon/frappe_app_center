$(document).ready(function() {
	$.ajaxSetup({
		headers: { // 默认添加请求头
			"X-Frappe-CSRF-Token": frappe.csrf_token
		}
	});
	var status = $('.ui.form .ui.message');
	var bar = $('.bar');
	$('form').ajaxForm({
		beforeSend: function() {
			status.empty();
		},
		uploadProgress: function(event, position, total, percentComplete) {
			var percentVal = percentComplete + '%';
			bar.width(percentVal);
			status.text(percentVal);
		},
		success: function() {
			var percentVal = '100%';
			bar.width(percentVal);
			status.text(percentVal);
		},
		complete: function(xhr) {
			status.html('<br>'+xhr.responseText);
		},
		error: function(xhr) {
			status.html(xhr.responseText);
		}
	});
});