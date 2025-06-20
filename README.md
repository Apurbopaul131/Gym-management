# Gym-Management

## 1. Project Name: Gym Class Scheduling and Membership Management System

## 2. Project Overview:

The **Gym Class Scheduling and Membership Management System** is designed to manage gym operations efficiently. The system defines three roles: Admin, Trainer, and Trainee, each with specific permissions. Admins are responsible for creating and managing trainers, scheduling classes, and assigning trainers to these schedules. Each day can have a maximum of five class schedules, with each class lasting two hours. Trainers conduct the classes and can view their assigned class schedules but cannot create new schedules or manage trainee profiles. Trainees can create and manage their own profiles and book class schedules if there is availability, with a maximum of ten trainees per schedule.

## 3. Relation Diagram:

**Image link:** https://drive.google.com/file/d/1UtsQuCLtlEd0-jIFAmLnQePFKSHSXQZX/view?usp=sharing

## 4. Technology Stack:

- Typescript
- Express Js
- Mongoose
- MongoDB
- JWT
- zod

## 5. API Endpoints:

### 1. Create an Trainee

**Endpoint:** `/api/v1/auth/create-trainee`  
**Method:** `POST`  
**Description:** Create an trainee into user collection.

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trinee registered successfully",
  "Data": {
    "_id": "68397dc4ff86cb64ba725c26",
    "name": "Shafiq",
    "email": "shafiq999@gmail.com"
  }
}
```

### 2. Create an Trainer

**Endpoint:** `/api/v1/auth/create-trainer`  
**Method:** `POST`  
**Description:** Create an trainer into user collection by Admin.
**Headers**:

```javascript
Authorization: Bearer <Admin Token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trainer created successfully",
  "Data": {
    "_id": "68397e36ff86cb64ba725c2b",
    "name": "Jisan",
    "email": "jisan333@gmail.com"
  }
}
```

### 3. Login as Trainer,Trainee or Admin

**Endpoint:** `/api/v1/auth/login`  
**Method:** `POST`  
**Description:** Trainer,Trainee or Admin can login using his email and password.

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Login successful",
    "Data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM3ZmFhZDgzYmJmMjAzNjQxODE1NjYiLCJlbWFpbCI6InNvdXJvYjEzNUBnbWFpbC5jb20iLCJyb2xlIjoiVHJhaW5lciIsImlhdCI6MTc0ODU5ODA2OCwiZXhwIjoxNzQ5NDYyMDY4fQ.59S6Np8lqZlry-IbCLeSMk5L6wF-tFkstvlyXZt_4gg"
    }
}{
    "success": true,
    "statusCode": 200,
    "message": "Login successful",
    "Data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM3ZmFhZDgzYmJmMjAzNjQxODE1NjYiLCJlbWFpbCI6InNvdXJvYjEzNUBnbWFpbC5jb20iLCJyb2xlIjoiVHJhaW5lciIsImlhdCI6MTc0ODU5ODA2OCwiZXhwIjoxNzQ5NDYyMDY4fQ.59S6Np8lqZlry-IbCLeSMk5L6wF-tFkstvlyXZt_4gg"
    }
}
```

### 4. Create Class Schedule

**Endpoint:** `/api/v1/create-schedule`  
**Method:** `POST`  
**Description:** Create an class schedule by admin.
**Headers**:

```javascript
Authorization: Bearer <Admin Token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule class Assigned successfully",
  "Data": {
    "_id": "68397c0dff86cb64ba725c16",
    "classTitle": "Evening Strength Training",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "12:00",
    "endTime": "14:00",
    "trainer": {
      "_id": "6837faad83bbf20364181566",
      "name": "Sourob",
      "email": "sourob135@gmail.com"
    },
    "availavality": 10
  }
}
```

### 5. Book Class Schedule

**Endpoint:** `/api/v1/book-schedule/:id`  
**Method:** `PATCH`  
**Description:** Book an class schedule by Trainee.

**URL Params:** `id`(schedule mongoose ObjectId) - Required
**Headers**:

