# report-stolen-car
 A small website reporting stolen cars
## Hosted Link:
https://report-stolen-car.herokuapp.com/
## Features
 1. Car owners can report stolen cars

 2. New stolen car cases are being automatically assigned to any free police officer

 3. A police officer can only handle one stolen car case at a time

 4. When the Police find a car, the case is marked as resolved and the responsible police officer become available to take a new stolen car case

 5. The system is able to assign unassigned stolen car cases automatically when a police officer becomes available
 ## Initialization
  The web application is initialized with 4 Officers namely <br>
  1. IPS Sachin 2. IPS Akshay 3. IPS Abhishek 4. IPS Sanjay
 ## API:
  @route POST: reports/register <br>
  @desc:  Register new Case <br>
  @route POST: reports/resolve <br>
  @desc: Resolve existing Case and assign officer to unassigned case <br>
  @route POST: reports/getAll <br>
  @desc:  get all reports <br
## Visuals:
![image](https://github.com/aayushsomani/report-stolen-car/blob/master/blob/home.jpg?raw=true)

  
