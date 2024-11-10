FROM eclipse-temurin:17

WORKDIR /f-light/backend

EXPOSE 7000:7000

COPY build/libs/backend-0.0.1-SNAPSHOT.jar /f-light/backend/

ENTRYPOINT ["java","-jar", "backend-0.0.1-SNAPSHOT.jar"]