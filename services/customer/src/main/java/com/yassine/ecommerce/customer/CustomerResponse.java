package com.yassine.ecommerce.customer;

/**
 * @author pc
 **/
public record CustomerResponse(
        String id,
        String firstname,
        String lastname,
        String email,
        Address address
) {
}
