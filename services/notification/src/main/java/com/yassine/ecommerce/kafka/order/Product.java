package com.yassine.ecommerce.kafka.order;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record Product(
        Integer productId,
        String name,
        String description,
        BigDecimal price,
        double quantity
) {
}
