(function ($) {
	$(document).ready(function () {

		if($(window).innerWidth() < 550) {
			$('.card').each(function(i) {
				$(this).find('.card-list:not(:first-child)').hide().addClass('hide');

				var moreLists = $(this).find('.more-lists');
				moreLists.on('click', function(e) {
					e.preventDefault();
					if($(this).parent().find('.card-list').hasClass('hide')) {
						$(this).parent().find('.card-list').show().removeClass('hide');
						$(this).addClass('active').text('Скрыть');
					} else {
						$(this).removeClass('active').text('Подробнее');
						$(this).parent().find('.card-list:not(:first-child)').hide().addClass('hide');
					}
				});
			});
		} else {}

		$('.stellarnav').stellarNav({
			breakpoint: 1200,
			menuLabel: ' ',
			position: 'right',
			closeLabel: '<span class="close-text">Меню</span>'
		});

		$('select').niceSelect();

		$('.form-extra-inner').hide();
		$('.form-extra__title').on('click', function() {
			$(this).toggleClass('active');
			$('.form-extra-inner').slideToggle();
		});

		$( "#tabs" ).tabs();

		var summMin = 1;
		var summStartStep = 500000;
		var summStep = 1;
		var summMax = 1000000;

		var daysMin = 1;
		var daysStartStep = 100;
		var daysStep = 1;
		var daysMax = 600;

		$('.summ_min').html(summMin);
		$('.summ_max').html(summMax);

		$('.days_min').html(daysMin);
		$('.days_max').html(daysMax);

		$('.summ-slider').slider({
			range: "max",
			min: summMin,
			max: summMax,
			value: summStartStep,
			create: function (event, ui) {
				var tooltipSumm = '<div class="summ-tooltip"><div class="summ-tooltip-inner">' + summStartStep + '</div></div>';
				$(this).find('.ui-slider-handle').html(tooltipSumm);
				$('.mainpage .form .summ-counter').val(summStartStep);
				
			},
			slide: function (event, ui) {
				var tooltipSumm = '<div class="summ-tooltip"><div class="summ-tooltip-inner">' + ui.value + '</div></div>';
				$(this).find('.ui-slider-handle').html(tooltipSumm);
				$('.mainpage .form .summ-counter').val(ui.value);
			}
		});

		$('.days-slider').slider({
			range: "max",
			min: daysMin,
			value: daysStartStep,
			step: daysStep,
			max: daysMax,
			create: function (event, ui) {
				var tooltipDays = '<div class="days-tooltip"><div class="days-tooltip-inner">' + daysStartStep + '</div></div>';
				$(this).find('.ui-slider-handle').html(tooltipDays);
				$('.mainpage .days-counter').val(daysStartStep);
			},
			slide: function (event, ui) {
				var tooltipDays = '<div class="days-tooltip"><div class="days-tooltip-inner">' + ui.value + '</div></div>';
				$(this).find('.ui-slider-handle').html(tooltipDays);
				$('.mainpage .form .days-counter').val(ui.value);
			}
		});


		function summCounter() {
			var btnMinus = $('.summ_minus');
			var btnPlus = $('.summ_plus');
			var counterField = $('.summ-counter');
			$(counterField).keyup(function(e) {
				$('.summ-slider').slider('option','value', parseInt($('.summ-counter').val()));
				$('.summ-tooltip-inner').html(parseInt($('.summ-counter').val()));

				if(parseInt($(counterField).val()) > summMax) {
					$(counterField).val(summMax);
					$('.summ-tooltip-inner').html(parseInt($('.summ-counter').val()));
				} else if (parseInt($(counterField).val()) < summMin) {
					$(counterField).val(summMin);
					$('.summ-tooltip-inner').html(parseInt($('.summ-counter').val()));
				}
			});
			$(btnMinus).click(function () {
				var $input = $(this).parent().find(counterField);
				var count = parseInt($input.val()) - summStep;
				if(count < summMin) {
					count = summMin;
				} else {
					$input.val(count);
					$('.summ-slider').slider('option','value', parseInt($input.val()));
					$('.summ-tooltip-inner').html(parseInt($input.val()));
				}
				return false;
			});
			$(btnPlus).click(function () {
				var $input = $(this).parent().find(counterField);
				var count = parseInt($input.val()) + summStep;
				if(count > summMax) {
					count = summMax;
				} else {
					$input.val(count);
					$('.summ-slider').slider('option','value', parseInt($input.val()));
					$('.summ-tooltip-inner').html(parseInt($input.val()));
				}
				return false;
			});
		}
		summCounter();

		function daysCounter() {
			var btnMinus = $('.days_minus');
			var btnPlus = $('.days_plus');
			var counterField = $('.days-counter');
			$(counterField).keyup(function(e) {
				$('.days-slider').slider('option','value', parseInt($('.days-counter').val()));
				$('.days-tooltip-inner').html(parseInt($('.days-counter').val()));

				if(parseInt($(counterField).val()) > daysMax) {
					$(counterField).val(daysMax);
					$('.days-tooltip-inner').html(parseInt($('.days-counter').val()));
				} else if (parseInt($(counterField).val()) < daysMin) {
					$(counterField).val(daysMin);
					$('.days-tooltip-inner').html(parseInt($('.days-counter').val()));
				}
			});
			$(btnMinus).click(function () {
				var $input = $(this).parent().find(counterField);
				var count = parseInt($input.val()) - daysStep;
				// count = count < daysMin ? daysMin : count;
				if(count < daysMin) {
					count = daysMin;
				} else {
					$input.val(count);
					$input.change();
					$('.days-slider').slider('option','value', parseInt($input.val()));
					$('.days-tooltip-inner').html(parseInt($input.val()));
				}
				return false;
			});
			$(btnPlus).click(function () {
				var $input = $(this).parent().find(counterField);
				var count = parseInt($input.val()) + daysStep;
				// count = count > daysMax ? daysMax : count;
				if(count > daysMax) {
					count = daysMax;
				} else {
					$input.val(count);
					$input.change();
					$('.days-slider').slider('option','value', parseInt($input.val()));
					$('.days-tooltip-inner').html(parseInt($input.val()));
				}
				return false;
			});
		}
		daysCounter();

		$(document).on('click', '.anchor', function (e) {
			var fixed_offset = 50;
			$('html, body').stop().animate({
				scrollTop: $(this.hash).offset().top - fixed_offset
			}, 500);
			e.preventDefault();
		});

	});
})(jQuery);