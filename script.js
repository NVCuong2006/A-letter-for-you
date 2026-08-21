window.onload = () => {
    const progress = document.querySelector(".progress");
    const percentage = document.querySelector(".percent");
    const loading = document.getElementById("loading");
    const letter = document.querySelector(".letter");

    let percent = 0;

    const interval = setInterval(() => {
        percent++;

        progress.style.width = percent + "%";
        percentage.textContent = percent + "%";

        
        
        if (percent >= 100) {
            clearInterval(interval);

            setTimeout(() => {
                loading.style.display = "none";
                letter.classList.remove("hidden");
            }, 500);
        }
    }, 20);

    
};