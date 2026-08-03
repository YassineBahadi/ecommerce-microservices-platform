package com.yassine.ecommerce.payment;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author pc
 **/
public interface PaymentRepository extends JpaRepository<Payment,Integer> {
}
