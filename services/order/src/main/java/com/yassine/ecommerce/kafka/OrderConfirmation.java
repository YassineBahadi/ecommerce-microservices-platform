package com.yassine.ecommerce.kafka;

import com.yassine.ecommerce.customer.CustomerResponse;
import com.yassine.ecommerce.order.PaymentMethod;
import com.yassine.ecommerce.product.PurchaseResponse;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author pc
 **/
public record OrderConfirmation(
       String orderReference,
       BigDecimal totalAmount,
       PaymentMethod paymentMethod,
       CustomerResponse customer,
       List<PurchaseResponse> products

) {
}
