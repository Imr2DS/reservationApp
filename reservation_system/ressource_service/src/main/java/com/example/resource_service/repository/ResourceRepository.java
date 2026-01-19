package com.example.resource_service.repository;

import com.example.resource_service.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    @Query("SELECT DISTINCT r.type FROM Resource r")
    List<String> findDistinctTypes();
}