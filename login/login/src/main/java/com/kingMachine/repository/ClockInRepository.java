package com.kingMachine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kingMachine.entity.Employees;

public interface ClockInRepository extends JpaRepository<Employees, Double>{

	@Query("Select S from Employees S where S.id = ?1")
		Employees time(Double startTime);
}