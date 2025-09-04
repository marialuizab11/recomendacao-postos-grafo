package dto;

/**
 * Representa os dados da requisição que chegam do frontend para cálculo da rota.
 */
public class RequisicaoCalculoDTO {
    private String enderecoPartida;
    private String enderecoDestino;
    private double autonomiaKmL;
    private double litrosParaAbastecer;
    
    public String getEnderecoPartida(){
        return enderecoPartida;
    }
    
    public String getEnderecoDestino(){
        return enderecoDestino;
    }
    
    public double getAutonomiaKmL() {
        return autonomiaKmL;
    }

    public double getLitrosParaAbastecer() {
        return litrosParaAbastecer;
    }
}