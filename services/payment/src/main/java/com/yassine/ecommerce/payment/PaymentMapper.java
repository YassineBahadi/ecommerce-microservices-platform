package com.yassine.ecommerce.payment;

import org.springframework.stereotype.Service;

/**
 * @author pc
 **/
@Service
public class PaymentMapper {
    public Payment toPayment(PaymentRequest request) {
        return Payment.builder()
                .id(request.id())
                .orderId(request.orderId())
                .paymentMethod(request.paymentMethod())
                .amount(request.amount())
                .build();
    }
}
