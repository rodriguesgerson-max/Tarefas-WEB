

const input= document.getElementById("inputBusca");
const resultado = document.getElementById("resultado");
const loading = document.getElementById("loading");

async function buscar(){

    const query = input.value.trim();

    resultado.innerHTML = "";

    if(query === ""){
    mostrarErro("Digite o nome de uma série");
    return;
    }

    try{

    loading.style.display = "block";

    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await res.json();

    loading.style.display = "none";

    if(data.length === 0){
        mostrarErro("Nenhuma série encontrada");
        return;
    }

    criarCards(data);

    }catch(error){
    loading.style.display = "none";
    mostrarErro("Erro ao buscar dados da API");
    }
}

function criarCards(series) {

  resultado.innerHTML = "";

  series.forEach(item => {

    const show = item.show;

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");

    const imgContainer = document.createElement("div");

    if (show.image && show.image.medium) {
      img.src = show.image.medium;
      img.alt = show.name;
      imgContainer.appendChild(img);
    } else {
      const msg = document.createElement("p");
      msg.innerText = "Imagem não disponível";
      msg.style.color = "yellow";
      msg.style.margin = "10px 0";

      imgContainer.appendChild(msg);
    }

    const nome = document.createElement("h3");
    nome.innerText = show.name;

    const score = document.createElement("p");
    score.innerText = `Score: ${show.rating.average ?? "N/A"}`;

    card.appendChild(imgContainer);
    card.appendChild(nome);
    card.appendChild(score);

    resultado.appendChild(card);
  });
}

function mostrarErro(msg){
    resultado.innerHTML = "";
    const erro = document.createElement("p");
    erro.classList.add("erro");
    erro.innerText = msg;
    resultado.appendChild(erro);
}
