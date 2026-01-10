package com.example.resource_service.service;

import com.example.resource_service.entity.Resource;
import com.example.resource_service.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    private final ResourceRepository repository;

    public ResourceService(ResourceRepository repository) {
        this.repository = repository;
    }

    public List<Resource> getAllResources() {
        return repository.findAll();
    }

    public Optional<Resource> getResourceById(Long id) {
        return repository.findById(id);
    }

    public Resource createResource(Resource resource) {
        return repository.save(resource);
    }

    public Resource updateResource(Long id, Resource resourceDetails) {
        Resource resource = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ressource non trouvée avec l'id : " + id));
        resource.setNom(resourceDetails.getNom());
        resource.setType(resourceDetails.getType());
        resource.setCapacite(resourceDetails.getCapacite());
        resource.setDescription(resourceDetails.getDescription());
        return repository.save(resource);
    }

    public void deleteResource(Long id) {
        repository.deleteById(id);
    }

    public List<String> getResourceTypes() {
        return repository.findDistinctTypes();
    }
}
