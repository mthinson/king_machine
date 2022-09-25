package com.kingMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.kingMachine.entity.Employees;

@Repository
public interface EmployeeRepository extends JpaRepository<Employees, String>{

	@Query("Select S from Employees S where S.id = ?1 and S.password = ?2")
	Employees login(String id, String password);
}
