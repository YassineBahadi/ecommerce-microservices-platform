package com.yassine.ecommerce.customer;

import org.springframework.stereotype.Service;

/**
 * @author pc
 **/
@Service
public class CustomerMapper {

    public Customer toCustomer(CustomerRequest request) {
        if(request == null) return null;
        return Customer.builder()
                .id(request.id())
                .firstName(request.firstname())
                .lastName(request.lastname())
                .email(request.email())
                .address(request.address())
                .build();
    }

    public CustomerResponse fromCustomer(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getAddress()
        );
    }
}