```javascript
Authorization: Bearer <Trainee Token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule booked successfully",
  "Data": {
    "_id": "68397c0dff86cb64ba725c16",
    "classTitle": "Evening Strength Training",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "12:00",
    "endTime": "14:00",
    "trainer": "6837faad83bbf20364181566",
    "trainees": ["683892f545d221435e56908e"],
    "availavality": 9,
    "createdAt": "2025-05-30T09:36:13.940Z",
    "updatedAt": "2025-05-30T09:38:57.868Z",
    "__v": 0
  }
}
```

### 6. Cancle Booking of Schedule Class

**Endpoint:** `/api/v1/cancel-schedule/:id`  
**Method:** `DELETE`  
**Description:** Cancle booked class class schedule by Trainee.

**URL Params:** `id`(schedule mongoose ObjectId) - Required
**Headers**:

```javascript
Authorization: Bearer <Trainee Token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule cancle successfully",
  "Data": {
    "_id": "6838032649d4931932c96617",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "10:00",
    "endTime": "12:00",
    "trainer": "6837faad83bbf20364181566",
    "trainees": [],
    "classTitle": "Morning Strength Training 3",
    "availavality": 10,
    "createdAt": "2025-05-29T06:48:06.211Z",
    "updatedAt": "2025-05-30T09:32:07.154Z",
    "__v": 0
  }
}
```

### 7. Retrive Trainer Schedule

**Endpoint:** `/api/v1/trainer-schedule`  
**Method:** `GET`  
**Description:** Retrives availavle Trainer schedule by Trainer.

**Headers**:

```javascript
Authorization: Bearer <Trainer Token>
```

**Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trainer Schedule retrived successfully",
  "Data": [
    {
      "_id": "6838032649d4931932c96617",
      "date": "2025-06-01T00:00:00.000Z",
      "startTime": "10:00",
      "endTime": "12:00",
      "trainer": {
        "_id": "6837faad83bbf20364181566",
        "name": "Sourob",
        "email": "sourob135@gmail.com"
      },
      "trainees": [],
      "availavality": 10
    },
    {
      "_id": "68397c0dff86cb64ba725c16",
      "date": "2025-06-01T00:00:00.000Z",
      "startTime": "12:00",
      "endTime": "14:00",
      "trainer": {
        "_id": "6837faad83bbf20364181566",
        "name": "Sourob",
        "email": "sourob135@gmail.com"
      },
      "trainees": [
        {
          "_id": "683892f545d221435e56908e",
          "name": "Shimul Das",
          "email": "shimul99@gmail.com"
        }
      ],
      "availavality": 9
    }
  ]
}
```

## 6. Database Schema:

```javascript
// User Schema including model
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: {
        values: role,
        message: '{VALUE} is not supported must be Admin | Trainer | Trainee',
      },
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const User = model<TUser, UserModel>('User', userSchema);
```

```javascript
// Class Schedule Schema including model
const classScheduleSchema = new Schema<IClassSchedule, ScheduleModel>(
  {
    classTitle: {
      type: String,
      required: [true, 'Class title is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Trainer is required'],
    },
    trainees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ], // Embedding booked trainees for ten trainees each sechedule(less data)

    availavality: {
      type: Number,
      required: [true, 'Availability is required'],
    },
  },
  {
    timestamps: true,
  },
);
export const ClassSchedule = model<IClassSchedule, ScheduleModel>(
  'ClassSchedule',
  classScheduleSchema,
);
```

## 7. Admin Credentials:

```javascript
{
    "email": "admin121@gmail.com",
    "password": "securepasswordss"
}
```

## 8. Instructions to Run Locally

### 1. Must be ensure the following prerequisites are already installed in your computer

- Node.js (v16 or later)
- npm (comes with Node.js) or yarn
- MongoDB (local or cloud-based)

### 2. Clone the Repository

Run the following command in your terminal to clone the repository:

```javascript
git clone https://github.com/Apurbopaul131/Gym-management.git
```

### 3. Navigate to the Project Directory

Run the following command to by adding expected directory name:

```javascript
cd your-repo-name
```

### 4. Install Dependencies

Install the required dependencies using npm or yarn:

```javascript
npm install
// or
yarn install
```

### 5. Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables to configure your application:

```javascript
//.env
PORT:3000
DATABASE_URL:
JWT_ACCESS_SECRET =
JWT_ACCESS_TOKEN_EXPIRES_IN =
JWT_REFRESH_SECRET =
JWT_REFRESH_TOKEN_EXPIRES_IN =
BCRYPT_SALT_ROUNDS =
```

### 6. Start MongoDB

Make sure your MongoDB instance is running:

- If running locally, start MongoDB with:

```javascript
mongod;
```

- If using a cloud-based database like MongoDB Atlas ensure your connection string in .env is correctly configured.

### 7. Run the Project

```javascript
//development mode
npm run start:dev
//production mode
npm run start:prod
```

### 8. Access the API

Once the server is running, you can access the API at:

```javascript
http://localhost:3000
```

## 9. Live Hosting Link:

https://gym-management-app-pi.vercel.app

## 10. Postman documentation:

https://documenter.getpostman.com/view/18942348/2sB2qfAKCd

## 11. Test Instruction

**Admin credentials:**

```javascript
{
    "email": "admin121@gmail.com",
    "password": "securepasswordss"
}
```

## 12. Manual API Testing with Postman

### 1. Setting Up Postman

- Open Postman
- Create a new collection named something like `Gym Management System`
- Create individual requests for each feature under that collection.

### 2. Test `Create Trainee` API

**Method:** `POST`

**URL:** `https://gym-management-app-pi.vercel.app/api/v1/auth/create-trainee`

