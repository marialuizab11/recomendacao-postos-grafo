# --- Estágio 1: Construção com Maven ---
# Usamos uma imagem oficial que já vem com Maven e Java (JDK)
FROM maven:3.9-eclipse-temurin-21 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de configuração do Maven primeiro para otimizar o cache
COPY pom.xml .

# Copia todo o resto do código do backend
COPY src ./src

# Roda o comando do Maven para construir o projeto e gerar o .jar
# O -DskipTests pula os testes para acelerar o deploy
RUN mvn clean package -DskipTests


# --- Estágio 2: Execução ---
# Usamos uma imagem leve, apenas com o ambiente para rodar Java (JRE)
FROM eclipse-temurin:21-jre

# Define o diretório de trabalho
WORKDIR /app

# Copia APENAS o arquivo .jar gerado no estágio de construção
COPY --from=build /app/target/recomendacao-postos-1.0-SNAPSHOT.jar .

# Expõe a porta que o Javalin usa
EXPOSE 7070

# O comando para iniciar a aplicação quando o container ligar
CMD ["java", "-jar", "recomendacao-postos-1.0-SNAPSHOT.jar"]