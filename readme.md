# Verification Service API

This repository contains the source code for the Verification Service API, designed to verify and approve that a doctor is .. really a doctor ?? this could (and would) be useful for applications that require verifying the identity of a doctor before giving him access to doctor specific services. This microservice can be adapted for other usecases that are close to our given scenario. This service is built with Node.js and Express, leveraging a PostgreSQL database.

## Main Features

- **Submit doctor documents for verification**: A doctor can request his documents to be verified.
- **Verify Submissions**: Allows users to verify submissions based on submission ID.
- **Retrieve Verification Status**: Users can check the verification status by doctor ID.
- **Update Verification**: Supports updating the status of existing verifications.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or newer)
- npm (Node Package Manager)
- PostgreSQL Database

## Installation

To install Verification Service API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedJguirim/DoctorVerification_Microservice.git
   ```
2. Navigate to the project directory:
   ```bash
   cd DoctorVerification_Microservice
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory of the project and update it with your environment-specific settings:

```plaintext
PORT=3600
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/verifications?schema=public"
```

**Note**: Replace `yourpassword` with your actual PostgreSQL database password.

## Running the Application

To run the application locally, execute:

```bash
npm run dev
```

This will start the server on `http://localhost:3600`.

## API Documentation

After running the server, access the API documentation at:

```plaintext
http://localhost:3600/api-docs
```

This documentation provides detailed information about the API endpoints, including how to use them.

## Contributing

Contributions to the Verification Service API are welcome. Please ensure that your contributions adhere to the following guidelines:

- Follow the existing code style.
- Write clear, concise commit messages.

For substantial changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions, please contact us at:

- GitHub: [@AhmedJguirim](https://github.com/AhmedJguirim)
- Email: jguirimahmed111@gmail.com

## Future considerations

- File encryption for security
- Unit tests for the controllers
- Containerization and deployment
