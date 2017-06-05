package kr.or.connect.todo.persistence;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.domain.Todo;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TodoDaoTest {
	@Autowired
	private TodoDao dao;
	
	@Test
	public void shouldCount(){
		int count = dao.countTodos();
		System.out.println(count);
	}
	
	@Test
	public void shouldInsertAndSelect(){
		//given
		Todo todo = new Todo(1, "todo1", -1, new Date());
		
		//when
		Integer id = dao.insert(todo);
		
		//then
		Todo selected = dao.selectById(id);
		System.out.println(selected);
	}
	@Test
	public void shouldSelectAll() {
		List<Todo> allTodos = dao.selectAll();
		assertThat(allTodos, is(notNullValue()));
	}
	
	@Test
	public void shouldDelete() {
		// given
		Todo todo = new Todo(1, "todo1", -1, new Date());
		Integer id = dao.insert(todo);

		// when
		int affected = dao.deleteById(id);

		// Then
		assertThat(affected, is(1));
	}
	
	@Test
	public void shouldUpdate() {
		// Given
		Todo todo = new Todo(1, "todo1", -1, new Date());
		Integer id = dao.insert(todo);

		// When
		todo.setId(id);
		todo.setTodo("todo2");
		int affected = dao.update(todo);

		// Then
		assertThat(affected, is(1));
		Todo updated = dao.selectById(id);
		assertThat(updated.getTodo(), is("todo2"));
	}

}
