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
