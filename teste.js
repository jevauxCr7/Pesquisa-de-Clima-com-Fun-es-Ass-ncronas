async function consultarClima() {
    const cidade = document.getElementById("cidade").value.trim();
    const climaResultado = document.getElementById("climaResultado");

    if (!cidade) {
        climaResultado.innerText = "Por favor, insira o nome de uma cidade.";
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=SUA_API_KEY&lang=pt_br`);
        if (!response.ok) throw new Error("Erro ao acessar a API");

        const data = await response.json();
        const temperatura = data.main.temp;
        const umidade = data.main.humidity;
        const condicao = data.weather[0].description;

        // Filtra para exibir apenas condições extremas
        if (temperatura > 35 || temperatura < 5) {
            climaResultado.innerHTML = `
                <h3>Clima em ${cidade}</h3>
                <p><strong>Temperatura:</strong> ${temperatura}°C</p>
                <p><strong>Umidade:</strong> ${umidade}%</p>
                <p><strong>Condição:</strong> ${condicao}</p>
                <p><em>Condição extrema!</em></p>
            `;
        } else {
            climaResultado.innerHTML = `
                <h3>Clima em ${cidade}</h3>
                <p><strong>Temperatura:</strong> ${temperatura}°C</p>
                <p><strong>Umidade:</strong> ${umidade}%</p>
                <p><strong>Condição:</strong> ${condicao}</p>
                <p><em>Condição não é extrema.</em></p>
            `;
        }
    } catch (error) {
        climaResultado.innerText = "Erro ao consultar o clima. Verifique se o nome da cidade está correto.";
    }
}
