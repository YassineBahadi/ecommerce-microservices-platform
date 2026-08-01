package com.yassine.ecommerce.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author pc
 **/
public interface ProductRepository extends JpaRepository<Product,Integer> {
    List<Product> findAllByIdInOrderById(List<Integer> productIds);
}
