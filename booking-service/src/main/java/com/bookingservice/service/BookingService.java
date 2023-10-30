package com.bookingservice.service;

import com.bookingservice.dto.BookingResponseDTO;
import com.bookingservice.exceptions.BookingDetailsNotFoundException;
import com.bookingservice.model.BookingDetails;
import java.util.List;

public interface BookingService {
    public List<BookingDetails> getAll();

    List<BookingDetails> getAllDetailsForUser(String userName) throws BookingDetailsNotFoundException;

    public BookingDetails getUserDetailsByPnr(long pnrNo) throws BookingDetailsNotFoundException;

    public BookingResponseDTO addUserBookingDetails(BookingDetails userDetails);

    public String cancelUserBookingDetails(long pnrNo) throws BookingDetailsNotFoundException;

}
