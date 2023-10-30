package com.bookingservice.client;
import com.bookingservice.dto.TrainDetails;
import com.bookingservice.enums.BookingClass;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(url = "http://localhost:8082",name = "TRAIN-SERVICE")
public interface TrainFeignClient {
    @PutMapping("/admin/updateSeatsforBooking/{trainNumber}/{noOfPassengers}/{classType}")
    public TrainDetails updateSeatsForBooking(@PathVariable int trainNumber,@PathVariable int noOfPassengers,@PathVariable BookingClass classType);

    @PutMapping("/admin/updateSeatsforCancel/{trainNumber}/{noOfPassengers}/{classType}")
    public TrainDetails updateSeatsForCancel(@PathVariable int trainNumber,@PathVariable int noOfPassengers,@PathVariable BookingClass classType);
}
