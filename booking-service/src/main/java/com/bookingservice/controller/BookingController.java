package com.bookingservice.controller;

import com.bookingservice.dto.BookingResponseDTO;

import com.bookingservice.exceptions.BookingDetailsNotFoundException;
import com.bookingservice.model.BookingDetails;
import com.bookingservice.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class BookingController {

    @Autowired
   private BookingService bookingService;

    @GetMapping("/allBookingDetailsOfUser/{userName}")
    public ResponseEntity<List<BookingDetails>> getAllDetailsForUser(@PathVariable String userName) throws BookingDetailsNotFoundException {
        return  new ResponseEntity<List<BookingDetails>>(bookingService.getAllDetailsForUser(userName), HttpStatus.OK);
    }

    @GetMapping("/getDetailsByPnrNo/{pnrNo}")
    public ResponseEntity<BookingDetails> getUserDetailsByPnr(@PathVariable long pnrNo) throws BookingDetailsNotFoundException{
        return  new  ResponseEntity<BookingDetails>(bookingService.getUserDetailsByPnr(pnrNo),HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<BookingResponseDTO> addUserBookingDetails(@Valid @RequestBody BookingDetails userDetails){
        return  new ResponseEntity<BookingResponseDTO>(bookingService.addUserBookingDetails(userDetails),HttpStatus.OK);
    }

    @PutMapping("/cancel/{pnrNo}")
    public ResponseEntity<String> cancelUserBookingDetails( @PathVariable long pnrNo) throws BookingDetailsNotFoundException{
        return new ResponseEntity<String>(bookingService.cancelUserBookingDetails(pnrNo),HttpStatus.OK);
    }

}
