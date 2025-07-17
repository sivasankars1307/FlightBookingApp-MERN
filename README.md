# FlightBookingApp-MERN
Flight Booking Management system using MERN stack.
🛫 FlightFinder – Your Ultimate Flight Booking Experience
FlightFinder is a modern web application designed to simplify and enhance the flight booking process. Built with the powerful MERN stack, this project offers real-time search, booking, and management of air travel options through a sleek, user-friendly interface.

🚀 Live Demo  https://drive.google.com/file/d/1JrG5MTU1-wu3uKi6q0i91n0hdZY6KxPD/view?usp=drivesdk


📚 Table of Contents
Features

Tech Stack

Getting Started

Installation

Application Flow

Database Design

Architecture

Demo Highlights

✅ Features
👤 User
Register/Login

Search and filter flights by source, destination, and date

Book flight tickets

View and manage bookings

Receive booking confirmations

🧑‍✈️ Admin (Coming Soon)
Manage flight inventory

Monitor booking activities

View system analytics

🧰 Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Versioning	Git, GitHub
Future Enhancements	JWT Auth, Admin Panel, Payment Gateway Integration

🛠️ Getting Started
📦 Prerequisites
Node.js & npm

MongoDB

Git

🧑‍💻 Installation
bash
Copy
Edit
# Clone the repository
git clone https://github.com/sivasankars1307/FlightBookingApp-MERN.git

# Backend Setup
cd FlightBookingApp-MERN/server
npm install
npm start

# Frontend Setup
cd ../client
npm install
npm start
🔄 Application Flow
👥 User:
Register/Login

Search flights

Book flight tickets

View confirmation and booking history

🧾 Database Design
✈️ Flight Schema
flightNumber, airline, source, destination, date, time, price

👤 User Schema
name, email, password, phone

📦 Booking Schema
userId, flightId, bookingDate, status

🏗️ Architecture Overview
Frontend: React handles UI & API calls via Axios

Backend: Express manages API routes & business logic

Database: MongoDB stores users, flights, bookings

Architecture: Follows RESTful client-server model

🎯 Demo Highlights
🔐 Secure user authentication (coming soon)

🔍 Real-time flight search and filters

🧾 Instant booking and confirmation

📱 Responsive, mobile-friendly UI

💡 Clean code structure for scalability
