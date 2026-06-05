package com.example.crud.controller;

import com.example.crud.model.Skill;
import com.example.crud.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping("/skills")
    public String list(Model model) {
        List<Skill> allSkills = new ArrayList<>();
        skillRepository.findAll().forEach(allSkills::add);

        model.addAttribute("frontendSkills", allSkills.stream()
                .filter(s -> "frontend".equals(s.getKategori())).toList());
        model.addAttribute("backendSkills", allSkills.stream()
                .filter(s -> "backend".equals(s.getKategori())).toList());
        model.addAttribute("tools", allSkills.stream()
                .filter(s -> "tools".equals(s.getKategori())).toList());

        return "skills";
    }

    @GetMapping("/skills/add")
    public String addForm(Model model) {
        model.addAttribute("skill", new Skill());
        return "skills";
    }

    @PostMapping("/skills/save")
    public String save(@ModelAttribute Skill skill) {
        skillRepository.save(skill);
        return "redirect:/skills";
    }

    @GetMapping("/skills/edit/{id}")
    public String editForm(@PathVariable Integer id, Model model) {
        Skill skill = skillRepository.findById(id).orElse(null);
        model.addAttribute("skill", skill);
        return "skills";
    }

    @PostMapping("/skills/update/{id}")
    public String update(@PathVariable Integer id, @ModelAttribute Skill skillDetail) {
        Skill skill = skillRepository.findById(id).orElse(null);
        if (skill != null) {
            skill.setNama(skillDetail.getNama());
            skill.setLevel(skillDetail.getLevel());
            skill.setKategori(skillDetail.getKategori());
            skillRepository.save(skill);
        }
        return "redirect:/skills";
    }

    @GetMapping("/skills/delete/{id}")
    public String delete(@PathVariable Integer id) {
        skillRepository.deleteById(id);
        return "redirect:/skills";
    }
}