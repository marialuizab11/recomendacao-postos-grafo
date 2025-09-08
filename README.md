# ⛽ Gas Finder: Otimização de Rotas para Abastecimento

[![Deploy on Vercel](https://vercel.com/button)](https://recomendacao-postos-grafo.vercel.app/)

Um projeto full-stack desenvolvido para a disciplina de Algoritmos e Estruturas de Dados II, que utiliza a teoria dos grafos e o algoritmo de Dijkstra para resolver um problema do cotidiano: encontrar o posto de gasolina com o melhor custo-benefício em uma determinada rota.

---

### Preview da Aplicação

![Screenshot do Gas Finder em ação](https://github.com/marialuizab11/recomendacao-postos-grafo/issues/7#issue-3395406468)

### ➤ Sobre o Projeto

Para motoristas, a constante variação no preço dos combustíveis transformou o ato de abastecer em uma decisão estratégica. O posto com o menor preço por litro nem sempre é a opção mais econômica, pois o custo do combustível gasto no desvio pode anular a economia obtida.

O **Gas Finder** soluciona este problema. É um sistema web que recomenda o posto de melhor custo-benefício para um usuário que viaja entre um ponto de partida e um destino. A aplicação recebe os endereços, a autonomia do veículo e a quantidade a ser abastecida, e retorna uma lista ordenada das opções mais econômicas, considerando o **custo total = (custo do trajeto) + (custo do abastecimento)**.

### ✨ Tecnologias Utilizadas

| Backend (API) | Frontend (UI) | Deploy |
| :--- | :--- | :--- |
| ![Java](https://img.shields.io/badge/Java-21-blue?logo=openjdk) | ![React](https://img.shields.io/badge/React-18-blue?logo=react) | ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render) |
| ![Maven](https://img.shields.io/badge/Maven-3.9-red?logo=apachemaven) | ![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite) | ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel) |
| ![Javalin](https://img.shields.io/badge/Javalin-6.1-blue) | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwindcss) | ![Docker](https://img.shields.io/badge/Docker-blue?logo=docker) |
| ![Gson](https://img.shields.io/badge/Gson-2.10-blue) | ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-black?logo=shadcnui&logoColor=white) | |
| ![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?logo=openstreetmap) | ![Axios](https://img.shields.io/badge/Axios-purple) | |

### 🚀 Como Rodar o Projeto Localmente

Para executar a aplicação no seu ambiente de desenvolvimento, siga os passos abaixo.

#### **Pré-requisitos**

* Java (JDK 21 ou superior)
* Apache Maven
* Node.js e PNPM

#### **1. Clonar o Repositório**
```bash
git clone [https://github.com/marialuizab11/recomendacao-postos-grafo.git](https://github.com/marialuizab11/recomendacao-postos-grafo.git)
cd recomendacao-postos-grafo
```

#### **2. Executar o Backend (API Java)**

O backend é responsável por toda a lógica de cálculo.

```bash
# Navegue até a pasta do backend
cd backend

# Construa o projeto com o Maven. Isso vai baixar as dependências e compilar o código.
mvn clean package

# Execute o arquivo .jar que foi gerado
java -jar target/recomendacao-postos-1.0-SNAPSHOT.jar
```
✅ Seu backend estará rodando em `http://localhost:7070`. Deixe este terminal aberto.

#### **3. Executar o Frontend (Aplicação React)**

Abra um **novo terminal** para o frontend.

```bash
# A partir da pasta raiz, navegue até a pasta do frontend
cd frontend

# Instale as dependências do projeto
pnpm install

# IMPORTANTE: Crie um arquivo de ambiente para conectar com o backend local
# Crie um arquivo chamado '.env' na pasta 'frontend/' e adicione a seguinte linha:
VITE_API_URL=http://localhost:7070

# Inicie o servidor de desenvolvimento
pnpm run dev
```
✅ Sua aplicação React estará disponível no endereço indicado pelo terminal (geralmente `http://localhost:5173`).

### ✍️ Autores

* **Maria Luiza Bezerra dos Santos** - [GitHub](https://github.com/marialuizab11)
* **Hugo Matheus Costa Araújo** - [GitHub](https://github.com/hugomtths)

---
