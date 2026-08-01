package com.yassine.ecommerce.orderline;

import com.yassine.ecommerce.order.Order;
import org.springframework.stereotype.Service;

/**
 * @author pc
 **/
@Service
public class OrderLineMapper {
    public OrderLine toOrderLine(OrderLineRequest request) {
        return OrderLine.builder()
                .id(request.id())
                .quantity(request.quantity())
                .order(Order.builder()
                        .id(request.orderId())
                        .build())
                .productId(request.productId())
                .build();
    }
}
