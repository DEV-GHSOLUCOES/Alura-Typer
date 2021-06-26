//Variaveis globais
var campo = $(".campo-digitacao");
var tempoInicial =  $("#tempo-digitacao").text();

//Chama as funcoes quando a pagina é carrega
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras =  frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);

}


function inicializaMarcadores(){
    var frase  = $(".frase").text();
    campo.on("input",function(){
        var digitado =  campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        if(digitado == comparavel) {
            console.log("Está certo");
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    
    });

}


function inicializaContadores (){

    campo.on("input", function(){
        var conteudo =  campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length -1;
       $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres =  conteudo.length; 
       $("#contador-caracteres").text(qtdCaracteres);
    
    });

}

function inicializaCronometro(){
    var tempoRestatante = $("#tempo-digitacao").text();
       campo.one("focus", function(){
        $("#botao-reiniciar").attr("disabled",true);
         var conometroID =   setInterval(function(){
               tempoRestatante--;
               //console.log(tempoRestatante);
               $("#tempo-digitacao").text(tempoRestatante);
               if (tempoRestatante < 1) {
                   campo.attr("disabled", true);
                   clearInterval(conometroID);
                   $("#botao-reiniciar").attr("disabled",false);
                   campo.addClass("campo-desativado");
                   inserePlacar();
               }
           },1000);
       });

}
    function reiniciaJogo(){
        $("#botao-reiniciar").click(function(){ 
            campo.attr("disabled", false);
            campo.val("");
            $("#contador-palavras").text("0");
            $("#contador-caracteres").text("0");
            $("#tempo-digitacao").text(tempoInicial);
            inicializaCronometro();
            campo.removeClass("campo-desativado");
            campo.removeClass("borda-vermelha");
            campo.removeClass("borda-verde");


        });   

    }

    function removeLinha(event) {  
    
        event.preventDefault();
        $(this).parent().parent().remove();
        
    
    }

    function inserePlacar(){
        var corpoTabela =  $(".placar").find("tbody");

        var usuario = "Glecio";
        var numPalavras = $("#contador-palavras").text();
        var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;

        var  linha = novaLinha(usuario, numPalavras);
        linha.find(".botao-remover").click(removeLinha);
                   
        corpoTabela.append(linha);
    }

    function novaLinha(usuario, numPalavras){

        var linha = $("<tr>");
        var colunaUsuario = $("<td>").text(usuario);
        var colunaPalavras = $("<td>").text(numPalavras);
        var colunaRemover = $("<td>");

        var link = $("<a>").attr("href","#").addClass("botao-remover");
        var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
       
        // Icone dentro do <a>
        link.append(icone);

        // <a> dentro do <td>
        colunaRemover.append(link);

        // Os três <td> dentro do <tr>
        linha.append(colunaUsuario);
        linha.append(colunaPalavras);
        linha.append(colunaRemover);

        return linha;

    }
