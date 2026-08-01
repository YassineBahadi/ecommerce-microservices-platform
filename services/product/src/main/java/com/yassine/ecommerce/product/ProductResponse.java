package com.yassine.ecommerce.product;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record ProductResponse(
         Integer id,
         String name,
         String description,
         double availableQuantity,
         BigDecimal price,
         Integer categoryId,
         String categoryName,
         String categoryDescription
) {
}
