# Logic Gates Simulator

A web-based logic gates simulator that allows users to visualize and interact with logic gates to understand their operations and combinations better. This project serves as an educational tool and a practical application of fundamental computer science concepts.

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Applied Computer Science Concept](#applied-computer-science-concept)
   - [Logic Gates](#logic-gates)
4. [Algorithms Used](#algorithms-used)
5. [Security Mechanisms](#security-mechanisms)
6. [Development Process and Design Decisions](#development-process-and-design-decisions)
7. [Correctness and Efficiency](#correctness-and-efficiency)
8. [How to Run the Project](#how-to-run-the-project)
9. [Contributors](#contributors)
10. [Acknowledgment](#acknowledgment)

## Project Overview

This project demonstrates the fundamental operations of logic gates and their combinations, offering an intuitive interface to learn and experiment with digital logic. It combines interactive elements with real-time data synchronization for an engaging user experience.

## System Architecture

The system follows a modular architecture comprising:

- **Frontend**:

  - Built with React for an interactive and responsive user interface
  - Utilizes React Flow for drag-and-drop circuit design
  - Implements Tailwind CSS for responsive and customizable styling

- **Backend**:

  - Node.js with Express.js framework for RESTful API endpoints
  - Utilizes Firebase Admin SDK for server-side authentication and database operations

- **Database**:

  - Firebase Realtime Database for storing user data, circuit designs, and collaboration information
  - Implements data validation and security rules at the database level

- **Authentication**:

  - Firebase Authentication for secure user management
  - Supports email/password, and Google sign-in methods

## Applied Computer Science Concept

### Logic Gates

Logic gates are the fundamental building blocks of digital circuits, acting as tiny decision-makers that process binary information. They operate on binary inputs (0 or 1) and produce a binary output based on specific logical rules.  
Key features include:

- Interactive drag-and-drop interface for circuit design
- Real-time circuit simulation and output visualization
- Truth table generation for custom circuits
- User account system for saving and sharing designs

- **AND**: Output is 1 only if all inputs are 1
- **OR**: Output is 1 if at least one input is 1
- **NOT**: Inverts the input (0 becomes 1, 1 becomes 0)
- **XOR**: Output is 1 if inputs are different
- **NAND**: Combination of AND followed by NOT
- **NOR**: Combination of OR followed by NOT

## Algorithms Used

1. **Logical Evaluation Algorithms**:

   - Boolean algebra operations for processing binary inputs (0 and 1).
   - Truth table generation for complex circuits.

2. **Real-time Synchronization**:

   - Event-driven updates using React's state management.
   - Debouncing and throttling techniques to optimize performance during rapid changes.

3. **Performance Optimization**:
   - Memoization techniques to cache repeated calculations.
   - Lazy evaluation strategies for large circuit simulations.
   - Parallel processing for simultaneous evaluation of independent circuit branches.

These algorithms work in concert to provide a robust, efficient, and user-friendly logic gate simulation environment. They enable accurate circuit evaluation, optimize performance for complex designs, and ensure real-time responsiveness for an enhanced user experience.

## Security Mechanisms

- **Firebase Security**:

  - Proper configuration of Firebase Security Rules
  - Least privilege principle applied to database access
  - Regular auditing of Firebase logs

- **Firebase Authentication**:

  - Secure user authentication using Firebase Authentication
  - Supports multiple sign-in methods, including email/password and Google sign-in
  - Implements email verification and password reset functionalities
  - Regular monitoring and logging of authentication events

- **API Security**:

  - HTTPS enforcement for all communications
  - CORS configuration to prevent unauthorized domain access
  - API key management for external service integrations

- **Data Protection**:
  - Encryption of sensitive data at rest and in transit
  - Regular backups with secure off-site storage
  - Implementation of data retention and deletion policies

## Development Process and Design Decisions

- **Frontend Design**:

  - Implemented responsive design principles for cross-device compatibility
  - Conducted user testing to refine UI/UX elements

- **Backend Logic**:

  - Adopted microservices architecture for scalability
  - Implemented caching strategies to optimize frequently accessed data
  - Utilized Docker for consistent development and deployment environments

- **Testing**:

  - **API Testing with Postman**:

    - Utilized Postman for testing RESTful API endpoints.
    - Created comprehensive test collections to cover all API functionalities.
    - Automated testing with Postman to ensure consistent API behavior across different environments.
    - Used environment variables in Postman to test APIs with different configurations.

  - **Incremental Integration Testing**:
    - Adopted an incremental integration approach to test the interaction between different modules.
    - Conducted integration tests after each significant feature implementation to ensure seamless module interaction.
    - Ensured that new code integrations did not break existing functionalities through regression testing.

- **Code Quality**:
  - Enforced consistent code style with ESLint and Prettier
  - Conducted regular code reviews to maintain code quality
  - Implemented error logging and monitoring with Sentry

## Correctness and Efficiency

- **Correctness**:

  - Implemented comprehensive unit tests for all logic gate operations
  - Utilized property-based testing for complex circuit behaviors
  - Conducted manual testing against known truth tables for verification

- **Efficiency**:

  - Optimized React rendering with useCallback hooks
  - Implemented lazy loading for improved initial load times
  - Utilized WebWorkers for offloading complex calculations

- **Performance Monitoring**:
  - Conducted load testing to ensure scalability under high user loads

## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Emjiii/WST_Final_Project.git
   ```
2. **Navigate to Backend**:
   ```bash
   cd backend
   npm start
   ```
3. **Navigate to Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
4. **Navigate to Backend**:

   Local: http://localhost:5173/

## Contributors

The following contributors share efforts and dedication to this project:

- [**Marc Juaren Gamilla**](https://github.com/Emjiii) - Project Managet and Full Stack Developer
- [**Sherivic Mae Dimagculang**](https://github.com/sherivicmae) - Frontend Developer
- [**Maryflor Campued**](https://github.com/maryflorrr) - Backend Developer

The combined expertise and collaboration have been instrumental in bringing this project to life.

## Acknowledgment

We would like to express our sincere gratitude to the following individuals and organizations for their invaluable support and guidance throughout the development of this project:

**Ms. Fatima Marie P. Agdon** for providing essential guidance, constructive feedback, and encouragement during the project development.

**Open-source libraries and frameworks**, including React, React Flow, Node.js, Express, file-saver, htmltoimage, axios, and Firebase, which formed the foundation of our project.

This project is the result of a collaborative effort, and we are deeply grateful to everyone who contributed directly or indirectly to its success.
