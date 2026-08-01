package com.yassine.ecommerce.product;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record PurchaseResponse(
        Integer productId,
        String name,
        String description,
        BigDecimal price,
        double quantity
) {
}
