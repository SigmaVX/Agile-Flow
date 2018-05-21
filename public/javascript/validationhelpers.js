// ===========================================================================================
//
// File name: validationhelpers.js
// Date: May, 2018
// Description: This file provides global validation functions for the user authentication
//  suite. The authorization suite includes login.js, signup.js and member.js .
//
// ===========================================================================================

// ------------------------------------------------------------------------------------------
// 
// GLOBAL HELPER FUNCTIONS
//
// -------------------------------------------------------------------------------------------

(function() {
  // =============================================================================
  // HELPER validation functions
  const MIN_PASS_LENGTH = 7;

  // -------------------------------------------------------------------------------------
  // isEmptyObject() returns true if object is empty, false otherwise
  //
  isEmptyObject = function(obj) {
    return Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype;
  };

  // -----------------------------------------------------------------------------
  // hasAlpha() checks if a string has at least one alphabetic character, lower
  // or upper case
  //
  hasAlpha = function(str) {
    return str.match(/[a-z]/i);
  }

  // -----------------------------------------------------------------------------
  // hasNum() checks if a string has at least one numeric character
  //
  hasNum = function(str) {
    return str.match(/\d+/g);
  }

  // -----------------------------------------------------------------------
  // validEmail() checks if an email is valid
  // source code for regular expression:
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/1373724#1373724
  //
  validEmail = function(email) {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    return re.test(email);
  }

  // -----------------------------------------------------------------------------
  // validPassword() checks for password validity, the password must
  // be greater than MinPassLength, have alpha characters and at least one digit
  //
  validPassword = function(pswd) {
    if (pswd.length >= MIN_PASS_LENGTH && hasAlpha(pswd) && hasNum(pswd)) {
      return true;
    }

    return false;
  }

  displayErrorMessage = function(domElement, errorText) {
    $(domElement).show().
                  removeClass("bg-white").
                  addClass("bg-danger").
                  html(errorText);
  }

})();