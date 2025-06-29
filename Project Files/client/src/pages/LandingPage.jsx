import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const navigate = useNavigate();
  const [Flights, setFlights] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('userType') === 'admin') {
      navigate('/admin');
    } else if (localStorage.getItem('userType') === 'flight-operator') {
      navigate('/flight-admin');
    }
  }, []);

  const fetchFlights = async () => {
    if (checkBox) {
      if (departure && destination && departureDate && returnDate) {
        const date = new Date();
        const date1 = new Date(departureDate);
        const date2 = new Date(returnDate);
        if (date1 > date && date2 > date1) {
          setError('');
          await axios.get('http://localhost:6001/fetch-flights').then((response) => {
            setFlights(response.data);
          });
        } else setError('Please check the dates');
      } else {
        setError('Please fill all the inputs');
      }
    } else {
      if (departure && destination && departureDate) {
        const date = new Date();
        const date1 = new Date(departureDate);
        if (date1 >= date) {
          setError('');
          await axios.get('http://localhost:6001/fetch-flights').then((response) => {
            setFlights(response.data);
          });
        } else setError('Please check the dates');
      } else {
        setError('Please fill all the inputs');
      }
    }
  };

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  const handleTicketBooking = (id, origin, destination) => {
    if (userId) {
      if (origin === departure) {
        setTicketBookingDate(departureDate);
        navigate(`/book-flight/${id}`);
      } else if (destination === departure) {
        setTicketBookingDate(returnDate);
        navigate(`/book-flight/${id}`);
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHero-title">
          <h1 className="banner-h1">
            Book Your Next Flight with Confidence 
          </h1>
          <p className="banner-p">
            Explore the skies with WE Flights — your trusted partner for seamless, secure, and affordable flight bookings. Whether it's business or leisure, plan your trip effortlessly with us.
          </p>
        </div>

        {/* Flight search form */}
        <div className="Flight-search-container input-container mb-4">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onChange={(e) => setCheckBox(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Return journey
            </label>
          </div>

          <div className="Flight-search-container-body">
            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Indore">Indore</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">Varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label htmlFor="floatingSelect">Departure City</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Banglore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Indore">Indore</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">Varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label htmlFor="floatingSelect">Destination City</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <label>Journey date</label>
            </div>

            {checkBox && (
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <label>Return date</label>
              </div>
            )}

            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
            </div>
          </div>

          <p>{error}</p>
        </div>

        {/* Flights list */}
        {Flights.length > 0 && (
          <div className="availableFlightsContainer">
            <h1>Available Flights</h1>
            <div className="Flights">
              {Flights
                .filter((f) =>
                  checkBox
                    ? (f.origin === departure && f.destination === destination) ||
                      (f.origin === destination && f.destination === departure)
                    : f.origin === departure && f.destination === destination
                )
                .map((Flight) => (
                  <div className="Flight" key={Flight._id}>
                    <div>
                      <p><b>{Flight.flightName}</b></p>
                      <p><b>Flight Number:</b> {Flight.flightId}</p>
                    </div>
                    <div>
                      <p><b>Start:</b> {Flight.origin}</p>
                      <p><b>Departure Time:</b> {Flight.departureTime}</p>
                    </div>
                    <div>
                      <p><b>Destination:</b> {Flight.destination}</p>
                      <p><b>Arrival Time:</b> {Flight.arrivalTime}</p>
                    </div>
                    <div>
                      <p><b>Price:</b> ₹{Flight.basePrice}</p>
                      <p><b>Seats:</b> {Flight.totalSeats}</p>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleTicketBooking(Flight._id, Flight.origin, Flight.destination)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* About Section */}
      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">About WE Flights</h2>
          <p className="section-description">
            Welcome to WE Flights — your one-stop destination for simple, reliable, and cost-effective air travel bookings. Our goal is to make air travel effortless, so you can focus on your journey, not the logistics.
          </p>
          <p className="section-description">
            With a user-friendly platform, competitive fares, and real-time availability, we’re transforming how India flies. Whether you're traveling for work, family, or leisure — book your next flight with confidence.
          </p>
          <span><h5>© 2025 WE Flights — All rights reserved.</h5></span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