**Body (raw JSON)**

```json
{
  "name": "Shafiq",
  "email": "shafiq999@gmail.com",
  "password": "securepasswordss",
  "role": "Trainee"
}
```

**Expected output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trinee registered successfully",
  "Data": {
    "_id": "68397dc4ff86cb64ba725c26",
    "name": "Shafiq",
    "email": "shafiq999@gmail.com"
  }
}
```

**Actual Output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trinee registered successfully",
  "Data": {
    "_id": "68397dc4ff86cb64ba725c26",
    "name": "Shafiq",
    "email": "shafiq999@gmail.com"
  }
}
```

**Test Result:** `passed`

### 3. Test `Create Trainer` API

**Method:** `POST`

**URL:** `https://gym-management-app-pi.vercel.app/api/v1/auth/create-trainer`

**Headers:**

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM3MmYwOWE5ZTE1MjdmYTQ1MTZiMmMiLCJlbWFpbCI6ImFkbWluMTIxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc0ODUyMzY4NywiZXhwIjoxNzQ5Mzg3Njg3fQ.YZ2dT9aRk4oeEF51DoYhLkNh34BRm-Ky-gPWRZpDxQA

```

**Body (raw JSON)**

```json
{
  "name": "Jisan",
  "email": "jisan333@gmail.com",
  "password": "securepasswordss",
  "role": "Trainer"
}
```

**Expected output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trainer created successfully",
  "Data": {
    "_id": "68397e36ff86cb64ba725c2b",
    "name": "Jisan",
    "email": "jisan333@gmail.com"
  }
}
```

**Actual Output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trainer created successfully",
  "Data": {
    "_id": "68397e36ff86cb64ba725c2b",
    "name": "Jisan",
    "email": "jisan333@gmail.com"
  }
}
```

**Test Result:** `passed`

### 4. Test `Login User` API with admin credentails

**Method:** `POST`

**URL:** `https://gym-management-app-pi.vercel.app/api/v1/auth/login`

**Body (raw JSON)**

```json
{
  "email": "admin121@gmail.com",
  "password": "securepasswordss"
}
```

**Expected output:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "Data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM3MmYwOWE5ZTE1MjdmYTQ1MTZiMmMiLCJlbWFpbCI6ImFkbWluMTIxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc0ODU5OTExNiwiZXhwIjoxNzQ5NDYzMTE2fQ.PmKwFaCkzk1KTkzEa6MXHEwXBY4HTViWpcbAWO0KshE"
  }
}
```

**Actual Output:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "Data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM3MmYwOWE5ZTE1MjdmYTQ1MTZiMmMiLCJlbWFpbCI6ImFkbWluMTIxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc0ODU5OTExNiwiZXhwIjoxNzQ5NDYzMTE2fQ.PmKwFaCkzk1KTkzEa6MXHEwXBY4HTViWpcbAWO0KshE"
  }
}
```

