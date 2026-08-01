package com.yassine.ecommerce.orderline;

import com.yassine.ecommerce.order.Order;
import jakarta.persistence.*;
import lombok.*;

/**
 * @author pc
 **/
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class OrderLine {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    private Integer productId;
    private double quantity;
}
