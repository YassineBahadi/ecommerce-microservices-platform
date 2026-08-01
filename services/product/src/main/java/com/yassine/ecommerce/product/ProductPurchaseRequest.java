package com.yassine.ecommerce.product;

import jakarta.validation.constraints.NotNull;

/**
 * @author pc
 **/
public record ProductPurchaseRequest(
        @NotNull(message = "Product is mandatory")
        Integer productId,
        @NotNull(message = "Quantity is mandatory")
        double quantity
) {
}
