package com.vandana.aideveloperassistant;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class OllamaService {

    private final RestClient restClient;

    public OllamaService() {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:11434")
                .build();
    }

    public String ask(String question) {

        Map<String, Object> request = Map.of(
                "model", "llama3.2",
                "prompt", question,
                "stream", false
        );

        Map response = restClient.post()
                .uri("/api/generate")
                .body(request)
                .retrieve()
                .body(Map.class);

        return response.get("response").toString();
    }
}