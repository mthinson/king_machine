package com.kingMachine.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages="com.kingMachine.repository")
@EntityScan(basePackages="com.kingMachine.entity")
public class applicationConfig {

}
