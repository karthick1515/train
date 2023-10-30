package com.bookingservice.service;

import com.bookingservice.client.TrainFeignClient;
import com.bookingservice.dto.BookingResponseDTO;
import com.bookingservice.dto.TrainDetails;
import com.bookingservice.enums.BookingClass;
import com.bookingservice.exceptions.BookingDetailsNotFoundException;
import com.bookingservice.model.BookingDetails;
import com.bookingservice.model.Passenger;
import com.bookingservice.repository.BookingRepository;
import com.bookingservice.repository.PassengerRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.bookingservice.enums.BookingClass.*;

@Service
public class BookingServiceImpl implements  BookingService {
    public static final Logger log= LogManager.getLogger(BookingServiceImpl.class);
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TrainFeignClient trainFeignClient;

    @Override
    public List<BookingDetails> getAll() {
        log.info("Getting all booking details.");
        return bookingRepository.findAll();
    }

    @Override
    public List<BookingDetails> getAllDetailsForUser(String userName) throws BookingDetailsNotFoundException {
        log.info("Getting booking details for user: {}", userName);
        Optional<List<BookingDetails>> byUserName = bookingRepository.findByUserName(userName);
        if (byUserName.isEmpty()) {
            log.warn("No bookings found for user: {}", userName);
            throw new BookingDetailsNotFoundException("The given user has no bookings!");
        }
        List<BookingDetails> bookingDetails = byUserName.get();

        bookingDetails.forEach(b -> {
            Long pnrNo = b.getPnrNo();
            List<Passenger> byPnrNo = passengerRepository.findByPnrNo(pnrNo);
            b.setPassengers(byPnrNo);
        });
        log.info("Retrieved {} booking details for user: {}", bookingDetails.size(), userName);
        return bookingDetails;

    }

    @Override
    public BookingDetails getUserDetailsByPnr(long pnrNo) throws BookingDetailsNotFoundException {
        log.info("Getting booking details for PNR: {}", pnrNo);
        Optional<BookingDetails> byPnrNo = bookingRepository.findByPnrNo(pnrNo);
        if (byPnrNo.isEmpty()) {
            log.warn("Booking details not found for PNR: {}", pnrNo);
            throw new BookingDetailsNotFoundException("BookingDetails with given " + pnrNo + " not found!!");
        }
        BookingDetails bookingDetails = byPnrNo.get();
        List<Passenger> listbyPnrNo = passengerRepository.findByPnrNo(pnrNo);
        bookingDetails.setPassengers(listbyPnrNo);
        log.info("Retrieved booking details for PNR: {}", pnrNo);
        return bookingDetails;
    }

