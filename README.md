# test

### Clinic Registration
- URL
  - POST /auth/register
- Required Info: 
  - email<String>, password<String>, clinic_name<String>, phone<String>, addr<String>
- Success Respond
  - status: 200
  - msg: Account created successfully!
- Fail Respond
  - status: 300
  - msg: Account already exists.
  <hr />
  
 ### Clinic Login
- URL
  - POST /auth/login
- Required Info: 
  - email<String>, password<String>
- Success Respond
  - status: 200
  - data: accessToken, id, expires 
- Fail Respond
  - status: 300
  - msg: Email and password do not match.
  
  <hr />
  
 ### Clinic Add Doctor
- URL
  - POST /user/add-doctor/:id
- Header:
  -x-access-token
- Required Info: 
  - first_name<String>, last_name<String>
- Success Respond
  - status: 200
  - msg Information is updated
- Fail Respond
  - status: 300
  - msg: This information is already added into database
  
  <hr />
  
 ### Clinic Add Consultation
- URL
  - POST /user/add-consultation/:id
- Header:
  -x-access-token
- Required Info: 
  - d_fname<String>, d_lname<String>, p_fname<String>, p_lname<String>, diagnosis<String>, medication<String>, fee<String>, follow_up<Boolean>
- Success Respond
  - status: 200
  - msg Information is updated
- Fail Respond
  - status: 300
  
  <hr/>
  
### Clinic Add Booking
- URL
  - POST /user/add-consultation/:id
- Header:
  -x-access-token
- Required Info: 
  - d_fname<String>, d_lname<String>, p_fname<String>, p_lname<String>, t_from<String>(format YYYY/mm/dd h`:`m`:`s), t_to<String>(format YYYY/mm/dd h`:`m`:`s)
- Success Respond
  - status: 200
  - msg Information is updated
- Fail Respond
  - status: 300
  
  <hr />
  
### Get Clinics
- URL
  - GET /clinics
- Success Respond
  - status: 200
  - data<Array>: clinic_name<String>, phone<String>, addr<String>, first_name<String>, last_name<String>
  
   <hr />
  
### Get Consultations
- URL
  - GET /user/get-consultations/:id
- Success Respond
  - status: 200
  - data<Array>: id<String>, d_fname<String>, d_lname<String>, p_fname<String>, p_lname<String>, last_name<String>, diagnosis<String>, medication<String>, fee<String>, time<String>, follow_up<Boolean>, clinic_id<String>, clinic_name<String>
  
     <hr />
  
  ### Get Consultations
- URL
  - GET /user/get-bookings/:id
- Success Respond
  - status: 200
  - data<Array>: id<String>, d_fname<String>, d_lname<String>, p_fname<String>, p_lname<String>, , t_from<String>, t_to<String>, clinic_id<String>, clinic_name<String>

<hr />

## Building and Testing
First, clone the this repo
Second, change the variable in .env to your own data
then run:
```
npm install
npm run dev
```
