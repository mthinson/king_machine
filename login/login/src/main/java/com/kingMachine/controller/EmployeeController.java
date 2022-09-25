package com.kingMachine.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kingMachine.entity.Employees;
import com.kingMachine.repository.ClockInRepository;
import com.kingMachine.repository.EmployeeRepository;

@CrossOrigin
@RestController
public class EmployeeController {

	@Autowired
	EmployeeRepository employeeRepository;
	@Autowired
	ClockInRepository clockInRepository;
	
	//login info finds user by id and password in a query
	@RequestMapping(value="/login",
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.POST
			)
	public ResponseEntity<Employees>login(@RequestBody Employees employees){
		Employees employeeLogin = employeeRepository.login(employees.getId(), employees.getPassword());
		if(employeeLogin != null) {
			return new ResponseEntity<>(employeeLogin, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(value="/findUser",
			produces=MediaType.APPLICATION_JSON_VALUE,
			method=RequestMethod.GET
			)
	
	@ResponseBody
	private ResponseEntity<Optional<Employees>>findUser(String id){
		Optional<Employees> user = employeeRepository.findById(id);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
//	@RequestMapping(value="/clockIn",
//			consumes=MediaType.APPLICATION_JSON_VALUE,
//			produces=MediaType.APPLICATION_JSON_VALUE,
//			method=RequestMethod.POST
//			)
//	public void clockIn(@RequestBody Employees employee) {
//			clockInRepository.save(employee);
//		
//	}
	
}
