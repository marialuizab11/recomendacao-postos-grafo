package data;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import model.Posto;

import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe responsável por carregar dados de fontes externas, como JSON.
 */
public class DataLoader {
    private final String jsonPostos;
    
    public DataLoader(String nomeArquivo) {
        this.jsonPostos = nomeArquivo;
    }

    public List<Posto> carregarPostos(){
        try {
            InputStream inputStream = DataLoader.class.getResourceAsStream("/" + this.jsonPostos);
            
            if (inputStream == null) {
                throw new IllegalArgumentException("Arquivo não encontrado no classpath: " + this.jsonPostos);
            }
            
            Reader reader = new InputStreamReader(inputStream);
            Type listType = new TypeToken<ArrayList<Posto>>(){}.getType();
            return new Gson().fromJson(reader, listType);

        } catch (Exception e) {
            System.err.println("### ERRO CRÍTICO AO LER O ARQUIVO DE DADOS ###");
            e.printStackTrace();

            return new ArrayList<>();
        }
    }
}