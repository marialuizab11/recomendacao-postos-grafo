package app;

import io.javalin.Javalin;

/**
 * Classe principal que inicializa e configura o servidor web da API.
 */
public class ApiServer {

    public static void main(String[] args) {
        Javalin app = Javalin.create().start(7070);

        System.out.println("Servidor web iniciado na porta 7070.");
        System.out.println("Acesse http://localhost:7070/ no seu navegador para testar.");

        app.get("/", ctx -> ctx.result("O servidor backend do projeto está funcionando!"));
    }
}