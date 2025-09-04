package service;

import com.google.gson.Gson;
import java.net.URI;
import java.net.URLEncoder;
import model.Localizacao;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
/**
 * Serviço responsável por converter uma string endereço em coordenadas geográficas a partir da API Nominatim do OpenStreetMap.
 */
public class GeocodingService {
    private final HttpClient httpClient;
    private final Gson gson;
    private static final String NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";
    
    public GeocodingService(){
        this.httpClient = HttpClient.newHttpClient();
        this.gson = new Gson();
    }
    
    /* Converte um string para um objeto Localizacao com coordenadas.*/
    public Localizacao getCoordenadas(String endereco){
        try{
            System.out.println("Geocodificando: " +  endereco);
            String queryCompleta = endereco + ", Garanhuns, PE";
            String queryCodificada =  URLEncoder.encode(queryCompleta, StandardCharsets.UTF_8.toString());
            
            String urlCompleta = String.format("%s?q=%s&format=json&limit=1", NOMINATIM_API_URL, queryCodificada);
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(urlCompleta))
                    .header("Accept", "application/json")
                    .build();
            
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if(response.statusCode() == 200){
                NominatimResult[] results = gson.fromJson(response.body(), NominatimResult[].class);            
                if (results != null && results.length > 0) {
                    NominatimResult primeiroResultado = results[0];
                    Localizacao localizacao = new Localizacao();
                    localizacao.setLatitude(Double.parseDouble(primeiroResultado.lat));
                    localizacao.setLongitude(Double.parseDouble(primeiroResultado.lon));
                    return localizacao;
                }
            } else {
                System.err.println("Erro na chamada ao Nominatim: Status " + response.statusCode());
            }

        } catch (Exception e) {
            System.err.println("Ocorreu um erro ao tentar geocodificar o endereço: " + endereco);
            e.printStackTrace();
        }
        
        return null;
    }
    
    /**
     * Classe auxiliar privada para mapear apenas os campos que nos interessam
     * da resposta JSON complexa do Nominatim.
     */
    private static class NominatimResult {
        String lat;
        String lon;
    }
}