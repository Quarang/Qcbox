(function ($) {
	
	$.fn.qcbox = function(){
		
		
		$(this).each(function(){
			
			var obj = $(this);
			
			//Нам нужна коробочка для безделушек
			var box = $('<div/>',{
				class: 'qcbox-box'
			});
			
			//Заберём имя, пригодится
			var name = $(this).attr('name');
			
			//Запилим пару инпутов - один подставной, другой - для значений
			var fakeinput = $('<input/>',{
				type: 'text',
				'data-name': name,
				class: 'qcbox-input'
			});
			var caretwrap = $('<div/>',{
				class: 'qcbox-caretwrap'
			});
			var caret = $('<span/>',{
				class: 'qcbox-caret'
			});
			caretwrap.append(caret);
			
			var valueinput = $('<input/>',{
				type: 'hidden',
				name: name,
				class: 'qcbox-vinput'
			});
			
			//Сохраним значения в дом, чтоб были
			var values = $('<ul/>',{
				id: 'qcbox-vals-'+name,
				class: 'qcbox-vals',
				css: {
					width: fiw,
					top: fih
				}
			});
		
			obj.find('option').each(function(){
				var ttext = $(this).text();
				var tval = $(this).val() ? $(this).val() : ttext;
				
				var value = $('<li/>',{
					'data-val': tval,
					text: ttext,
					on: {
						//не забудем функционал селекта
						mousedown: function(){
							fakeinput.val(ttext);
							valueinput.val(tval);
						}
					}
				});
				
				values.append(value);
			});
			
			//Нарисуем всё это дело
			obj.after(box);
			box.append(fakeinput);
			box.append(caretwrap);
			box.append(valueinput);
			box.append(values);
			
			//Сделаем красивенько
			var fiw = fakeinput.outerWidth();
			var fih = fakeinput.outerHeight()-1;
			values.css({
				width: fiw,
				top: fih
			});
			box.css({
				width: fiw
			});
			
			//Уберём селект, чтобы глаза не мозолил и имя не занимал. Он нам больше не нужен.
			obj.remove();
			
			//Вызовем список значений кареткой/фокусом
			caretwrap.click(function(){
				fakeinput.focus();
			});
			fakeinput.focus(function(){
				values.show();
				var thisval = $(this).val().toLowerCase();
				console.log(thisval);
				$('#qcbox-vals-'+$(this).data('name')+'>li').each(function(){
					var thatval = $(this).text().toLowerCase();
					if(thatval.indexOf(thisval) >= 0){
						$(this).show();
					} else {
						$(this).hide();
					}
				});
			}).blur(function(){
				values.hide();
				$('#qcbox-vals-'+$(this).data('name')+'>li').each(function(){
					$(this).show();
				});
			});
			
			//А ещё нам надо чтобы оно ненужные результаты убирало из списка
			fakeinput.keyup(function(){
				var thisval = $(this).val().toLowerCase();
				$('#qcbox-vals-'+$(this).data('name')+'>li').each(function(){
					var thatval = $(this).text().toLowerCase();
					if(thatval.indexOf(thisval) >= 0){
						$(this).show();
					} else {
						$(this).hide();
					}
				});
			});
			
		});
		
		
	}
	
} (jQuery));