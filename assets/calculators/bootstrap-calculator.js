const bootstrapCalculatorTemplate = document.createElement('template');
bootstrapCalculatorTemplate.innerHTML = `
  <style>
    :host {
      --cem: 18px;
      --two-cem: calc(2 * var(--cem));
      --half-cem: calc(0.5 * var(--cem));
      --primary-color: black;
      --background-color: white;
      --text-color: black;
      --result-text-color: white;
      --line-color: gray;
      --standard-radius: var(--half-cem);
      --line-height: 1.5;
      --max-width: calc(25 * var(--cem));
    }
    .calculator {
      font-size: var(--cem);
      max-width: var(--max-width);
      margin: var(--cem) auto;
      padding: var(--cem) var(--cem);
      border: 1px solid black;
      border-radius: var(--standard-radius);
      background-color: var(--background-color);
      color: var(--text-color);
      line-height: var(--line-height);
    }
    h2, h3, p {
      margin: 0;
    }
    .input-group {
      margin: var(--cem) 0;
      display: flex;
      flex-wrap: wrap;
    }
    h2 {
      text-align: center;
    }
    h3 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .calculator-input {
      flex: 1 0 calc(8 * var(--cem));
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .calculator-input label {
      flex: 0 0 100%;
    }
    .calculator-input input {
      font-size: var(--cem);
      min-width: calc(8 * var(--cem));
      margin: calc(0.25 * var(--cem)) var(--half-cem);
      padding: var(--half-cem);
      outline: none;
      border: 1px solid var(--line-color);
      border-radius: var(--standard-radius);
      width: calc(100% - 4 * var(--cem));

      transition: color 150ms ease-in-out,
                  background-color 150ms ease-in-out,
                  border-color 150ms ease-in-out;
    }
    .calculator-input input::-webkit-outer-spin-button,
    .calculator-input input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .calculator-input input[type=number] {
      -moz-appearance: textfield;
    }
    .calculator-input input:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .calculator-input.calculator-input--currency input {
      text-align: left;
    }
    .calculator-input.calculator-input--number input {
      text-align: center;
    }
    .calculator-input.calculator-input--percent input {
      text-align: right;
    }
    .calculator-results {
      margin: 0 var(--cem);
      padding: var(--half-cem);
      text-align: center;
      border-radius: var(--standard-radius);
      background-color: var(--primary-color);
      color: var(--result-text-color);
    }
    .result-value {
      font-size: calc(1.5 * var(--cem));
    }
  </style>
  <div class="calculator">
    <h2>Savings Calculator</h2>
    <section class="calculator-inputs">
      <div class="input-group">
        <div class="calculator-input calculator-input--currency">
          <label for="savings-goal">How much do you want to save?</label>
          <span class="input-prefix">$</span>
          <input type="number" id="savings-goal" name="savings-goal" min="0" step="1" />
        </div>
      </div>
      <div class="input-group">
        <h3>When do you want to achieve your goal?</h3>
        <div class="calculator-input calculator-input--number">
          <label for="years-to-goal">Years</label>
          <input type="number" id="years-to-goal" name="years-to-goal" min="0" step="1" />
        </div>
        <div class="calculator-input calculator-input--number">
          <label for="months-to-goal">Months</label>
          <input type="number" id="months-to-goal" name="months-to-goal" min="0" max="11" step="1" />
        </div>
      </div>
      <div class="input-group">
        <div class="calculator-input calculator-input--percent">
          <label for="interest">How much interest?</label>
          <input type="number" id="interest" name="interest" min="0" step="0.01" />
          <span class="input-suffix">%</span>
        </div>
      </div>
    </section>
    <section class="calculator-results">
      <p class="result-title">Your monthly savings target:</p>
      <p class="result-value"><span id="savings-target"></span> per month</p>
    </section>
  </div>
`;

class BootstrapCalculator extends HTMLElement {
    constructor() {
      super();
      this._root = this.attachShadow({ 'mode': 'open' });
      this.$futureValue = 1250;
      this.$nper = 6;
      this.$interestRate = 0.015;

      this.setCustomStyling();
    }

