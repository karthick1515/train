package com.bookingservice.model;

import com.bookingservice.enums.BookingClass;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "bookingDetails")
public class BookingDetails {
    @Id
    private  String bookingId;
    @NotBlank(message = "User name is required")
    private String userName;
    private Long pnrNo;
    @NotNull(message = "Train number is required")
    private int trainNo;
    @NotBlank(message = "Train name is required")
    private String trainName;
    @NotBlank(message = "Source station is required")
    private String sourceStation;
    @Transient
    private List<Passenger> passengers;
    @NotBlank(message = "Destination station is required")
    private String destinationStation;
  //  @NotNull(message = "Journey date is required")
    private Date journeyDate;

    @Min(value = 0, message = "Total fare must be a positive number")
    private int totalFare;
//    @Transient
//    private String date;

    @NotNull(message = "Passenger phone number is required")
    private Long passengerPhoneNumber;

    @NotNull(message = "Class type is required")
    private BookingClass classType;
  //  @NotBlank(message = "Booking status is required")
    private String BookingStatus;
    @Min(value = 1, message = "Passenger number must be at least 1")
    private int passengerNo;

}
