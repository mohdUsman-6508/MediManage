# MediManage

MediManage is a comprehensive healthcare management system designed to streamline patient management with real-time notifications, easy application scheduling, and an intuitive admin dashboard. This project leverages modern web technologies to deliver a seamless experience for both patients and administrators.

## Features

- **Real-Time Notifications**: Send SMS notifications to patients when appointments are scheduled or canceled using Twilio.
- **Authentication and Registration**: Secure user authentication and registration.
- **Appointment Scheduling**: Easy scheduling and management of appointments.
- **Admin Dashboard**: Admin interface for scheduling and canceling appointments.
- **Dark Mode**: User-friendly dark mode theme.

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/)
  - [shadcn](https://shadcn.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend**:
  - [Appwrite](https://appwrite.io/)
  - [Twilio](https://www.twilio.com/)
  - [Sentry](https://sentry.io/)

## Installation

To get started with MediManage, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/MediManage.git
    cd MediManage
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env.local` file in the root directory and add your environment variables:

    ```env
    NEXT_PUBLIC_APPWRITE_ENDPOINT=<Your Appwrite Endpoint>
    NEXT_PUBLIC_APPWRITE_PROJECT=<Your Appwrite Project ID>
    NEXT_PUBLIC_APPWRITE_COLLECTION=<Your Appwrite Collection ID>
    NEXT_PUBLIC_TWILIO_ACCOUNT_SID=<Your Twilio Account SID>
    NEXT_PUBLIC_TWILIO_AUTH_TOKEN=<Your Twilio Auth Token>
    NEXT_PUBLIC_TWILIO_PHONE_NUMBER=<Your Twilio Phone Number>
    NEXT_PUBLIC_SENTRY_DSN=<Your Sentry DSN>
    ```

4. **Run the development server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Usage

- **User Registration and Login**: Users can register and log in to the system.
- **Appointment Scheduling**: Users can schedule appointments. Admins can view, schedule, and cancel appointments through the dashboard.
- **Real-Time Notifications**: Users receive SMS notifications for their appointments.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or fixes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Contact

For any inquiries or support, please contact [your-email@example.com](mailto:uk351675@gmail.com).

---

Thank you for using MediManage! We hope it enhances your healthcare management experience.
