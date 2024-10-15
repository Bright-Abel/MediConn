## MediConn

**MediConn** is a healthcare platform designed to make it easy for users to book appointments with doctors of their choice, receive real-time updates, and manage their medical history. By integrating features like SMS notifications and a user-friendly dashboard, MediConn simplifies the healthcare experience for patients.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Features

- **User Account Creation:** Easily create and manage user accounts.
- **Doctor Appointments:** Users can search for and book appointments with doctors of their choice.
- **Medical History Tracking:** Keep track of all past appointments and medical records.
- **Admin Dashboard:** Administrators can manage doctor profiles, view appointments, and access user data.
- **SMS Notifications:** Users receive SMS notifications via Twilio for appointment details and reminders.
- **Appointment History:** Users can view the details of their past appointments, including doctors, dates, and times.

## Tech Stack

MediConn is built with the following technologies:

- **Frontend:** Next.js (React-based framework)
- **Backend:** Appwrite (Backend-as-a-Service for managing database and authentication)
- **SMS Service:** Twilio (For sending SMS notifications)
- **Language:** TypeScript (Strongly typed JavaScript for better code reliability)
- **Error Tracking:** Sentry (For monitoring and handling errors)
- **Styling:** Tailwind CSS (Utility-first CSS framework)
- **UI Components:** Shadcn (For accessible and customizable components)
- **State Management:** Redux (For managing global state)

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager for the project)
- Appwrite server instance
- Twilio account

### Steps

1. **Clone the Repository**

   \`\`\`bash
   git clone https://github.com/your-username/mediconn.git
   cd mediconn
   npm install
   \`\`\`

2. **Set up Appwrite**

   - Set up your Appwrite server and create a project for MediConn.
   - Create necessary collections for users, appointments, and medical history.
   - Set up authentication and user roles.

3. **Configure Twilio**

   - Sign up for a Twilio account and get your API credentials (Account SID, Auth Token, and Twilio phone number).
   - Configure Twilio to send SMS notifications for appointment reminders and details.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

\`\`\`bash
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
NEXT_PUBLIC_APPWRITE_API_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_TWILIO_ACCOUNT_SID=your_twilio_account_sid
NEXT_PUBLIC_TWILIO_AUTH_TOKEN=your_twilio_auth_token
NEXT_PUBLIC_TWILIO_PHONE_NUMBER=your_twilio_phone_number
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
\`\`\`

## Usage

### Booking Appointments

- **User Registration:** Users can create an account by providing personal details such as name, email, and phone number.
- **Search and Book:** After logging in, users can browse available doctors and book an appointment.
- **SMS Notifications:** Once an appointment is booked, the user will receive an SMS with the appointment details. Reminders will be sent as the appointment date approaches.

### Medical History

- Users can view their appointment history, including past doctor visits, dates, and associated medical records.

### Admin Dashboard

- Admins can log in to the dashboard to manage doctor profiles and oversee appointment bookings.