    @Override
    public BookingResponseDTO addUserBookingDetails(BookingDetails userDetails) {
        log.info("Adding user booking details.");
        //set random pnr number
        long number = (long) Math.floor(Math.random() * 9_000_000_000L) + 1_000_000_000L;
        userDetails.setPnrNo(number);

        int trainNo = userDetails.getTrainNo();

        TrainDetails trainDetails = restTemplate.getForObject("http://localhost:8082/admin/search/" + trainNo, TrainDetails.class);

        Map<BookingClass, Integer> seatAvailability = trainDetails.getSeatAvailability();

        BookingClass classType = userDetails.getClassType();
        Integer seats;
        Integer fare = 0;
        String status = "";
        int passengers = userDetails.getPassengerNo();

        switch (classType) {
            case THIRDAC:
                seats = seatAvailability.get(THIRDAC);
                fare = trainDetails.getFares().get(THIRDAC);
                status = (seats == 0) ? "Seats are full, tickets are not confirmed, on waiting list"
                        : (passengers > seats) ? "All tickets not confirmed, " + (passengers - seats) + " seats on waiting list"
                        : "Tickets Confirmed!!";
                break;
            case SECONDAC:
                seats = seatAvailability.get(BookingClass.SECONDAC);
                fare = trainDetails.getFares().get(BookingClass.SECONDAC);
                status = (seats == 0) ? "Seats are full, tickets are not confirmed, on waiting list"
                        : (passengers > seats) ? "All tickets not confirmed, " + (passengers - seats) + " seats on waiting list"
                        : "Tickets Confirmed!!";
                break;
            case SLEEPER:
                seats = seatAvailability.get(SLEEPER);
                fare = trainDetails.getFares().get(SLEEPER);
                status = (seats == 0) ? "Seats are full, tickets are not confirmed, on waiting list"
                        : (passengers > seats) ? "All tickets not confirmed, " + (passengers - seats) + " seats on waiting list"
                        : "Tickets Confirmed!!";
                break;
            default:
                // Handle other cases if needed
                break;
        }
        userDetails.setTotalFare(fare * passengers);
        userDetails.setBookingStatus(status);

        int totalpassenger = userDetails.getPassengerNo();

//        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
//        try {
//            String date = userDetails.getDate();
//            Date parsedDate = sdf.parse(date);
//            userDetails.setJourneyDate(parsedDate);
//        } catch (ParseException e) {
//            System.out.println(e.getMessage());
//        }
        log.info("User booking details added successfully.");
        BookingDetails savedUser = bookingRepository.save(userDetails);
        List<Passenger> pass = userDetails.getPassengers()
                .stream()
                .map(passenger -> {
                    passenger.setPnrNo(savedUser.getPnrNo());
                    passenger.setBookingId(savedUser.getBookingId());
                    return passenger;
                }).collect(Collectors.toList());

        List<Passenger> passengersList = passengerRepository.saveAll(pass);
        log.info("Passenger details added successfully.");
        trainFeignClient.updateSeatsForBooking(trainNo, totalpassenger, classType);
        log.info("Train seats updated in train service successfully.");
        return new BookingResponseDTO(savedUser, passengersList);

    }

    @Override
    public String cancelUserBookingDetails(long pnrNo) throws BookingDetailsNotFoundException {
        log.info("Cancelling user booking with PNR: {}", pnrNo);
        Optional<BookingDetails> byPnrNo = bookingRepository.findByPnrNo(pnrNo);
        if (byPnrNo.isEmpty()) {
            log.warn("Booking details not found for cancellation with PNR: {}", pnrNo);
            throw new BookingDetailsNotFoundException("BookingDetails with given pnrNo " + pnrNo + " not found!!");
        }

        BookingDetails bookingDetails = byPnrNo.get();
        bookingDetails.setBookingStatus("Cancelled");
        bookingRepository.save(bookingDetails);
        int trainNo = bookingDetails.getTrainNo();
        int totalpassenger = bookingDetails.getPassengerNo();
        BookingClass classType = bookingDetails.getClassType();
        trainFeignClient.updateSeatsForCancel(trainNo, totalpassenger, classType);
        log.info("User booking with PNR {} cancelled successfully.", pnrNo);
        return "Your booking ticket with PNR Number : " + pnrNo + " is cancelled. Your payment amount will be credited to your account within 5 to 7 days..!!!";
    }

	@Override
	public List<Passenger> getPassengerDetailsByPnr(long pnrNo) throws BookingDetailsNotFoundException {
		 log.info("Getting booking details for PNR: {}", pnrNo);
	        Optional<BookingDetails> byPnrNo = bookingRepository.findByPnrNo(pnrNo);
	        if (byPnrNo.isEmpty()) {
	            log.warn("Booking details not found for PNR: {}", pnrNo);
	            throw new BookingDetailsNotFoundException("BookingDetails with given " + pnrNo + " not found!!");
	        }
	        BookingDetails bookingDetails = byPnrNo.get();
	        List<Passenger> listbyPnrNo = passengerRepository.findByPnrNo(pnrNo);
	        bookingDetails.setPassengers(listbyPnrNo);
	        log.info("Retrieved booking details for PNR: {}", pnrNo);
		return  listbyPnrNo;
	}
}

