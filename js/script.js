// Exibir informações do cartão e sugerir produtos
document.addEventListener('DOMContentLoaded', function () {
  const nomeCartao = localStorage.getItem('cartaoNome');
  const saldoCartao = localStorage.getItem('cartaoSaldo');
  const dadosCartaoDiv = document.getElementById('dadosCartao');
  const suggestedProductsRow = document.getElementById('suggested-products-row');
  const cartCountSpan = document.querySelector('.cart-count');

  if (nomeCartao != null && saldoCartao != null) {
    // Estilos para o cartão
    dadosCartaoDiv.style.fontSize = '1.1rem';
    dadosCartaoDiv.style.color = 'darkblue';
    dadosCartaoDiv.style.textShadow = '0 0 10px #545454';
    dadosCartaoDiv.style.padding = '10px';
    dadosCartaoDiv.style.border = '2px solid white';
    dadosCartaoDiv.style.borderRadius = '10px';
    dadosCartaoDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    dadosCartaoDiv.innerHTML = `
      <h2>Nome no cartão: ${nomeCartao}</h2>
      <p>Saldo disponivel: ${saldoCartao} Mt</p>
    `;

    const produtos = [
      { nome: "Livro: The Many Faces", preco: 400, img: "../img/livro1.jpeg" },
      { nome: "Livro: Organized Thinking", preco: 750, img: "../img/livro2.jpeg" },
      { nome: "Livro: MasterMind Dinners", preco: 900, img: "../img/livro3.jpeg" },
      { nome: "Livro: Intuition", preco: 500, img: "../img/livro4.jpeg" },
      { nome: "Geleira", preco: 105000, img: "../img/geleira.jpeg" },
      { nome: "Panela Elêctrica", preco: 1500, img: "../img/Panela-Eletrica.jpeg" },
      { nome: "Aspirador de Pó", preco: 10300, img: "../img/aspirador.jpeg" },
      { nome: "Microondas", preco: 10800, img: "../img/micro.jpeg" },
      { nome: "MacBook Pro 2023", preco: 90000, img: "../img/mac3.jpeg" },
      { nome: "Smart Watch", preco: 18000, img: "../img/Smartwatch.jpg" },
      { nome: "Iphone 15", preco: 110000, img: "../img/iph15.jpeg" },
      { nome: "Headphone", preco: 4000, img: "../img/jbl.jpeg" },
      { nome: "Conjunto Fasculino", preco: 5150, img: "../img/calcoes.jpeg" },
      { nome: "Vestido Feminino", preco: 4000, img: "../img/girl.jpeg" },
      { nome: "Casaco Casual", preco: 1500, img: "../img/pa.jpeg" },
      { nome: "Camisa Zara", preco: 2050, img: "../img/tshirt.jpeg" },
      { nome: "PlayStation 5", preco: 38000, img: "../img/PS5.jpg" },
      { nome: "Oculos RV", preco: 30000, img: "../img/VR.jpg" },
      { nome: "Nintendo Switch", preco: 14500, img: "../img/Nintendo.jpeg" },
      { nome: "Xbox Series X", preco: 40000, img: "../img/Xbox.jpeg" }
    ];

    const saldo = parseFloat(saldoCartao);
    let saldoRestante = saldo;
    const produtosSugeridos = [];

    while (saldoRestante >= Math.min(...produtos.map(produto => produto.preco))) {
      for (const produto of produtos) {
        if (produto.preco <= saldoRestante) {
          produtosSugeridos.push(produto);
          saldoRestante -= produto.preco;
        }
      }
    }

    // Cria e exibe o total de preço
    let totalPreco = 0;

    // Cria uma nova linha para os cards de produtos
    let currentRow = document.createElement('div');
    currentRow.classList.add('row');

    // Adiciona os cards de produtos à nova linha
    produtosSugeridos.forEach((produto, index) => {
      if (index % 4 === 0 && index !== 0) {
        suggestedProductsRow.appendChild(currentRow);
        currentRow = document.createElement('div');
        currentRow.classList.add('row');
      }

      const productCard = document.createElement('div');
      productCard.classList.add('col', 'card', 'card-img');

      productCard.innerHTML = `
        <img src="${produto.img}" class="card-img-top" alt="${produto.nome}">
        <div class="card-body">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">Preço: ${produto.preco} Mt</p>
        </div>
      `;

      totalPreco += produto.preco;

      currentRow.appendChild(productCard);
    });

    // Adiciona a última linha de produtos, se necessário
    if (currentRow.childNodes.length > 0) {
      suggestedProductsRow.appendChild(currentRow);
    }

    // Cria e exibe o total de preço
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');

    const totalElement = document.createElement('div');
    totalElement.classList.add('total-element');
    totalElement.textContent = `Total gasto: ${totalPreco} Mt`;

    totalContainer.appendChild(totalElement);
    suggestedProductsRow.insertBefore(totalContainer, suggestedProductsRow.firstChild);

    // Atualiza a quantidade de produtos sugeridos na navbar
    cartCountSpan.textContent = produtosSugeridos.length;

    // Função para exibir a mensagem de confirmação
    function exibirMensagemConfirmacao() {
      const mensagem = `
        RECIBO

        Nome: ${nomeCartao}
        Saldo disponível: ${saldoCartao} Mt

        Produtos:
        ${produtosSugeridos.map(produto => `${produto.nome}, Preço: ${produto.preco} Mt`).join('\n')}
        
        Quantidade total dos produtos: ${produtosSugeridos.length}
        Total gasto: ${totalPreco} Mt

        Deseja imprimir o recibo, meu lindo/a?
      `;

      const estilo = `
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        border: 2px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        max-width: 600px;
        margin: 0 auto;
      `;

      if (saldoCartao >= 400) {
        const confirmacao = confirm(`
        Deseja imprimir o recibo, meu lindo/a?

        RECIBO

        Nome: ${nomeCartao}
        Saldo disponível: ${saldoCartao} Mt

        Produtos:
        ${produtosSugeridos.map(produto => `${produto.nome}, Preço: ${produto.preco} Mt`).join('\n')}
        
        Quantidade total dos produtos: ${produtosSugeridos.length}
        Total gasto: ${totalPreco} Mt
        `);

        if (confirmacao) {
          const textoRecibo = `RECIBO\n\nNome: ${nomeCartao}\nSaldo disponível: ${saldoCartao} Mt\n\nProdutos:\n${produtosSugeridos.map(produto => `${produto.nome}, Preço: ${produto.preco} Mt`).join('\n')}\n\nQuantidade total dos produtos: ${produtosSugeridos.length}\nTotal gasto: ${totalPreco} Mt`;

          // Gerar um arquivo txt com as informações do recibo
          const blob = new Blob([textoRecibo], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recibo.txt';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        }
      } else {
        alert('Infelizmente, produtos com preço abaixo de 400 Mt não estão disponíveis.');
      }
    }

    // Adiciona o evento de clique ao ícone do carrinho
    document.querySelector('.cart-icon').addEventListener('click', function (event) {
      event.preventDefault();
      exibirMensagemConfirmacao();
    });

    // Executa a mensagem de confirmação após 8 segundos
    setTimeout(function () {
      exibirMensagemConfirmacao();
    }, 8000);
  }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cardForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nomeCartao = document.getElementById('nomeCartao').value;
        const valorGasto = document.getElementById('valorGasto').value;        
        localStorage.setItem('cartaoNome', nomeCartao);
        localStorage.setItem('cartaoSaldo', valorGasto);
        
        window.location.href = 'loja.html'; // Redireciona para a página inicial
    });
});