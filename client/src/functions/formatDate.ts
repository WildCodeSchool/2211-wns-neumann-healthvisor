export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.toLocaleDateString('fr');
    const time = date.toLocaleTimeString("fr");
    return `${day} ${time}`;
}