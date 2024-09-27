# TA Management System for IIT Bhilai

# For try Purpose 
For usage Case try following credentials:
Student: 
ID: 12140960
Password: Kunal1306@
Faculty: 
ID: 12140970
Password: Lalit1306@

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

## Usage

1. **Register as a TA or Professor**: Visit the registration page and create an account.
2. **Fill in TA Details**: TAs can enter their professional information after registering.
3. **Create a Course**: Professors can create courses and specify the required skills for TAs.
4. **Allocate TAs**: Use the algorithm to generate a ranked list and allocate TAs to courses.
5. **Manage Leave Requests**: TAs can apply for leaves, and faculty can manage these requests.

## Contribution

Contributions to the project are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.


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
Set up environment variables.

3. Create a `.env` file with the following content in the `backend` folder. Replace the placeholder values with your actual credentials and settings:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.gyxdnnb.mongodb.net
  ACCESS_TOKEN_SECRET=<your_access_token_secret>
  ACCESS_TOKEN_EXPIRY=1d
  REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
  REFRESH_TOKEN_EXPIRY=7d
  CORS_ORIGIN=*
  PORT=8000


