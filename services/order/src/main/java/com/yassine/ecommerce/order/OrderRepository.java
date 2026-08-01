package com.yassine.ecommerce.order;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author pc
 **/
public interface OrderRepository extends JpaRepository<Order,Integer> {
}
