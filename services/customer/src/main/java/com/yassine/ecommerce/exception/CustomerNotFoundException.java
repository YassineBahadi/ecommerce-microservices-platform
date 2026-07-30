package com.yassine.ecommerce.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author pc
 **/
@EqualsAndHashCode(callSuper=true)
@Data
public class CustomerNotFoundException extends RuntimeException {
    private final String msg;
}
