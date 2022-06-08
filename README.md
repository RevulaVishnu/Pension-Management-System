# Pension Management System
The purpose of this software is to automate a portion of the Pension detail provisioning. This project covers pensioner detail provision, calculate provision.

## The application has the following services:

1. Eureka Server
2. Authorization Service
3. Pensioner Detail Service
5. Process Process Service
6. Pension Management Portal (Front-end in Angular)

## 1. Eureka Server
The Eureka Server is responsible for registering all the microservices together so that they can communicate with each other with the help of their application names instead of their IP address which may be dynamic in nature.

## 2. Authorization Service
This service is responsible to provide login access to the application and provide security to it with the help of stateless authentication using JWT Tokens.

  ### This service provides two controller END-POINTS:

  1. Open your spring boot application and run the service.
  2. Open your browser and head to this URL - http://localhost:8081/swagger-ui.html#/ this will redirect you to Swagger UI where you can test the service.
  3. Select the authorization controller header
  4. **Login functionality**
  * Select **login** POST method and click try it out
  * Then enter these **correct** username and password credentials as follows:

  ```
  {
    "username": "admin1",
    "password": "password1"
  }
  ```

  * Then hit execute and you will see a JWT Token generated. Copy this token to be used in the next step.
  ```
  eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTMyMjYzNTksInN1YiI6ImFkbWluMSIsImV4cCI6MTY1MzIyODE1OX0.vYD7gjXBzvod10jard3eV4WMNq_2plx3Ej6kB0F4UHU
  ```
  * For these **incorrect** credentials:  

  ```
  {
    "username": "admin123",
    "password": "wrongpassword"
  }
  ``` 
  
  **Response**

  ```
  {
      "message": "Incorrect Username or Password",
      "timestamp": "2022-05-22T16:41:43.3300894",
      "fieldErrors": [
          "Incorrect Username or Password"
      ]
  }
  ```

5. **Validation functionality**
* Select **validation** POST method and click try it out
* Then enter previously generated **valid** Token that you had copied into the Authorization header.
* Then hit execute and you would see `true` in the response body.
* If the token in **invalid** the application throws an appropriate error response related to either `Token expired`, `Token malformed` or `Token signature incorrect`.

## 3. Pensioner Detail Service
  <p> This microservice is responsible for Provides information about the registered pensioner detail i.e., 
    Pensioner name, PAN, salary, allowance, pension type - self or family , bank name, bank account number, bank type – private or public </p>
  
  **Steps and Action**
  
  * This Microservice is to fetch the pensioner detail by the Aadhaar number.
  * Flat file(CSV file with pre-defined data) should be created as part of the Microservice. 
  * This file has to contain data for 20 Pensioners. This has to be read and loaded into List for all the operations of the microservice.


**1. Pensioner Detail Service functionality**

* Select **/pensionerDetailByAadhaar**  

  **Endpoint**
  ```
  http://localhost:8083/pensionerDetailByAadhaar/123456789012
  ```

  **Valid Input**

  ```
  {
      "aadhaarNumber":"123456789012"
  }
  ```
  <p>If details are valid, Pensioner Details are returned</p>

  ```
  {
    "aadhar": "123456789011",
    "name": "Vishnu",
    "dateOfBirth": "1999-09-14T18:30:00.000+00:00",
    "pan": "BRRPPV3218K",
    "salary": 32000,
    "allowance": 10000,
    "pensionType": "self",
    "accountNumber": 12345678,
    "bank": {
      "bankName": "SBI",
      "accountNumber": 12345678,
      "bankType": "private"
    }
  }
  ```
  **Invalid Input**
  ```
  {
      "aadhaarNumber":"1234567890"
  }
  ```

  <p>If request format is invalid then following error response is sent back</p>

  ```
  {
      "message": "Aadhaar Number Not Found",
      "timestamp": "2022-05-22T19:34:04.9760705",
      "fieldErrors": [
          "Aadhaar Number Not Found"
      ]
  }
  ```
  <p>If aadhaar number does not exist or there is some internal server error then it will send an following error resonse</p>

  ```
  {
      "message": "Invalid Request",
      "timestamp": "2021-07-30T19:45:18.3272518"
  }
  ```

## 4. Process Pension Service
      
1. **Process Pension functionality**
* Select **/processPension** POST method and click try it out
* Status code of 10 for valid input and if the input has been processed by the disbursement microservice
* Status code of 21 for invalid input where the service tries to send a request 2 more times to the disbursement service.

    **Endpoint**
    
      url- http://localhost:8083/processPension 

  **Valid Input**

  ```
  {
      "aadhaarNumber":"123456789012"
  }
  ```
  <p>If details are valid, pension amount is calculated and returned </p>

  ```
  {
      "name": "Vishnu",
      "dateOfBirth": "14/09/1999",
      "pan": "BRPPV3218K",
      "pensionType": "self",
      "pensionAmount": 31050.0
  }
  ```
  **Invalid Input**
  ```
  {
      "aadhaarNumber":"1234567890"
  }
  ```

  <p>If request format is invalid then following error response is sent back</p>

  ```
  {
      "message": "Invalid Details",
      "timestamp": "2022-05-22T19:13:44.8064096",
      "fieldErrors": [
          "Aadhaar Number is in invalid format"
      ]
  }

  ```
  <p>If aadhaar number does not exist or there is some internal server error then it will send an following error resonse</p>

  ```
  {
      "message": "Invalid Request",
      "timestamp": "2021-07-30T19:45:18.3272518"
  }

  ```

## 6. Pension Management Portal

  This is the front end application written using Angular Framework.

  **Installing Dependencies**

  ```
  Run `npm install` to download dependencies to run the project. The dependencies will be downloaded in the `node_modules/` directory.
  ```
  **Development server**
  ```
  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
  ```
  **Code scaffolding**
  ```
  Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
  ```
  **Build**
  ```
  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
  ```
  **Running unit tests**
  ```
  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
  ```
  **Running end-to-end tests**
  ```
  Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.```