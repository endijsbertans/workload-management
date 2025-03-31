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
COPY --from=build /build/target/workloadmanagement-*.jar /app/
EXPOSE 8088
ENV ACTIVE_PROFILE=${PROFILE}
ENV DB_URL=jdbc:mysql://mysql-container:3306/mydatabase
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOSTNAME=missing_host_name
ENV EMAIL_USER_NAME=missing_user_name
ENV EMAIL_PASSWORD=missing_password
ENV EC2_HOST=missing_ec2_host
ENV SECRET_KEY=missing_secret_key
ENV DB_NAME=missing_db_name
ENV DB_PASSWORD=missing_db_password
CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  workloadmanagement-${JAR_VERSION}.jar