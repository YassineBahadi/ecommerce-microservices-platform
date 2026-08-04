package com.yassine.ecommerce.kafka.order;

/**
 * @author pc
 **/
public record Customer(
        String id,
        String firstname,
        String lastname,
        String email
) {
}
