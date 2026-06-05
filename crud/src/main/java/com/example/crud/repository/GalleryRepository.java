package com.example.crud.repository;

import com.example.crud.model.Gallery;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;  

@Repository
public interface GalleryRepository extends CrudRepository<Gallery, Integer> {

}