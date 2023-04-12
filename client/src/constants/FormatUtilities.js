export function formatDate(input) {
    if (input != null) {
        const dateValues = input.split("T")[0];
        const [year, month, day] = dateValues.split("-");
        const formattedDate = [month, "/", day, "/", year];
        return formattedDate;
    } else {
        return input;
    }
}