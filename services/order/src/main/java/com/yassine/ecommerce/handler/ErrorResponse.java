package com.yassine.ecommerce.handler;

import java.util.Map;

/**
 * @author pc
 **/
public record ErrorResponse(
        Map<String,String> errors
) {
}
