# 🚀 **Logic Gates Simulator**

A web-based logic gates simulator that allows users to visualize and interact with logic gates to understand their operations and combinations better. This project serves as an educational tool and a practical application of fundamental computer science concepts.

##  📚 **Table of Contents**

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Applied Computer Science Concept](#applied-computer-science-concept)
4. [Algorithms Used](#algorithms-used)
5. [Security Mechanisms](#security-mechanisms)
6. [Development Process and Design Decisions](#development-process-and-design-decisions)
7. [Correctness and Efficiency](#correctness-and-efficiency)
8. [How to Run the Project](#how-to-run-the-project)
9. [Contributors](#contributors)
10. [Acknowledgment](#acknowledgment)

---

## 🎯 **Project Overview**

This project demonstrates the fundamental operations of logic gates and their combinations, offering an intuitive interface to learn and experiment with digital logic. It combines interactive elements with real-time data synchronization for an engaging user experience.

---

## 🏗️ **System Architecture**

The system follows a modular architecture comprising:

- **🖥️ Frontend**:
  
  - 🚀 Built with **React** for an interactive and responsive user interface
  - 🧩 Uses **React Flow** for drag-and-drop circuit design
  - 🎨 Implements **Tailwind CSS** for responsive and customizable styling

- **🛠️ Backend**:
  
  - ⚙️ **Node.js** with **Express.js** framework for RESTful API endpoints
  - 🔑 Utilizes **Firebase Admin SDK** for server-side authentication and database operations

- **💾 Database**:
  - 🔥 **Firebase Realtime Database** for storing user data, circuit designs, and collaboration information
  - 🛡️ Implements data validation and security rules at the database level


- **🔐 Authentication**:
  - ✅ **Firebase Authentication** for secure user management
  - 📧 Supports **email/password** and **Google sign-in** methods
 
---

## 🧠 **Applied Computer Science Concept**

### 🔌 Logic Gates

Logic gates are the fundamental building blocks of digital circuits, acting as tiny decision-makers that process binary information. They operate on binary inputs (0 or 1) and produce a binary output based on specific logical rules.

### ✨ **Key Features**:

- 🖱️ **Interactive drag-and-drop interface for circuit design**

  ![image](https://github.com/user-attachments/assets/4c163176-8829-44ae-8f62-5a15887c2162)

- ⚡ **Real-time circuit simulation and output visualization**

  ![image](https://github.com/user-attachments/assets/963638bb-6036-42c4-9a59-8222ee67c56b)

- 📊 **Truth table generation for custom circuits**

  ![image](https://github.com/user-attachments/assets/51d02907-6377-4411-9eb1-a0a39c9b61bb)

- 💾 **User account system for saving and sharing designs**

  ![image](https://github.com/user-attachments/assets/b15be081-54a1-4f96-9b31-6c061daf02b3)

### Gates

Gate, Inputs and Outputs Selection Section:

![image](https://github.com/user-attachments/assets/f9b3ad4b-eb4e-4fa2-9bd1-bd31c32d7606)

- **AND**: Output is 1 only if all inputs are 1

  ![image](https://github.com/user-attachments/assets/210de2e2-089f-4f3e-88da-cff1a47497da)

- **OR**: Output is 1 if at least one input is 1

  ![image](https://github.com/user-attachments/assets/59f05c2d-89f2-47ae-a941-6bcf315460aa)

- **NOT**: Inverts the input (0 becomes 1, 1 becomes 0)

  ![image](https://github.com/user-attachments/assets/8616d46c-6b8c-4a96-950e-38ef70dd0f47)

- **XOR**: Output is 1 if inputs are different

  ![image](https://github.com/user-attachments/assets/c8e7407e-68da-4c9d-b49f-c15e4f9bce7b)

- **NAND**: Combination of AND followed by NOT
  
  ![image](https://github.com/user-attachments/assets/d322fc61-581b-4a32-afec-3cdfbfa3d0b3)

- **NOR**: Combination of OR followed by NOT

  ![image](https://github.com/user-attachments/assets/6e8bc3db-8c20-4746-bd62-d4becf4527c0)

---

## 🔢 **Algorithms Used**

1. **🧮 Logical Evaluation Algorithms**:

   - Boolean algebra operations for processing binary inputs (0 and 1).
   - Truth table generation for complex circuits.

2. **🔄 Real-time Synchronization**:

   - ⚛️ Event-driven updates using React's state management.
   - 🕒 Debouncing and throttling techniques to optimize performance during rapid changes.

3. **⚙️ Performance Optimization**:
   
   - 🧠 Memoization techniques to cache repeated calculations.
   - 💤 Lazy evaluation strategies for large circuit simulations.
   - 🚀 Parallel processing for simultaneous evaluation of independent circuit branches.

These algorithms work in concert to provide a robust, efficient, and user-friendly logic gate simulation environment. They enable accurate circuit evaluation, optimize performance for complex designs, and ensure real-time responsiveness for an enhanced user experience.

---

## 🔒 **Security Mechanisms**

- **🛡️ Firebase Security**:

  - 🔑 Proper configuration of Firebase Security Rules
  - 📊 Least privilege principle applied to database access

- **🔐 Firebase Authentication**:
  
  - ✅ Secure user sign-ins with Google/email
  - 📧 Email verification and password reset functionalities

- **🛠️ API Security**:
  
  - 🔗 HTTPS enforced for all communications
  - 🚫 CORS configuration to prevent unauthorized access
 
---

## 🛠️ **Development Process and Design Decisions**

- **🎨 Frontend Design**:

  - 📱 Implemented responsive design principles for cross-device compatibility
  - 🧪 Conducted user testing to refine UI/UX elements


- **⚙️ Backend Logic**:
  
  - 🧩 Microservices for scalability
  - 🐳 **Docker** for deployment consistency

- **🧪 Testing**:
  
  - 🔎 **API Testing** with **Postman**
  - 🔄 Incremental integration testing for seamless module interactions
  - ✅ Comprehensive regression testing for stability

- **✨ Code Quality**:
  
  - 📏 Enforced consistent style with ESLint and Prettier
  - 🔍 Error logging and monitoring with **Sentry**
 
---

## ✅ **Correctness and Efficiency**

- **🧪 Correctness**:
  
  - Comprehensive **unit tests** for all gate operations.
  - 🧮 Manual verification using known truth tables.

- **🚀 Efficiency**:

  - Optimized React rendering with useCallback hooks
  - 🧠 Implemented lazy loading for improved initial load times

- **📊 Performance Monitoring**:
  - Conducted load testing to ensure scalability under high user loads

---

## 🛠️ **How to Run the Project**

1. **📥 Clone the Repository**:
   ```bash
   git clone https://github.com/Emjiii/WST_Final_Project.git
   ```
2. **📂 Navigate to Backend**:
   ```bash
   cd backend
   npm start
   ```
3. **🖥️ Navigate to Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
4. **🌐 Open in browser**:

   Local: http://localhost:5173/

---

##👥 Contributors

The following contributors share efforts and dedication to this project:

- 🚀 [**Marc Juaren Gamilla**](https://github.com/Emjiii) - Project Managet and Full Stack Developer
- 🎨 [**Sherivic Mae Dimagculang**](https://github.com/sherivicmae) - Frontend Developer
- 🛠️ [**Maryflor Campued**](https://github.com/maryflorrr) - Backend Developer

The combined expertise and collaboration have been instrumental in bringing this project to life.

---

##🙏 Acknowledgment

We would like to express our sincere gratitude to the following individuals and organizations for their invaluable support and guidance throughout the development of this project:

- **🎓 Ms. Fatima Marie P. Agdon** for providing essential guidance, constructive feedback, and encouragement during the project development.

- **🛠️ Open-source libraries and frameworks**, including React, React Flow, Node.js, Express, File-saver, Htmltoimage, Axios, Tailwond and Firebase, which formed the foundation of our project.

✨ This project is the result of a collaborative effort, and we are deeply grateful to everyone who contributed directly or indirectly to its success.Thank you for exploring **Logic Gates Simulator**! 🚀
