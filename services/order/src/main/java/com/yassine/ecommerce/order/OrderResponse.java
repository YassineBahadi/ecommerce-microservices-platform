package com.yassine.ecommerce.order;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record OrderResponse(
        Integer id,
        String reference,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        String customerId
) {
}
