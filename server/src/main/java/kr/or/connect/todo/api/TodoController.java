package kr.or.connect.todo.api;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.domain.Todo;
import kr.or.connect.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService service;
	
	@Autowired
	public TodoController(TodoService service){
		this.service = service;
	}
	
	@GetMapping
	Collection<Todo> todoList(){
		return service.findAll();
	}
	
	@GetMapping("/{id}")
	Todo todo(@PathVariable Integer id){
		return service.findById(id);
	}
	
	@PostMapping
	Todo create(@RequestBody Todo todo) {
		return service.create(todo);
	}
	
	@PutMapping("/{id}")
	void update(@PathVariable Integer id, @RequestBody Todo todo) {
		todo.setId(id);
		service.update(todo);
	}

	@DeleteMapping("/{id}")
	void delete(@PathVariable Integer id) {
		service.delete(id);
	}
}
