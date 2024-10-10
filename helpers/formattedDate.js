function formattedDate(date){
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

module.exports = formattedDate;