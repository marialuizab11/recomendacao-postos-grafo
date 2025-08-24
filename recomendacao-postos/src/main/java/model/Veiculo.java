package model;

/**
 * Armazena a autonomia de KM/L do veiculo do usuário.
 */
public class Veiculo {
    double autonomiaKmL;
    
    public Veiculo(double autonomiaKmL){
        this.autonomiaKmL = autonomiaKmL;
    }
    
    public double getAutomiaKmL(){
        return autonomiaKmL;
    }
}