    setCustomStyling() {
      const cemAttribute = this.attributes.getNamedItem('cem');
      if (cemAttribute) {
        this.style.setProperty("--cem", cemAttribute.value);
      }

      const standardRadiusAttribute = this.attributes.getNamedItem('standard-radius');
      if (standardRadiusAttribute) {
        this.style.setProperty("--standard-radius", standardRadiusAttribute.value);
      }

      const primaryColorAttribute = this.attributes.getNamedItem('primary-color');
      if (primaryColorAttribute) {
        this.style.setProperty("--primary-color", primaryColorAttribute.value);
      }

      const backgroundColorAttribute = this.attributes.getNamedItem('background-color');
      if (backgroundColorAttribute) {
        this.style.setProperty("--background-color", backgroundColorAttribute.value);
      }

      const textColorAttribute = this.attributes.getNamedItem('text-color');
      if (textColorAttribute) {
        this.style.setProperty("--text-color", textColorAttribute.value);
      }

      const resultTextColorAttribute = this.attributes.getNamedItem('result-text-color');
      if (resultTextColorAttribute) {
        this.style.setProperty("--result-text-color", resultTextColorAttribute.value);
      }

      const lineColorAttribute = this.attributes.getNamedItem('line-color');
      if (lineColorAttribute) {
        this.style.setProperty("--line-text-color", lineColorAttribute.value);
      }

      const lineHeightAttribute = this.attributes.getNamedItem('line-height');
      if (lineHeightAttribute) {
        this.style.setProperty("--line-height", lineHeightAttribute.value);
      }

      const maxWidthAttribute = this.attributes.getNamedItem('max-width');
      if (maxWidthAttribute) {
        this.style.setProperty("--max-width", maxWidthAttribute.value);
      }
    }

    connectedCallback() {
      this._root.appendChild(bootstrapCalculatorTemplate.content.cloneNode(true));
      this.$savingsGoalElement = this._root.querySelector('input#savings-goal');
      this.$yearsElement = this._root.querySelector('input#years-to-goal');
      this.$monthsElement = this._root.querySelector('input#months-to-goal');
      this.$interestElement = this._root.querySelector('input#interest');
      this.$resultElement = this._root.querySelector('#savings-target');

      if (!this.$savingsGoalElement || !this.$yearsElement || !this.$monthsElement || !this.$interestRate) return;

      this.$savingsGoalElement.addEventListener('change', this.updateSavingsGoal.bind(this));
      this.$yearsElement.addEventListener('change', this.updateNper.bind(this));
      this.$monthsElement.addEventListener('change', this.updateNper.bind(this));
      this.$interestElement.addEventListener('change', this.updateInterest.bind(this));

      this._render();
    }

    updateSavingsGoal() {
      this.$futureValue = Math.max(parseInt(this.$savingsGoalElement.value || 0), 0);
      this._render();
    }

    updateNper() {
      const years = parseInt(this.$yearsElement.value || 0);
      const months = parseInt(this.$monthsElement.value || 0);
      this.$nper = Math.max(12 * years + months, 1);
      this._render();
    }

    updateInterest() {
      this.$interestRate = Math.max(parseFloat(this.$interestElement.value || 0) / 100.0, 0);
      this._render();
    }

    disconnectedCallback() { }

    _render() {
        this.$savingsGoalElement.value = this.$futureValue.toFixed(0);
        this.$yearsElement.value = Math.floor(this.$nper / 12).toFixed(0);
        this.$monthsElement.value = (this.$nper % 12).toFixed(0);
        this.$interestElement.value = (this.$interestRate * 100.0).toFixed(2);

        if (!this.$resultElement) return;
        this.$resultElement.innerHTML = '';
        let monthlyGoal;
        if (this.$interestRate === 0) {
          monthlyGoal = this.$futureValue / this.$nper;
        } else {
          const trueInterest = (1 + this.$interestRate) ** (1.0/12.0) - 1;
          const pmt = this.$futureValue / (((1 + trueInterest) ** this.$nper - 1) / trueInterest);
          monthlyGoal = pmt;
        }

        if (monthlyGoal < 1.0) {
          this.$resultElement.innerHTML = "Less than $1";
        } else {
          this.$resultElement.innerHTML = `$${monthlyGoal.toFixed(0)}`;
        }
    }
}

window.customElements.define('bootstrap-calculator', BootstrapCalculator);
