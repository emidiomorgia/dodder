# dotnetcore-ddd-angular-microservices
Demonstrating Angular SPA, .net core web api back-end with Domain Driven Design and CQRS approach and microservices architecture

### Step 1
The aim of this step is to create two main projects, one for the front-end and one for the back-end. In this step the project wil be deployed as monolithic app and we will focus on creating the boundary contexts and each DDD element without care of microservices logic (until step 2). Common elements will be: Entities, Value objects, Repositories, Domain Services, Factories, Domain Events, Infrastructure Services, Application Services (with CQRS approach), Facades, Assemblers, DTO, Controllers. On the front-end application there will be components and services calling the back-end through web api calls.

### Step 2
The aim of this step is to separate each boundary context into a microservice and add an API-Gateway service in order to achieve a modular architecture. Each microservice will use integration services and Event Bus in orter to communicate each other with eventual consistency.

### Step 3
In the last step we will introduce a Discovery Service and an orchestrator in order to scale on multiple instances of a service. Health Check will be introduced for monitoring and Circuit Braker will be used in order to achieve High Availability.


## Getting Started

Clone the repository and open the solution with Visual Studio 2019 or Visual Studio Code

### Prerequisites

Install Visual Studio 2019 or Visual Studio Code and dotnet core 2.2 or grater.
Install nodejs and angular-cli globally
Optionally install Docker for Windows or Linux

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Emidio Morgia** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


