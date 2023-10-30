package com.bookingservice.repository;

import com.bookingservice.model.Passenger;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PassengerRepository extends MongoRepository<Passenger,Integer> {
    List<Passenger> findByPnrNo(long  pnrNo);

}
