package com.ordemrpg.api;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Permite a comunicação com o HTML local ou GitHub Pages
public class OrdemController {

    @GetMapping("/rolar-d20")
    public Map<String, Object> rolarD20(@RequestParam(defaultValue = "1") int quantidade) {
        Map<String, Object> resultado = new HashMap<>();
        
        // Proteção contra valores abusivos
        if (quantidade < 1) quantidade = 1;
        if (quantidade > 10) quantidade = 10;

        List<Integer> rolagens = new ArrayList<>();
        Random random = new Random();
        int maiorValor = 0;

        for (int i = 0; i < quantidade; i++) {
            int valor = random.nextInt(20) + 1;
            rolagens.add(valor);
            if (valor > maiorValor) {
                maiorValor = valor;
            }
        }

        resultado.put("sucesso", true);
        resultado.put("rolagens", rolagens);
        resultado.put("maiorValor", maiorValor);
        
        return resultado;
    }
}