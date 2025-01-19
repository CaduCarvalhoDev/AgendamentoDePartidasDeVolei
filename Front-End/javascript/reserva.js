document.addEventListener("DOMContentLoaded", () => {
    const daysContainer = document.getElementById("days-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");
    const currentMonthLabel = document.getElementById("current-month");
    const timeSlots = document.querySelectorAll(".time-slot");

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

    let currentMonthIndex = 0; 
    let startIndex = 0;
    const maxVisibleDays = 7;

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
                timeSlots.forEach(slot => slot.classList.remove("selected"));

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

    timeSlots.forEach(slot => {
        slot.addEventListener("click", (event) => {
            event.preventDefault();

            timeSlots.forEach(s => s.classList.remove("selected"));

            slot.classList.add("selected");
            selectedTime = slot.dataset.time;

            console.log(`Horário selecionado: ${selectedTime}`);
        });
    });

    timeSlots.forEach(slot => {
        slot.addEventListener("dblclick", () => {
            if (selectedDay && selectedTime) {
                const { name } = months[currentMonthIndex];
                const query = `detalhes-horario.html?mes=${name}&dia=${selectedDay}&horario=${selectedTime}`;
                window.location.href = query;
            } else {
                alert("Por favor, selecione um dia e um horário antes de continuar.");
            }
        });
    });

    updateMonth();
});



function removerQuadra(nomeQuadra) {
    if (confirm(`Tem certeza que deseja remover ${nomeQuadra}?`)) {
        
        alert(`${nomeQuadra} removida com sucesso.`);
    }
}