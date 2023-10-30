package com.bookingservice.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "passengerDetails")
public class Passenger {
    @Id
    private String passengerId;
    @NotBlank(message = "Name is required")
    private String name;
    @NotNull(message = "Age is required")
   
    private String age;
    @NotBlank(message = "Gender is required")
    private String gender;

    private long  pnrNo;
    private String bookingId;
}
