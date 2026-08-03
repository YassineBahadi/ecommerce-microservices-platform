package com.yassine.ecommerce.payment;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record PaymentRequest(
        Integer id,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        Integer orderId,
        String orderReference,
        Customer customer
) {
}
