# TA Management System for IIT Bhilai

## Overview

The TA Management System is a web-based platform developed to streamline the Teaching Assistant (TA) allocation process at IIT Bhilai. The system addresses the inefficiencies and challenges faced by the institute in matching TAs with courses by providing an automated and efficient solution.

## Project Motivation

At IIT Bhilai, the TA allocation process for courses was manual and time-consuming, often leading to mismatches between TAs and course requirements. To solve this problem, the TA Management System was developed, enabling a more effective and organized way to manage TA allocations, leave requests, and course assignments.

## Features

### TA Registration
- TAs can create profiles by registering on the platform.
- Profile details include bio, gender, educational background, experience, skill sets, and social links (GitHub, LinkedIn, resume, Twitter, Kaggle, etc.).

### Course Creation
- Professors can register and create new courses, specifying course details and required TA skills.
- An algorithm generates a ranked list of suitable TAs based on the skills required for the course.

### TA Allocation
- Professors can view the ranked list of TAs and approve TAs that are not yet allocated to other courses.
- Approved TAs are assigned to the course, and their profiles are updated accordingly.

### Leave Management
- TAs can apply for leaves directly through the platform and track their leave history.
- Faculty can view and manage leave requests, with options to approve or reject them.

### Faculty Dashboard
- Faculty members can manage courses, view TA assignments, and monitor leave requests in a streamlined dashboard.

## Technologies Used

- **Frontend**: 
  - React.js
  - Redux Toolkit
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - GraphQL

## Project Structure

The project is divided into two main folders:

- **Frontend**: Contains all the client-side code, including React components, state management, and styling.
- **Backend**: Contains server-side code, including Express routes, GraphQL schema, and MongoDB models.

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB

### Frontend Setup

1. Navigate to the `frontend` folder.
2. Install the dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start
   
### Backend Setup

1. Navigate to the `backend` folder.
   ```bash
   cd backend
2. Install the dependencies:
3. Set up environment variables (e.g., database connection string, secret keys).
- Create a `.env` file in the `backend` folder and add the necessary environment variables:

## Usage

1. **Register as a TA or Professor**: Visit the registration page and create an account.
2. **Fill in TA Details**: TAs can fill in their professional information after registering.
3. **Create a Course**: Professors can create courses and specify the required skills for TAs.
4. **Allocate TAs**: Use the algorithm to generate a ranked list and allocate TAs to courses.
5. **Manage Leave Requests**: TAs can apply for leaves, and faculty can manage these requests.

## Contribution

Contributions to the project are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.

