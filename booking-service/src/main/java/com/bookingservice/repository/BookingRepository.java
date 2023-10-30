package com.bookingservice.repository;

import com.bookingservice.model.BookingDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository  extends MongoRepository<BookingDetails,String> {
    Optional<List<BookingDetails>> findByUserName(String userName);
    Optional<BookingDetails> findByPnrNo(Long pnrNo);
}
