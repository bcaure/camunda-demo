# Description

This demo project shows how Camunda can be driven as a micro-service using its REST-API, and communicate by email using SMTP server.
The different components are:

- camunda-platform: based on the default Spring Boot - Camunda starter, with HTTP and Email connectors:
    https://github.com/camunda/camunda-get-started-spring
- camunda-demo-back: a simple API that handle the message from Camunda process engine
- camunda-demo-front: a simple React app that drives Camunda process engine using REST endpoints

# Getting Started

- Run a local SMTP server. E.g. from the console: `npx maildev`. Configure it in `camunda-platform/src/main/resources/mail-config.properties.`
- From the *camunda-platform* directory, run `mvn spring-boot:run`. It will listen to `http://localhost:8080`
- From the *camunda-demo-back* directory, run `gradlew.bat bootRun` (Windows) or `gradlew bootRun` (Linux). It will listen to `http://localhost:8081`
- From the *camunda-demo-front* directory, run `yarn` then `yarn start`. It will start in `http://localhost:3000/`
