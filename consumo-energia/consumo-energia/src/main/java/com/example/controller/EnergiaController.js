package com.exemplo.consumodeenergia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class EnergiaController {

    // Mapeamento para a página inicial
    @GetMapping("/")
    public String index() {
        return "index";  // Certifique-se de que você tem um arquivo "index.html" no diretório templates
    }

    @PostMapping("/calcular")
    public String calcularConsumo(@RequestParam String nomeAluno,
    @RequestParam("consumoMes") double[] consumoMes,
    Model model) {

    // Verificando se a quantidade de meses é 12
    if (consumoMes.length != 12) {
    model.addAttribute("error", "Por favor, insira o consumo para 12 meses.");
    return "index";
}

// Calculando o total de energia consumida no ano
double totalGasto = 0;
double maiorConsumo = consumoMes[0];
double menorConsumo = consumoMes[0];
int mesMaiorConsumo = 1;
int mesMenorConsumo = 1;

for (int i = 0; i < 12; i++) {
    totalGasto += consumoMes[i];
    if (consumoMes[i] > maiorConsumo) {
        maiorConsumo = consumoMes[i];
        mesMaiorConsumo = i + 1;
    }
    if (consumoMes[i] < menorConsumo) {
        menorConsumo = consumoMes[i];
        mesMenorConsumo = i + 1;
    }
}

// Atribuindo os resultados ao modelo
model.addAttribute("nomeAluno", nomeAluno);
model.addAttribute("totalGasto", totalGasto);
model.addAttribute("mesMaiorConsumo", mesMaiorConsumo);
model.addAttribute("mesMenorConsumo", mesMenorConsumo);

return "resultado";
}
}
