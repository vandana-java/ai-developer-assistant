package com.vandana.aideveloperassistant;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AssistantController {

    private final OllamaService ollamaService;

    public AssistantController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @GetMapping("/")
    public String home() {
        return "AI Developer Assistant is running!";
    }

    @GetMapping("/api/ask")
    public String ask(@RequestParam String question) {
        return ollamaService.ask(question);
    }
}