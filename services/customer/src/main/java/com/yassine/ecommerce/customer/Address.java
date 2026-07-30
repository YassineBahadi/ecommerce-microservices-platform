package com.yassine.ecommerce.customer;

import lombok.*;
import org.springframework.validation.annotation.Validated;

/**
 * @author pc
 **/
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Validated
public class Address {
    private String street;
    private String houseNumber;
    private String zipCode;
}
