package com.example.resource_service.controller;

import com.example.resource_service.entity.Resource;
import com.example.resource_service.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/resources")
@CrossOrigin(origins = "http://localhost:4200")
public class ResourceController {

    private final ResourceService service;

    public ResourceController(ResourceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Resource> getAllResources() {
        return service.getAllResources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        return service.getResourceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Resource createResource(@Valid @RequestBody Resource resource) {
        return service.createResource(resource);
    }

    @PutMapping("/{id}")
    public Resource updateResource(@PathVariable Long id, @Valid @RequestBody Resource resource) {
        return service.updateResource(id, resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        service.deleteResource(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/types")
    public List<String> getResourceTypes() {
        return service.getResourceTypes();
    }
}
