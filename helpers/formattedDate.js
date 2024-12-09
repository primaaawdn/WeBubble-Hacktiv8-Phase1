function formattedDate(date) {
    return date.toISOString().split('T')[0];
}

module.exports = formattedDate;
