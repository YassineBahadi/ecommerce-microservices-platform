package com.yassine.ecommerce.notification;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author pc
 **/
public interface NotificationRepository extends MongoRepository<Notification,String> {
}
