document.addEventListener("DOMContentLoaded", async () => {
    const daysContainer = document.getElementById("days-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const currentMonthLabel = document.getElementById("current-month");
    const courtsContainer = document.querySelector(".container"); // Contêiner das quadras
    let selectedDay = null;
    let selectedTime = null;

    const months = [
        { name: "Janeiro", days: 31 },
        { name: "Fevereiro", days: 28 }, 
        { name: "Março", days: 31 },
        { name: "Abril", days: 30 },
        { name: "Maio", days: 31 },
        { name: "Junho", days: 30 },
        { name: "Julho", days: 31 },
        { name: "Agosto", days: 31 },
        { name: "Setembro", days: 30 },
        { name: "Outubro", days: 31 },
        { name: "Novembro", days: 30 },
        { name: "Dezembro", days: 31 }
    ];

    const loggedUserId = localStorage.getItem("userId") || null;

    if (!loggedUserId) {
        alert("Usuário não está logado. Faça o login primeiro.");
        window.location.href = "login.html";
        return;
    }

    let currentMonthIndex = 0; 
    let startIndex = 0;
    const maxVisibleDays = 7;

    async function loadCourts() {
        try {
            const response = await fetch("http://localhost:3030/quadras");
            if (!response.ok) {
                throw new Error("Erro ao carregar quadras");
            }
            const courts = await response.json();

            renderCourts(courts);
        } catch (error) {
            console.error("Erro ao carregar quadras:", error);
            alert("Não foi possível carregar as quadras. Tente novamente mais tarde.");
        }
    }

    function renderCourts(courts) {
        courtsContainer.innerHTML = "";
        courts.forEach((court) => {
            const courtElement = document.createElement("div");
            courtElement.classList.add("court");
            courtElement.dataset.courtId = court.id;

            courtElement.innerHTML = `
                <div class="image-container">
                    <div class="court-title">${court.nome}</div>
                    <img src="/Front-End/imagens/quadra 1.png" alt="${court.nome}">
                </div>
                <div class="time-slots">
                    <a href="#" class="time-slot" data-time="16:00 às 17:00">16:00 às 17:00<br>DISPONÍVEL</a>
                    <a href="#" class="time-slot" data-time="17:00 às 18:00">17:00 às 18:00<br>DISPONÍVEL</a>
                    <a href="#" class="time-slot" data-time="18:00 às 19:00">18:00 às 19:00<br>DISPONÍVEL</a>
                    <a href="#" class="time-slot" data-time="19:00 às 20:00">19:00 às 20:00<br>DISPONÍVEL</a>
                    <a href="#" class="time-slot" data-time="20:00 às 21:00">20:00 às 21:00<br>DISPONÍVEL</a>
                    <a href="#" class="time-slot" data-time="21:00 às 22:00">21:00 às 22:00<br>DISPONÍVEL</a>
                </div>
            `;

            courtsContainer.appendChild(courtElement);


            const timeSlots = courtElement.querySelectorAll(".time-slot");
            timeSlots.forEach((slot) => {
                slot.addEventListener("click", (event) => {
                    event.preventDefault();

                    document.querySelectorAll(".time-slot").forEach((s) => s.classList.remove("selected"));

                    slot.classList.add("selected");
                    selectedTime = slot.dataset.time;

                    console.log(`Horário selecionado: ${selectedTime}`);
                });

                slot.addEventListener("dblclick", () => {
                    if (selectedDay && selectedTime) {
                        const { name } = months[currentMonthIndex];
                        const courtId = courtElement.dataset.courtId;
                
                        if (!courtId) {
                            alert("ID da quadra não encontrado.");
                            return;
                        }
                
                        const query = `detalhes-horario.html?mes=${name}&dia=${selectedDay}&horario=${selectedTime}&id_usuario=${loggedUserId}&id_quadra=${courtId}`;
                        window.location.href = query;
                    } else {
                        alert("Por favor, selecione um dia e um horário antes de continuar.");
                    }
                });
                
            });
        });
    }

    function updateMonth() {
        const { name, days } = months[currentMonthIndex];
        currentMonthLabel.textContent = `${name} 2025`;
        renderDays(days);
    }

    function renderDays(totalDays) {
        daysContainer.innerHTML = ""; 

        const allDays = Array.from({ length: totalDays }, (_, i) => i + 1);
        const visibleDays = allDays.slice(startIndex, startIndex + maxVisibleDays);
        visibleDays.forEach(day => {
            const dayButton = document.createElement("button");
            dayButton.classList.add("day");
            dayButton.textContent = day;
            dayButton.dataset.day = day;

            dayButton.addEventListener("click", () => {
                const allDayButtons = daysContainer.querySelectorAll(".day");
                allDayButtons.forEach(d => d.classList.remove("selected"));

                dayButton.classList.add("selected");
                selectedDay = day;

                selectedTime = null;
                document.querySelectorAll(".time-slot").forEach(slot => slot.classList.remove("selected"));

                console.log(`Dia selecionado: ${selectedDay}`);
            });

            daysContainer.appendChild(dayButton);
        });

        prevButton.disabled = startIndex === 0;
        nextButton.disabled = startIndex + maxVisibleDays >= totalDays;
    }

    prevMonthButton.addEventListener("click", () => {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            startIndex = 0; 
            updateMonth();
        }
    });

    nextMonthButton.addEventListener("click", () => {
        if (currentMonthIndex < months.length - 1) {
            currentMonthIndex++;
            startIndex = 0; 
            updateMonth();
        }
    });

    prevButton.addEventListener("click", () => {
        if (startIndex > 0) {
            startIndex -= maxVisibleDays;
            renderDays(months[currentMonthIndex].days);
        }
    });

    nextButton.addEventListener("click", () => {
        if (startIndex + maxVisibleDays < months[currentMonthIndex].days) {
            startIndex += maxVisibleDays;
            renderDays(months[currentMonthIndex].days);
        }
    });

    updateMonth();
    await loadCourts(); // Carregar quadras dinamicamente
});
