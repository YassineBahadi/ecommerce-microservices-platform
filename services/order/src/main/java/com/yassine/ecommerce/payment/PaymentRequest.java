package com.yassine.ecommerce.payment;

import com.yassine.ecommerce.customer.CustomerResponse;
import com.yassine.ecommerce.order.PaymentMethod;

import java.math.BigDecimal;

/**
 * @author pc
 **/
public record PaymentRequest(
        BigDecimal amount,
        PaymentMethod paymentMethod,
        Integer orderId,
        String orderReference,
        CustomerResponse customer
) {
}
