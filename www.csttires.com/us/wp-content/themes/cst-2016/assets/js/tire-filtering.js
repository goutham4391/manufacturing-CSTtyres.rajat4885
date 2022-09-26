(function($) {

	/**
	 * This object keeps track of the "AND" conditions for filters
	 */
	function TireFilter() {
		this.tires = {};
		this.filters_set = false;

		this.refresh = function() {
			this.tires = {};
			this.filters_set = false;
		}

		this.add_tires = function(obj) {
			if (this.filters_set) {
				this.remove_tires(obj);
				return;
			}

			if (typeof(obj) == 'string' && obj != '') {
				this.tires[obj] = true;
				return;
			}
			for (var i in obj) {
				this.add_tires(obj[i]);
			}

			for (var prop in this.tires) {
				if (this.tires.hasOwnProperty(prop)) {
					this.filters_set = true;
					return;
				}
			}
		}

		this.remove_tires = function(obj) {
			var new_tires = {};

			if (typeof(obj) == 'string' && obj != '') {
				if (this.tires[obj]) new_tires[obj] = true;
			} else {
				for (var i in obj) {
					if (this.tires[obj[i]]) {
						new_tires[obj[i]] = true;
					}
				}
			}

			this.tires = new_tires;
		}

		this.get_tires = function() {
			var ret = [];
			for (var i in this.tires) {
				ret[ret.length] = i;
			}
			return ret;
		}
	}

	$(function() {
		var $filter_container = $('.js-filter-container'),
			$tire_container = $('.js-tire-container'),
			selected_tires = new TireFilter;

		//click handler for type buttons - to refresh filters and tires
		$('.js-filter-subtype').on('click', function(e) {
			$('.js-filter-subtype').removeClass('active');
			e.preventDefault();
			var $self = $(this);

			$filter_container.slideUp();
			$tire_container.html('<center><img src="' + TireFilteringData.loadinggif + '" style="width:50px;"></center>');
			$self.addClass('active');
			$.get(TireFilteringData.ajaxurl, {
				action: 'cst/refresh_subtype',
				vehicle: $self.data('vehicle'),
				type: $self.data('type')
			}, function(response) {
				response = $.parseJSON(response);
				$filter_container.html(response.filters).slideDown('400', function() {
					if ($(window).width() <= 768) {
						$('html, body').animate({
							scrollTop: $(".js-tire-container").offset().top - 100
						}, 1000);
					}
				});
				$tire_container.html(response.tires);
				//trackFilterChange($self.data(), 'cst_refresh_subtype');
				refreshTireSelectorVars();
			});
		});

		//handle filter clicks
		$('.js-filter-container').on('click', '.js-filter-filter', function(e) {

			if (this.checked) {
				var models = $(this).data('models') || '';
				models = models.split(',');
				selected_tires.add_tires(models);
				$(this).parents('.js-filter-item').addClass('active');
				$(this).parents('fieldset').addClass('filtered');
			} else {
				$(this).parents('fieldset').removeClass('filtered');
				$(this).parents('.js-filter-item').removeClass('active');
				selected_tires.refresh();
				$filters.filter(':checked').each(function() {
					var models = $(this).data('models') || '';
					models = models.split(',');
					selected_tires.add_tires(models);
				});
			}
			refresh_active_tires();
			refresh_active_filters();
		});

		/**
		 * reset tire selector variables so we don't get them everytime something changes
		 */
		function refreshTireSelectorVars() {
			$tires = $('.js-filter-tire');
			$filters = $('.js-filter-filter');
			$filter_items = $('.js-filter-item');
		}

		/**
		 * show/hide tires based on selected filters
		 */
		function refresh_active_tires() {
			var $selected_tires = selected_tires.get_tires();

			if ($selected_tires.length == 0) {
				$tires.show();
			} else {
				var tire_class_string = '.' + $selected_tires.join(',.');
				$tires.not(tire_class_string).hide();
				$tires.filter(tire_class_string).show();
			}
		}

		/**
		 * show/hide filters based on selected filters
		 */
		function refresh_active_filters() {
			var $selected_tires = selected_tires.get_tires();
			if ($selected_tires.length == 0) {
				$filter_items.show();
			} else {
				var tire_class_string = '.' + $selected_tires.join(',.');
				$filter_items.not(tire_class_string).hide();
				$filter_items.filter(tire_class_string).show();
				$filters.filter('.filtered').find('.js-filter-item:not(.active)').hide();
			}
		}

		/**
		 * Send trackng data to GTM on top level filter change
		 */
		function trackFilterChange(obj = null, event_name = "cst_refresh_subtype") {
			if (obj === null) {
				return;
			}
			obj.event = event_name;
			dataLayer.push(obj);
		}

		refreshTireSelectorVars();
	});
})(jQuery);