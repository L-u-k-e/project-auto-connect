module.exports = {
  generateRandomInt
};





function generateRandomInt(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum); //e slint-disable-line
}
