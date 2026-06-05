package com.example.crud.controller;

import com.example.crud.model.Gallery;
import com.example.crud.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class GalleryController {

    @Autowired
    private GalleryRepository galleryRepository;

    @GetMapping("/gallery")
    public String list(Model model) {
        List<Gallery> allGallery = new ArrayList<>();
        galleryRepository.findAll().forEach(allGallery::add);

        model.addAttribute("gallery", allGallery);
        return "gallery";
    }
    @GetMapping("/gallery/add")
    public String addForm(Model model) {
        model.addAttribute("gallery", new Gallery());
        return "gallery";
    }
    @PostMapping("/gallery/save")
    public String save(@ModelAttribute Gallery gallery) {
        galleryRepository.save(gallery);
        return "redirect:/gallery";
    }
    @GetMapping("/gallery/edit/{id}")
    public String editForm(@PathVariable Integer id, Model model) {
        Gallery gallery = galleryRepository.findById(id).orElse(null);
        model.addAttribute("gallery", gallery);
        return "gallery";
    
    }
    @PostMapping("/gallery/update/{id}")
    public String update(@PathVariable Integer id, @ModelAttribute Gallery galleryDetail) { 
        Gallery gallery = galleryRepository.findById(id).orElse(null);
        if (gallery != null) {
            gallery.setNama(galleryDetail.getNama());
            gallery.setDeskripsi(galleryDetail.getDeskripsi());
            gallery.setUrl(galleryDetail.getUrl());
            galleryRepository.save(gallery);
        }
        return "redirect:/gallery";
    }
    @GetMapping("/gallery/delete/{id}")
    public String delete(@PathVariable Integer id) {
        galleryRepository.deleteById(id);
        return "redirect:/gallery";
    }
}
