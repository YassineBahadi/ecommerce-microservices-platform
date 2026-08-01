package com.yassine.ecommerce.order;

import com.yassine.ecommerce.customer.CustomerClient;
import com.yassine.ecommerce.exception.BusinessException;
import com.yassine.ecommerce.orderline.OrderLineRequest;
import com.yassine.ecommerce.orderline.OrderLineService;
import com.yassine.ecommerce.product.ProductClient;
import com.yassine.ecommerce.product.PurchaseRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author pc
 **/
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository repository;
    private final CustomerClient customerClient;
    private final ProductClient productClient;
    private final OrderMapper mapper;
    private final OrderLineService orderLineService;
    public  Integer createOrder( OrderRequest request) {
        var customer=this.customerClient.findCustomerById(request.customerId())
                .orElseThrow(()-> new BusinessException("Cannot create order:: No Customer exists with the provided ID"));


        this.productClient.purchaseProducts(request.products());

        var order=this.repository.save(mapper.toOrder(request));

        for(PurchaseRequest purchaseRequest:request.products()){
            orderLineService.saveOrderLine(
                    new OrderLineRequest(
                           null,
                           order.getId(),
                           purchaseRequest.productId(),
                           purchaseRequest.quantity()
                    )
            );
        }

        // start payment-process

        // send the order confirmation --> notifications-ms(kafka)
        return null;
    }
}
