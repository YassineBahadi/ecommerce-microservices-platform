package com.yassine.ecommerce.kafka.payment;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record PaymentConfirmation(
        String orderReference,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        String customerFirstname,
        String customerLastname,
        String customerEmail
) {
}
