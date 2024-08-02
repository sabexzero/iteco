package org.vkuksatech.itecotask.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;

//Config for swagger
@OpenAPIDefinition(
        info = @Info(
                title = "ITECO-TASK API",
                description = "\"ITECO-TASK API\" - " +
                        "Backend-часть приложения.", version = "1.0.0",
                contact = @Contact(
                        name = "Vitaliy Kuksa",
                        email = "vkuksa.tech@outlook.com"
                )
        )
)
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI();
    }
}