**Test Result:** `passed`

### 4. Test `Create Class Schedule` API

**Method:** `POST`

**URL:** `https://gym-management-app-pi.vercel.app/api/v1/create-schedule`

**Headers:**

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM3MmYwOWE5ZTE1MjdmYTQ1MTZiMmMiLCJlbWFpbCI6ImRoYWthMTIxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc0ODQ5ODQ3NCwiZXhwIjoxNzQ5MzYyNDc0fQ.lZxiNkSNQxqeUor920KUD-QFiRf1UC5gr3uDV1HhMrw
```

**Body (raw JSON)**

```json
{
  "classTitle": "Evening Strength Training",
  "date": "2025-06-01",
  "startTime": "12:00",
  "trainer": "6837faad83bbf20364181566"
}
```

**Expected output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule class Assigned successfully",
  "Data": {
    "_id": "68397c0dff86cb64ba725c16",
    "classTitle": "Evening Strength Training",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "12:00",
    "endTime": "14:00",
    "trainer": {
      "_id": "6837faad83bbf20364181566",
      "name": "Sourob",
      "email": "sourob135@gmail.com"
    },
    "availavality": 10
  }
}
```

**Actual Output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule class Assigned successfully",
  "Data": {
    "_id": "68397c0dff86cb64ba725c16",
    "classTitle": "Evening Strength Training",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "12:00",
    "endTime": "14:00",
    "trainer": {
      "_id": "6837faad83bbf20364181566",
      "name": "Sourob",
      "email": "sourob135@gmail.com"
    },
    "availavality": 10
  }
}
```

**Test Result:** `passed`

### 5. Test `Book Class Schedule` API

**Method:** `PATCH`

**URL:** `https://gym-management-app-pi.vercel.app/api/v1/book-schedule/68397c0dff86cb64ba725c16`

**Headers:**

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM4OTJmNTQ1ZDIyMTQzNWU1NjkwOGUiLCJlbWFpbCI6InNoaW11bDk5QGdtYWlsLmNvbSIsInJvbGUiOiJUcmFpbmVlIiwiaWF0IjoxNzQ4NTk3ODg3LCJleHAiOjE3NDk0NjE4ODd9.h6vofBsp-9vmbFKKox7GxBMde-_jFdebvv4sk5eCTp0

```

**Expected output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule booked successfully",
  "Data": {
    "_id": "68397c0dff86cb64ba725c16",
    "classTitle": "Evening Strength Training",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "12:00",
    "endTime": "14:00",
    "trainer": "6837faad83bbf20364181566",
    "trainees": ["683892f545d221435e56908e"],
    "availavality": 9,
    "createdAt": "2025-05-30T09:36:13.940Z",
    "updatedAt": "2025-05-30T09:38:57.868Z",
    "__v": 0
  }
}
```

**Actual Output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule booked successfully",
  "Data": {
    "_id": "68397c0dff86cb64ba725c16",
    "classTitle": "Evening Strength Training",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "12:00",
    "endTime": "14:00",
    "trainer": "6837faad83bbf20364181566",
    "trainees": ["683892f545d221435e56908e"],
    "availavality": 9,
    "createdAt": "2025-05-30T09:36:13.940Z",
    "updatedAt": "2025-05-30T09:38:57.868Z",
    "__v": 0
  }
}
```

**Test Result:** `passed`

### 6. Test `Cancle Booking of Schedule Class` API

**Method:** `DELETE`

**URL:** `https://gym-management-app-pi.vercel.app/api/v1/cancel-schedule/6838032649d4931932c96617`

