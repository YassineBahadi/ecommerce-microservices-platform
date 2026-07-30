package com.yassine.ecommerce.customer;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author pc
 **/
public interface CustomerRepository extends MongoRepository<Customer, String> {
}
