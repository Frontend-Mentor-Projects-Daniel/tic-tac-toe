/**-------------------------
 **   GLOBAL VARIABLES
 *------------------------**/
const buttonX = document.querySelector('.select-block__x-wrapper');
const buttonO = document.querySelector('.select-block__o-wrapper');

/**-------------------------
 **       FUNCTIONS
 *------------------------**/
const handleClickX = (e) => {
  // x and o button images
  const defaultX = document.querySelector('[data-default_x]');
  const defaultO = document.querySelector('[data-default_o]');

  // add gray background to button
  defaultX.parentElement.classList.add('select-block__active');
  // remove gray background from other button
  defaultO.parentElement.classList.remove('select-block__active');

  // change svg fill of currently selected img to main gray
  defaultX.src = './develop/assets/icon-x-outline-small-black.svg';

  // change svg fill of other img to main black
  defaultO.src = './develop/assets/icon-o-outline-small-gray.svg';
};

const handleClickO = (e) => {
  // x and o button images
  const defaultX = document.querySelector('[data-default_x]');
  const defaultO = document.querySelector('[data-default_o]');

  // add gray background to button
  defaultO.parentElement.classList.add('select-block__active');
  // remove gray background from other button
  defaultX.parentElement.classList.remove('select-block__active');

  // change svg fill of currently selected img to main gray
  defaultO.src = './develop/assets/icon-o-outline-small-black.svg';

  // change svg fill of other img to main black
  defaultX.src = './develop/assets/icon-x-outline-small-gray.svg';
};

/**-------------------------
 **    EVENT LISTENERS
 *------------------------**/

// for selecting the x button
buttonX.addEventListener('click', handleClickX);

// for selecting the o button
buttonO.addEventListener('click', handleClickO);
