package dto;

/**
 * Representa os dados da requisição que chegam do frontend para cálculo da rota.
 */
public class RequisicaoCalculoDTO {
    private String idPartida;
    private String idDestino;
    private double autonomiaKmL;
    private double litrosParaAbastecer;
    
    public String getIdPartida(){
        return idPartida;
    }
    
    public String getIdDestino(){
        return idDestino;
    }
    
    public double getAutonomiaKmL() {
        return autonomiaKmL;
    }

    public double getLitrosParaAbastecer() {
        return litrosParaAbastecer;
    }
}