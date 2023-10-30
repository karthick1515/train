//package com.bookingservice.exceptions;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//     @ExceptionHandler(BookingDetailsNotFoundException.class)
//    public ResponseEntity<String> BookingDetailsNotFoundException(BookingDetailsNotFoundException ex){
//        String message = ex.getMessage();
//        return new ResponseEntity<String>(message, HttpStatus.NOT_FOUND);
//    }
//}
