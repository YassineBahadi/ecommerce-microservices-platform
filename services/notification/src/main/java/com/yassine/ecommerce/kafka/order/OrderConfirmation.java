package com.yassine.ecommerce.kafka.order;

import com.yassine.ecommerce.kafka.payment.PaymentMethod;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author pc
 **/
public record OrderConfirmation(
        String orderReference,
        BigDecimal totalAmount,
        PaymentMethod paymentMethod,
        Customer customer,
        List<Product> products
) {
}
