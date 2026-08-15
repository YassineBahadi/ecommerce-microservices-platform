package com.yassine.ecommerce.product;

import com.yassine.ecommerce.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
@RequiredArgsConstructor
public class ProductClient {

    @Value("${application.config.product-url}")
    private String productUrl;

    private final RestTemplate restTemplate;

    public List<PurchaseResponse> purchaseProducts(
            List<PurchaseRequest> requestBody
    ) {

        HttpHeaders headers = new HttpHeaders();

        headers.set(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        // Récupérer le JWT de la requête entrante
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes != null) {

            HttpServletRequest request =
                    attributes.getRequest();

            String authorization =
                    request.getHeader(AUTHORIZATION);

            if (authorization != null) {
                headers.set(AUTHORIZATION, authorization);
            }
        }

        HttpEntity<List<PurchaseRequest>> requestEntity =
                new HttpEntity<>(requestBody, headers);

        ParameterizedTypeReference<List<PurchaseResponse>> responseType =
                new ParameterizedTypeReference<>() {};

        ResponseEntity<List<PurchaseResponse>> responseEntity =
                restTemplate.exchange(
                        productUrl + "/purchase",
                        POST,
                        requestEntity,
                        responseType
                );

        if (responseEntity.getStatusCode().isError()) {
            throw new BusinessException(
                    "An error occurred while processing the products purchase: "
                            + responseEntity.getStatusCode()
            );
        }

        return responseEntity.getBody();
    }
}