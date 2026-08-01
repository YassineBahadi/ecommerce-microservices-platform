package com.yassine.ecommerce.orderline;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * @author pc
 **/
public record OrderLineRequest(Integer id, Integer orderId,  Integer productId,
                                double quantity) {
}
