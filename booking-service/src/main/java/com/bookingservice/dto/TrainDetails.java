package com.bookingservice.dto;

import com.bookingservice.enums.BookingClass;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.Map;

@Getter
@Setter
public class TrainDetails {

//    private int trainNumber;
//    private String trainName;
//    private String sourceStation;
//    private String destinationStation;
//    private String departureTime;
//    private String arrivalTime;
//    private Date trainDate;
//    private int noOfSeatstwoTierAc;
//    private int noOfSeatsthreeTierAc;
//    private int noOfSeatsSleeper;
//    @Transient
//    private String date;
//    private int twoTierAcFare;
//    private int threeTierAcFare;
//    private int sleeperFare;
   private int trainNumber;
    private String trainName;
    private String sourceStation;
    private String destinationStation;
    private String departureTime;
    private String arrivalTime;
    private Date trainDate;
    private Map<BookingClass, Integer> seatAvailability; // Map to store seat availability
    private Map<BookingClass, Integer> fares; // Map to store fare information
    private String date;

}
