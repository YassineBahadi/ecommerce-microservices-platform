package com.yassine.ecommerce.orderline;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author pc
 **/
public interface OrderLineRepository extends JpaRepository<OrderLine,Integer> {
}
