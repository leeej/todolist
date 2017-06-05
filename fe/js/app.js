(function (window) {
	'use strict';
	doSelect();
	
	var todo = { "todo" : "", "completed" : 0, "date" : new Date() };
	
	$('.new-todo').keyup(function(e){
		if(e.keyCode == 13 && $(this).val() != ""){
			var todo = {
				'todo' : $(this).val(),
				'completed' : '0',
				'date' : new Date()
			};
			doInsert(todo);
		}
	});
	
	$('.todo-list').on('click', 'input[type=checkbox]', function() {
		var id = $(this).parent().parent().attr('id');
		doUpdate(id);
	});
	
	$('.todo-list').on('click', '.destroy', function() {
		var id = $(this).parent().parent().attr('id');
		doDelete(id);
	});
	
	function doSelect(){
		$.ajax({
			url:"/api/todos",
			dataType: "json",
			contentType: "application/json; charset=UTF-8", 
			method:"GET",
			success:function(responseData){
				$('.todo-list').empty();
				var jsonObjs = responseData;
				var todo_count = makeTodoList(jsonObjs);
				if(responseData.length == 0){
					$('.main').hide();
					$('.footer').hide();
				}else{
					$('.main').show();
					$('.footer').show();
				}
				
				$('.todo-count').children().html(todo_count);
				filter(1);
				
				if($('.completed').length == 0)
					$('.clear-completed').hide();
				else
					$('.clear-completed').show();
			 }
			});
		return false;
	}
	
	function doInsert(todo){
		$.ajax({
			url:"/api/todos",
			data:JSON.stringify(todo),
			dataType: "json",
			contentType: "application/json; charset=UTF-8", 
			method:"POST",
			success:function(responseData){
				$('.new-todo').val('');
				doSelect();
			 }
			});
		return false;
	}
	
	function doUpdate(id){
		$.ajax({
			url:"/api/todos/"+id,
			data:JSON.stringify(todo),
			contentType: "application/json; charset=UTF-8", 
			method:"PUT",
			success:function(responseData){
				doSelect();
			 }
			});
		return false;
	}

	function doDelete(id){
		$.ajax({
			url:"/api/todos/"+id,
			data:JSON.stringify(todo),
			contentType: "application/json; charset=UTF-8", 
			method:"DELETE",
			success:function(responseData){
				doSelect();
			 }
			});
		return false;
	}

	$('.filters li:nth-child(1)').click(function(){
		filter(1);
		return false;
	});
	
	$('.filters li:nth-child(2)').click(function(){
		filter(2);
		return false;
	});
	
	$('.filters li:nth-child(3)').click(function(){
		filter(3);
		return false;
	});
	
	function filter(completeFlag){
		$('.filters li:nth-child(1)').children().removeAttr('class');
		$('.filters li:nth-child(2)').children().removeAttr('class');
		$('.filters li:nth-child(3)').children().removeAttr('class');
		if(completeFlag == 1){
			$('.filters li:nth-child(1)').children().attr('class', 'selected');
			$('.todo-list > li').show();
		}
		else if(completeFlag == 2){
			$('.filters li:nth-child(2)').children().attr('class', 'selected');
			$('.completed').hide();
			$('.todo-list > li').not('.completed').show();
		}
		else if(completeFlag == 3){
			$('.filters li:nth-child(3)').children().attr('class', 'selected');
			$('.completed').show();
			$('.todo-list > li').not('.completed').hide();
		}
	}
	
	$('.clear-completed').click(function(){
		var completeds = $('.completed');
		for(var i = 0; i<completeds.length; i++){
			var id = $(completeds[i]).attr('id');
			doDelete(id);
		}
		return false;
	});
	
	function makeTodoList(jsonObjs) {
		var notCompleted = 0;
		for(var i = 0; i< jsonObjs.length; i++){
			if(jsonObjs[i].completed !=0)
				var li = $('<li class="completed">').attr('id', jsonObjs[i].id);
			else{
				var li = $('<li>').attr('id', jsonObjs[i].id);
				notCompleted +=1;
			}
			var div = $('<div class="view">');
			if(jsonObjs[i].completed !=0)
				var input = $('<input class="toggle" type="checkbox" checked>');
			else
				var input = $('<input class="toggle" type="checkbox">');		
			var label = $('<label>').append(jsonObjs[i].todo);
			var button = $('<button class="destroy">');
			var input2 = $('<input class="edit" value="Rule the web">');
			
			div.append(input);
			div.append(label);
			div.append(button);
			li.append(div);
			li.append(input2);
			$('.todo-list').append(li);
		}
		return notCompleted;
	}
	
})(window);
