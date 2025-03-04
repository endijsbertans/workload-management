#Build
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src/ ./src
RUN mvn clean package -DskipTests

#Run
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/workload-management-*.jar /app/
EXPOSE 8088
ENV ACTIVE_PROFILE=${PROFILE}
ENV DB_URL=jdbc:mysql://mysql-container:3306/mydatabase
ENV JAR_VERSION=${APP_VERSION}
CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  workload-management-${JAR_VERSION}.jar