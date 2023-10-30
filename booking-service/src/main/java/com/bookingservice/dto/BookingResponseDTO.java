package com.bookingservice.dto;

import com.bookingservice.enums.BookingClass;
import com.bookingservice.model.BookingDetails;
import com.bookingservice.model.Passenger;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.List;


@Getter
@Setter
public class BookingResponseDTO {
    private long  pnrNo;
    private int trainNo;
    private String trainName;
    private String sourceStation;
    private String destinationStation;
    private Date journeyDate;

    private int passengerNo;
    
    private BookingClass classType;
    private String BookingStatus;
    private int totalFare;

    private List<Passenger> pass;


   public BookingResponseDTO(){

   }
    public BookingResponseDTO(BookingDetails user, List<Passenger> pass) {
        this.pass=pass;
        this.BookingStatus=user.getBookingStatus();
        this.classType=user.getClassType();
        this.destinationStation=user.getDestinationStation();
        this.journeyDate=user.getJourneyDate();
        this.passengerNo=user.getPassengerNo();
        this.pnrNo=user.getPnrNo();
        this.sourceStation=user.getSourceStation();
        this.trainName=user.getTrainName();
        this.trainNo=user.getTrainNo();
        this.totalFare=user.getTotalFare();
    }

}