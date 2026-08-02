package com.yassine.ecommerce.order;

import com.yassine.ecommerce.customer.CustomerClient;
import com.yassine.ecommerce.exception.BusinessException;
import com.yassine.ecommerce.kafka.OrderConfirmation;
import com.yassine.ecommerce.kafka.OrderProducer;
import com.yassine.ecommerce.orderline.OrderLineRequest;
import com.yassine.ecommerce.orderline.OrderLineService;
import com.yassine.ecommerce.product.ProductClient;
import com.yassine.ecommerce.product.PurchaseRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    private final OrderProducer orderProducer;

    public  Integer createOrder( OrderRequest request) {
        var customer=this.customerClient.findCustomerById(request.customerId())
                .orElseThrow(()-> new BusinessException("Cannot create order:: No Customer exists with the provided ID"));


        var purchasedProducts= this.productClient.purchaseProducts(request.products());

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

        orderProducer.sendOrderConfirmation(
                new OrderConfirmation(
                        request.reference(),
                        request.amount(),
                        request.paymentMethod(),
                        customer,
                        purchasedProducts
                )
        );
        return order.getId();
    }

    public  List<OrderResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::fromOrder)
                .collect(Collectors.toList());
    }

    public  OrderResponse findById(Integer orderId) {
        return repository.findById(orderId)
                .map(mapper::fromOrder)
                .orElseThrow(()-> new EntityNotFoundException(String.format("Order with ID %d not found", orderId)));
    }
}
