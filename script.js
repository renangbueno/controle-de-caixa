window.onload = function() {
    carregarTabelas();
    salvarTabelas();
};

const today = new Date();
//Pega os itens do localStorage caso true, senão coloca-se 0.
var cont = parseInt(localStorage.getItem('cont')) || 0;
var total = parseFloat(localStorage.getItem('total')) || 0;
var maiorValor = parseFloat(localStorage.getItem('maiorValor')) || 0;
var maiorDespesa = parseFloat(localStorage.getItem('maiorDespesa')) || 0;
var vendas = parseInt(localStorage.getItem('vendas')) || 0;

// Função para adicionar valores positivos na tabela
function venda(){
    var novoProd = document.getElementById("produto").value;
    var valor = parseFloat(document.getElementById("valor").value);
    var novaLinha = "";
    var novoTotal = "";
    // Adiciona mais 1 venda
    vendas++;

        //Se os inputs estiverem vazios não prossegue
        if (novoProd == "" && document.getElementById('valor').value == ""){
            alert("PREENCHA OS CAMPOS!");
        }
        else{
            total += valor;
            novaLinha = "<tr><td style='text-transform: uppercase;'>" + novoProd + "</td><td>"+ "+R$" + valor +"</td><td>"+ today.toLocaleDateString() +"</td><td><input type='checkbox' class='delete-checkbox'></td></tr>";
            document.getElementById("tabela-produtos").innerHTML += novaLinha;
            if (maiorValor<valor){
                maiorValor=valor;
            }
            novoTotal = "<tr><th colspan='4'>TOTAL</th></tr><tr><tr><th>Vendas:</th><td><b>"+ vendas +"</b></td><tr><th>Lucro:</th><td id='lucro123'>"+ "<b>R$ " + total.toFixed(2) + "</b></td></tr><tr><th>Maior venda:</th><td> <b>R$"+ maiorValor +"</b></td></tr><tr><th>Maior Despesa:</th><td><b>R$"+ maiorDespesa +"</b></td></tr>";
            document.getElementById("total").innerHTML = novoTotal;

            //Limpa os inputs
            document.getElementById("produto").value = '';
            document.getElementById("valor").value = '';
        }
}

function pagamento(){
    var novaLinha = "";
    var novoTotal = "";
    // Pega os dados dos inputs
    var novoProd = document.getElementById("produto").value;
    var valor = parseFloat(document.getElementById("valor").value);
    // Diminui valor do total
    total -= valor;
    // Aumenta 1 venda para controle
    vendas++;

    novaLinha = "<tr><td style='text-transform: uppercase;'>" + novoProd + "</td><td>"+ "-R$" + valor +"</td><td>"+ today.toLocaleDateString() +"</td><td><input type='checkbox' class='delete-checkbox'></td></tr>";
    document.getElementById("tabela-produtos").innerHTML += novaLinha;
    if (maiorDespesa<valor){
        maiorDespesa=valor;
    }
    novoTotal = "<tr><th colspan='4'>TOTAL</th></tr><tr><tr><th>Vendas:</th><td><b>"+ vendas +"</b></td><tr><th>Lucro:</th><td id='lucro123'>"+ "<b>R$ " + total.toFixed(2) + "</b></td></tr><tr><th>Maior venda:</th><td> <b>R$"+ maiorValor +"</b></td></tr><tr><th>Maior Despesa:</th><td><b>R$"+ maiorDespesa +"</b></td></tr>";
    document.getElementById("total").innerHTML = novoTotal;

    //Limpa os inputs
    document.getElementById("produto").value = '';
    document.getElementById("valor").value = '';
    
}

function deletarVenda(){
    var novoTotal = "";
    var checkboxes = document.getElementsByClassName("delete-checkbox");

    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            // Obtém a linha (tr) à qual a checkbox pertence
            var row = checkboxes[i].closest('tr');
            var valorDaLinha = parseFloat(row.cells[1].textContent.replace(/[^\d.-]/g, ''));
            // Remove a linha da tabela
            row.parentNode.removeChild(row);
            
            //Diminui valor do produto excluido do total
            total-= valorDaLinha;
            // Diminui 1 venda
            vendas--;
            // Atualiza o total
            novoTotal = "<tr><th colspan='4'>TOTAL</th></tr><tr><tr><th>Vendas:</th><td><b>"+ vendas +"</b></td><tr><th>Lucro:</th><td id='lucro123'>"+ "<b>R$ " + total.toFixed(2) + "</b></td></tr><tr><th>Maior venda:</th><td> <b>R$"+ maiorValor +"</b></td></tr><tr><th>Maior Despesa:</th><td><b>R$"+ maiorDespesa +"</b></td></tr>";
            document.getElementById("total").innerHTML = novoTotal;
        
        }
    }
}
function salvarTabelas() {
    localStorage.setItem('cont', cont);
    localStorage.setItem('total', total);
    localStorage.setItem('maiorValor', maiorValor);
    localStorage.setItem('maiorDespesa', maiorDespesa);
    localStorage.setItem('vendas', vendas);

    // Obter as HTML das tabelas
    var tabelaProdutosHTML = document.getElementById("tabela-produtos").outerHTML;
    var tabelaTotalHTML = document.getElementById("total").outerHTML;

    // Salvar as HTMLs no localStorage
    localStorage.setItem('tabelaProdutos', tabelaProdutosHTML);
    localStorage.setItem('tabelaTotal', tabelaTotalHTML);
}

function carregarTabelas() {
    // Obter as HTMLs salvas no localStorage
    var tabelaProdutosHTML = localStorage.getItem('tabelaProdutos');
    var tabelaTotalHTML = localStorage.getItem('tabelaTotal');

    // Verificar se há dados salvos
    if (tabelaProdutosHTML && tabelaTotalHTML) {
        // Atualizar as tabelas com as HTMLs salvas
        document.getElementById("tabela-produtos").outerHTML = tabelaProdutosHTML;
        document.getElementById("total").outerHTML = tabelaTotalHTML;
    }  
}