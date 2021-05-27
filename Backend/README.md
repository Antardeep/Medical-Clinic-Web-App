# REVATURE MEDICAL CLINIC

Revature medical clinic helps in maintaining social distance during COVID-19 and allow you to communicate with approved medical doctors for advices and get prescription. It also permit patients to register and create requests with a specific doctor and view history of their requests.Doctors can view requests under their name and respond to a patient by prescribing a medication or letting them know to visit doctor in person. All the users can communicate with each other using forum pages.

## Technologies Used

### Front End
- React JS: version ^17.0.1
- Material UI: version ^4.11.2
- TypeScript: version ^^4.1.3
- node-sass: version ^4.14.1
- AJAX - axios: version ^0.21.1
- Git
- Visual Studio Code

### Back End
- Java: version 1.8
- Spring Boot: version ^2.4.1
- Hibernate: version 5.1.3.Final
- Swagger: version ^2.9.2
- SQL / PostgreSQL: version 42.2.18
- Maven: version 1.8
- Tomcat: version 9.0
- Eclipse: Spring Tool Suit 4

### Deployment
- AWS EC2
- AWS RDS
- Docker

## Features

### Admin: 
1. Login to existing account.
2. View list of all doctor accounts - Requested / Approved / Rejected .
3. View information about doctors.
4. Can Approve or Reject a doctor's account. 
5. Logout

### Patient
1. Register for a new account.
2. Login to existing account. 
3. Create a request with a specific approved doctor for advice or perscription by describing problem.
4. View list of all past requests - Responded / Pending.
5. Can create a new Topic in forum page.
6. Can reply to other Forum topics.
5. Logout

### Doctor
1. Register for a new account.
2. Login only if the account is approved by admin. 
3. View list of all new requests by patients.
4. View list of previous requests that has been responed.
5. Respond to patient's requests either by providing advice and perscription or asking to visit in person.
5. Can create a new Topic in forum page.
6. Can reply to other Forum topics.
5. Logout

## Getting Started

### Back End 
-> Git clone https://github.com/2011Canada/Project2-Team2-BackEnd.git
-> Open Spring Tool Suit 4 - Eclipse or IntelliJ\
-> import back end project\
-> run the application as Spring Boot App

### Front End 
-> Git clone https://github.com/2011Canada/Project2-Team2-FrontEndNew.git
-> change directory to frontend and do -> npm install\
-> run code using command -> npm start\

## Usage
- User can login as an Admin, Patient or Doctor.
- Admin is responsible for managing all doctor's accounts.
- Admin can Approve or Reject any new doctor's account request.
- Patients can create requests to specific doctors asking for an advice or perscription 
- Doctors can response to patient request.
- Both patients and doctors can view the list of all request either new or already responded.
- User can Logout

### Authentication FLow
![Alt](/login.png "login")

### Admin FLow
![Alt](/admin.png "admin")

### Patient and Doctor FLow
![Alt](/patientDoctor.png "patientDoctor")

## Development Tool
- Eclipse - Spring Tools Suit 4
- Visual Studio code
- Postman
- DBeaver

## ER Diagram
![Alt](/ERD.png "ERD")

## Contributers
- [Haocheng Xu](https://github.com/haochengca)
- [Antardeep Kaur](https://github.com/Antardeep)
- [Mahesh Kalle](https://github.com/mahesh-kalle)
- [Mohammad Hamza](https://github.com/lionhamza82)

## License

The project is under the GNU General Public License






