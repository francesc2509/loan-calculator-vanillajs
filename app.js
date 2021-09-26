document.addEventListener('DOMContentLoaded', (event) => {
  const loanForm = document.getElementById('loan-form');
  const loadingDiv = document.getElementById('loading');

  loanForm.addEventListener('submit', calculate);

  const calculationResultDiv = document.getElementById('calculation-result');

  const monthlyPmtInput = calculationResultDiv.querySelector("#monthly-pmt");
  const totalPmtInput = calculationResultDiv.querySelector("#total-pmt");
  const totatlInterestInput = calculationResultDiv.querySelector("#total-interest");

  function calculate(event) {
    console.log('Calculate');

    const principal = parseFloat(loanForm.amount.value);
    const calculatedInterest = parseFloat(loanForm.interest.value) / 100 / 12;
    const calculatedPmts = parseFloat(loanForm.years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPmts)
    const monthly = (principal * x * calculatedInterest)/(x - 1);
    if (isFinite(monthly)) {
      monthlyPmtInput.value = monthly.toFixed(2);
      totalPmtInput.value = (monthly*calculatedPmts).toFixed(2);
      totatlInterestInput.value = ((monthly * calculatedPmts) - principal).toFixed(2);
    } else {
      showError('Please, check your numbers') 
    }

    event.preventDefault();
  }

  function showError(errMsg) {
    const errDiv = document.createElement('div');
    errDiv.classList.add('alert', 'alert-danger');
    errDiv.appendChild(document.createTextNode(errMsg));
    loanForm.appendChild(errDiv);

    setTimeout(() => loanForm.removeChild(errDiv), 3000);
  }
});

