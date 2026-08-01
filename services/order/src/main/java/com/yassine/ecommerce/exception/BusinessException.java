package com.yassine.ecommerce.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author pc
 **/
@EqualsAndHashCode(callSuper = true)
@Data
public class BusinessException extends RuntimeException {
    private final String msg;
}
