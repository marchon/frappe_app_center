function jsonToQueryString(json) {
    return '?' +
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
};

$(document).ready(function() {
	$('.ui.items .item .content .meta .ui.star.rating')
	  .rating('disable')
	;
	$('.ui.items .item .content .extra .upload').click(function () {
		var app = $(this).data("name");
		window.location.href="/app_upload?app="+app;
	});
	$('.ui.items .item .content .extra .modify').click(function () {
		var app = $(this).data("name");
		window.location.href="/app_modify?app="+app;
	});
	$('.ui.items .item .content .extra .comment').click(function() {
		var app = $(this).data("name");
		window.location.href="/app_detail?app="+app+"&tab=comments";
	});
	$('.ui.items .item .content .extra .star').click(function() {
		var app = $(this).data("name");
		window.location.href="/app_detail?app="+app+"&tab=reviews";
	});

	$('.ui.items .item .description .labels .label.category').click(function() {
		var value = $(this).data('value');
		$('#category_filter').dropdown('set selected', value);
	});

	$('.ui.items .item .description .labels .label.protocol').click(function() {
		var value = $(this).data('value');
		$('#protocol_filter').dropdown('set selected', value);
	});

	$('.ui.items .item .description .labels .label.supplier').click(function() {
		var value = $(this).data('value');
		$('#supplier_filter').dropdown('set selected', value);
	});

	$('.ui.app-refresh.button').click(function () {
		var query_data = {};
		var category = $('#category_filter .menu .item.selected').data("value");
		if (category != null) {
			query_data["category"] = category;
		}
		var protocol = $('#protocol_filter .menu .item.selected').data("value");
		if (protocol != null) {
			query_data["protocol"] = protocol;
		}
		var supplier = $('#supplier_filter .menu .item.selected').data("value");
		if (supplier != null) {
			query_data["device_supplier"] = supplier;
		}

		window.location.href="/app_store"+jsonToQueryString(query_data);
	});
	$('.ui.app-clean.button').click(function () {
		//window.location.href="/app_store";
		$('#category_filter .text').text('{{_("Category Filter")}}');
		$('#category_filter .menu .item.selected').removeClass("active selected");
		$('#protocol_filter .text').text('{{_("Protocol Filter")}}');
		$('#protocol_filter .menu .item.selected').removeClass("active selected");
		$('#supplier_filter .text').text('{{_("Supplier Filter")}}');
		$('#supplier_filter .menu .item.selected').removeClass("active selected");
	});
});

