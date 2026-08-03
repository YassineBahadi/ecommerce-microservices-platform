package com.yassine.ecommerce.notification;

import com.yassine.ecommerce.payment.PaymentMethod;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record PaymentNotificationRequest(
        String orderReference,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        String customerFirstName,
        String customerLastName,
        String customerEmail

) {
}
