package com.bookingservice.exceptions;

public class BookingDetailsNotFoundException extends Exception{
    public BookingDetailsNotFoundException(){
        super();
    }
    public BookingDetailsNotFoundException(String msg){
        super(msg);
    }
}
