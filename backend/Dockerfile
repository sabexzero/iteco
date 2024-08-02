FROM openjdk:21-jdk

WORKDIR /app

COPY ./build/libs/ITECO-task-0.0.1-SNAPSHOT.jar  ITECO-task-0.0.1-SNAPSHOT.jar

COPY .env .env

CMD ["java", "-jar", "ITECO-task-0.0.1-SNAPSHOT.jar"]