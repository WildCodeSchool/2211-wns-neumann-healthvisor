export const message = (message: string, code: string) => {
    const divMessage = document.getElementById('add-flash');
    if (!divMessage) return
    divMessage.classList.add("open");
    if (code === "error") divMessage.style.backgroundColor = "red";
    else divMessage.style.backgroundColor = "green";


    divMessage.textContent = message;

    setTimeout(() => {
        divMessage.classList.remove("open");
    }, 5000)

}