**Headers:**

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM4Mzc0MTZlOGU1OWRlODcwY2ZmMDciLCJlbWFpbCI6ImFrYXNoMzNAZ21haWwuY29tIiwicm9sZSI6IlRyYWluZWUiLCJpYXQiOjE3NDg1OTc0NzIsImV4cCI6MTc0OTQ2MTQ3Mn0.r8dPHPsRQqNLTGbxkZcKu_lPQ6JzVZ_nbeaE5bN57yQ

```

**Expected output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule cancle successfully",
  "Data": {
    "_id": "6838032649d4931932c96617",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "10:00",
    "endTime": "12:00",
    "trainer": "6837faad83bbf20364181566",
    "trainees": [],
    "classTitle": "Morning Strength Training 3",
    "availavality": 10,
    "createdAt": "2025-05-29T06:48:06.211Z",
    "updatedAt": "2025-05-30T09:32:07.154Z",
    "__v": 0
  }
}
```

**Actual Output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Schedule cancle successfully",
  "Data": {
    "_id": "6838032649d4931932c96617",
    "date": "2025-06-01T00:00:00.000Z",
    "startTime": "10:00",
    "endTime": "12:00",
    "trainer": "6837faad83bbf20364181566",
    "trainees": [],
    "classTitle": "Morning Strength Training 3",
    "availavality": 10,
    "createdAt": "2025-05-29T06:48:06.211Z",
    "updatedAt": "2025-05-30T09:32:07.154Z",
    "__v": 0
  }
}
```

**Test Result:** `passed`

### 6. Test `Retrive Trainer Schedule` API

**Method:** `GET`

**URL:** `https://gym-management-app-pi.vercel.app/api/v1/trainer-schedule`

**Headers:**

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM3ZmFhZDgzYmJmMjAzNjQxODE1NjYiLCJlbWFpbCI6InNvdXJvYjEzNUBnbWFpbC5jb20iLCJyb2xlIjoiVHJhaW5lciIsImlhdCI6MTc0ODU5ODA2OCwiZXhwIjoxNzQ5NDYyMDY4fQ.59S6Np8lqZlry-IbCLeSMk5L6wF-tFkstvlyXZt_4gg

```

**Expected output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trainer Schedule retrived successfully",
  "Data": [
    {
      "_id": "6838032649d4931932c96617",
      "date": "2025-06-01T00:00:00.000Z",
      "startTime": "10:00",
      "endTime": "12:00",
      "trainer": {
        "_id": "6837faad83bbf20364181566",
        "name": "Sourob",
        "email": "sourob135@gmail.com"
      },
      "trainees": [],
      "availavality": 10
    },
    {
      "_id": "68397c0dff86cb64ba725c16",
      "date": "2025-06-01T00:00:00.000Z",
      "startTime": "12:00",
      "endTime": "14:00",
      "trainer": {
        "_id": "6837faad83bbf20364181566",
        "name": "Sourob",
        "email": "sourob135@gmail.com"
      },
      "trainees": [
        {
          "_id": "683892f545d221435e56908e",
          "name": "Shimul Das",
          "email": "shimul99@gmail.com"
        }
      ],
      "availavality": 9
    }
  ]
}
```

**Actual Output:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Trainer Schedule retrived successfully",
  "Data": [
    {
      "_id": "6838032649d4931932c96617",
      "date": "2025-06-01T00:00:00.000Z",
      "startTime": "10:00",
      "endTime": "12:00",
      "trainer": {
        "_id": "6837faad83bbf20364181566",
        "name": "Sourob",
        "email": "sourob135@gmail.com"
      },
      "trainees": [],
      "availavality": 10
    },
    {
      "_id": "68397c0dff86cb64ba725c16",
      "date": "2025-06-01T00:00:00.000Z",
      "startTime": "12:00",
      "endTime": "14:00",
      "trainer": {
        "_id": "6837faad83bbf20364181566",
        "name": "Sourob",
        "email": "sourob135@gmail.com"
      },
      "trainees": [
        {
          "_id": "683892f545d221435e56908e",
          "name": "Shimul Das",
          "email": "shimul99@gmail.com"
        }
      ],
      "availavality": 9
    }
  ]
}
```

**Test Result:** `passed`
