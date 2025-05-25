# MERO_DOCTOR 🏥

MERO_DOCTOR is a modern, secure, and scalable **Doctor Appointment Management System** built using **Node.js** and **TypeScript**. It offers features such as user and doctor authentication, appointment booking, payment gateway integration (Esewa & Khalti), OTP verification, email notification, and secure file uploads.

---

##  Key Features

###  Authentication & Authorization
- JWT-based secure authentication
- Middleware for role-based access (e.g., Admin, Doctor, User)

###  Doctor Management
- Register, update, and manage doctor profiles
- Upload documents using Multer
- Store credentials securely

###  User Management
- User registration, login, and profile management
- OTP-based account verification and email confirmation

###  Appointment Booking System
- Book appointments with available doctors
- Real-time appointment storage
- Booking history and cancellation support

###  Payment Integration
- **Esewa Payment Gateway**
  - Signature generation
  - Verification and response handling
- **Khalti Payment Gateway**
  - Token-based payment integration
  - Response handling and payment logs

###  Mailing System
- Send OTPs for verification
- Appointment confirmation emails
- Integrated via SMTP (Nodemailer)

###  OTP Verification
- Secure and time-bound OTP generation
- Mail delivery via a central service

###  File Uploads
- Upload images or documents with Multer
- Store in `storage/` directory

###  Scalable Project Structure
- Organized by features and responsibilities
- Built for maintainability and expansion

---

## 📁 Project Structure



```fileStructure
MERO_DOCTOR/
│
├── src/                                # Main source code directory
│   ├── app.ts                          # Entry point to set up Express app, routes, middleware, etc.
│
│   ├── dataBase/                       # Database-related configurations and models
│   │   ├── Model/                      # Mongoose schema definitions (ODM models)
│   │   │   ├── doctorModel.ts          # Schema for doctor data
│   │   │   ├── paymentModel.ts         # Schema for payment records
│   │   │   └── userModel.ts            # Schema for user data
│   │   └── db_connection.ts            # MongoDB connection setup using Mongoose
│
│   ├── global/                         
│   │   └── interface.ts                # TypeScript interfaces used throughout the project
│
│   ├── middleware/                    
│   │   ├── multer.ts                   # Middleware for handling file uploads
│   │   └── userMiddleware.ts           # User authentication/authorization middleware
│
│   ├── Route/                          
│   │   ├── bookingRoute.ts             # Booking-related routes
│   │   ├── doctorRoute.ts              # Doctor-related routes
│   │   └── userRoute.ts                # User-related routes
│
│   ├── services/                       
│   │   ├── generateEsewaSignature.ts   # Esewa payment signature generation logic
│   │   ├── mailSender.ts               # Logic for sending emails
│   │   ├── otpGenerator.ts             # Generates OTPs for verification
│   │   └── tokengenerator.ts           # Generates authentication tokens (e.g., JWT)
│
│   ├── Static/                         # Folder for serving static files (e.g., images, documents)
│   └── storage/                        # Temporary or permanent storage for file uploads
│
├── .env                                # Environment variables (for production)
├── .gitignore                          # Git ignore rules
├── adminSeeder.ts                      # Script to seed admin user into the database
├── example.env                         # Sample environment file for reference
├── package-lock.json                   # Auto-generated lock file for exact package versions
├── package.json                        # Project metadata and dependencies
├── server.ts                           # Main server bootstrap file (likely calls app.ts)
└── tsconfig.json                       # TypeScript configuration


```


---

##  Tech Stack

| Category      | Tech                     |
|---------------|--------------------------|
| Runtime       | Node.js                  |
| Language      | TypeScript               |
| Framework     | Express.js               |
| Database      | MongoDB + Mongoose ODM   |
| Auth          | JWT                      |
| Payments      | Esewa, Khalti            |
| Mail Service  | Nodemailer (SMTP)        |
| File Upload   | Multer                   |
| Environment   | dotenv                   |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running locally or in the cloud
- SMTP Email Credentials (e.g., Gmail)
- Esewa Developer Credentials
- Khalti Merchant Credentials

### Installation

```bash
git clone https://github.com/saugat1070/mero_doctor.git
cd mero_doctor
npm install
cp example.env .env  # then update it with your credentials
