/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/currencyInput/index.ts":
/*!***********************************************!*\
  !*** ./src/components/currencyInput/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrencyInput = void 0;
const numberInput_1 = __webpack_require__(/*! ../numberInput */ "./src/components/numberInput/index.ts");
class CurrencyInput extends numberInput_1.NumberInput {
    constructor() {
        super();
        this.setAttribute('prefix', '$');
    }
}
exports.CurrencyInput = CurrencyInput;
window.customElements.define('currency-input', CurrencyInput);


/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToggleSwitch = exports.ThriftyCalculator = exports.PercentageInput = exports.CurrencyInput = exports.NumberInput = void 0;
const numberInput_1 = __webpack_require__(/*! ./numberInput */ "./src/components/numberInput/index.ts");
Object.defineProperty(exports, "NumberInput", ({ enumerable: true, get: function () { return numberInput_1.NumberInput; } }));
const currencyInput_1 = __webpack_require__(/*! ./currencyInput */ "./src/components/currencyInput/index.ts");
Object.defineProperty(exports, "CurrencyInput", ({ enumerable: true, get: function () { return currencyInput_1.CurrencyInput; } }));
const percentageInput_1 = __webpack_require__(/*! ./percentageInput */ "./src/components/percentageInput/index.ts");
Object.defineProperty(exports, "PercentageInput", ({ enumerable: true, get: function () { return percentageInput_1.PercentageInput; } }));
const thriftyCalculator_1 = __webpack_require__(/*! ./thriftyCalculator */ "./src/components/thriftyCalculator/index.ts");
Object.defineProperty(exports, "ThriftyCalculator", ({ enumerable: true, get: function () { return thriftyCalculator_1.ThriftyCalculator; } }));
const toggleSwitch_1 = __webpack_require__(/*! ./toggleSwitch */ "./src/components/toggleSwitch/index.ts");
Object.defineProperty(exports, "ToggleSwitch", ({ enumerable: true, get: function () { return toggleSwitch_1.ToggleSwitch; } }));


/***/ }),

/***/ "./src/components/numberInput/index.ts":
/*!*********************************************!*\
  !*** ./src/components/numberInput/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberInput = exports.numberInputTemplate = void 0;
exports.numberInputTemplate = document.createElement('template');
const css = `
<style>
  :host {
    --primary-color: blue;
    --error-color: red;
    --line-color: lightgray;
    --meta-color: gray;
    --standard-radius: 0.5rem;
    
    display: inline-block;
    margin: 0.5rem 0;
    width: 8rem;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
  label {
    font-size: 0.875rem;
  }
  div.input-field {
    margin: 0.25rem 0;
    padding: 0.5rem;
    border: 1px solid var(--line-color);
    border-radius: var(--standard-radius);
    background-color: white;
  }
  div.input-field:focus-within {
    border-color: var(--primary-color);
  }
  :host(.error) div.input-field {
    border-color: var(--error-color);
  }
  span.prefix,
  span.suffix {
    font-size: 0.75rem;
    color: var(--meta-color);
  }
  input {
    border: none;
    outline: none;
    width: 5.5rem;
  }
  :host([prefix]) input {
    text-align: left;
  }
  :host([suffix]) input {
    text-align: right;
  }
  div.notes {
    color: var(--meta-color);
    font-size: 0.75rem;
  }
  :host(.error) div.notes {
    color: var(--error-color);
  }
</style>
`;
const html = `
  <label></label>
  <div class="input-field">
    <span class="prefix"></span>
    <input type=number />
    <span class="suffix"></span>
  </div>
  <div class="notes"></div>
`;
exports.numberInputTemplate.innerHTML = css + html;
class NumberInput extends HTMLElement {
    constructor() {
        super();
        this.$label = null;
        this.$prefix = null;
        this.$input = null;
        this.$suffix = null;
        this.$notes = null;
        this.initialRender = true;
        this._root = this.attachShadow({ 'mode': 'open' });
        this.setCustomStyling();
    }
    static get observedAttributes() { return ['standard-radius', 'primary-color', 'line-color', 'error-color', 'meta-color']; }
    setCustomStyling() {
        const standardRadiusAttribute = this.attributes.getNamedItem('standard-radius');
        if (standardRadiusAttribute) {
            this.style.setProperty("--standard-radius", standardRadiusAttribute.value);
        }
        const primaryColorAttribute = this.attributes.getNamedItem('primary-color');
        if (primaryColorAttribute) {
            this.style.setProperty("--primary-color", primaryColorAttribute.value);
        }
        const lineColorAttribute = this.attributes.getNamedItem('line-color');
        if (lineColorAttribute) {
            this.style.setProperty("--line-color", lineColorAttribute.value);
        }
        const errorColorAttribute = this.attributes.getNamedItem('error-color');
        if (errorColorAttribute) {
            this.style.setProperty("--error-color", errorColorAttribute.value);
        }
        const metaColorAttribute = this.attributes.getNamedItem('meta-color');
        if (metaColorAttribute) {
            this.style.setProperty("--meta-color", metaColorAttribute.value);
        }
    }
    connectedCallback() {
        this._root.appendChild(exports.numberInputTemplate.content.cloneNode(true));
        this.$label = this._root.querySelector('label');
        this.$prefix = this._root.querySelector('span.prefix');
        this.$input = this._root.querySelector('input');
        this.$suffix = this._root.querySelector('span.suffix');
        this.$notes = this._root.querySelector('div.notes');
        if (!this.$label || !this.$input || !this.$notes) {
            throw new Error('elements not present');
        }
        if (this.$prefix) {
            this.$prefix.innerHTML = this.inputPrefix();
            this.$prefix.addEventListener('click', this.focusInput.bind(this));
        }
        if (this.$suffix) {
            this.$suffix.innerHTML = this.inputSuffix();
            this.$suffix.addEventListener('click', this.focusInput.bind(this));
        }
        this.$input.id = (this.getAttribute('id') + '-input') || 0;
        this.$input.value = this.initialValue();
        if (this.$input.value) {
            this.setAttribute('value', `${this.currentValue()}`);
        }
        this.$input.placeholder = this.placeholder();
        this.$label.innerHTML = this.label();
        this.$label.htmlFor = (this.getAttribute('id') + '-input') || 0;
        this.$input.addEventListener('input', this.refresh.bind(this));
        this._render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (NumberInput.observedAttributes.includes(name)) {
            this.setCustomStyling();
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this.$input) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this._render.bind(this));
    }
    value() {
        const val = this.getAttribute('value');
        if (!val) {
            return undefined;
        }
        return new Number(val);
    }
    label() {
        return this.getAttribute('label') || '';
    }
    notes() {
        return this.getAttribute('notes') || '';
    }
    inputPrefix() {
        return this.getAttribute('prefix') || '';
    }
    inputSuffix() {
        return this.getAttribute('suffix') || '';
    }
    placeholder() {
        return this.getAttribute('placeholder') || '';
    }
    initialValue() {
        return this.getAttribute('initialValue') || '';
    }
    error() {
        return this.getAttribute('error') || undefined;
    }
    min() {
        const minVal = this.getAttribute('min');
        if (!minVal) {
            return undefined;
        }
        return new Number(minVal);
    }
    max() {
        const maxVal = this.getAttribute('max');
        if (!maxVal) {
            return undefined;
        }
        return new Number(maxVal);
    }
    currentValue() {
        var _a;
        return this.standardizedValue(new Number((_a = this.$input) === null || _a === void 0 ? void 0 : _a.value));
    }
    standardizedValue(val) {
        return val;
    }
    valueString(val) {
        return `${this.inputPrefix()}${val}${this.inputSuffix()}`;
    }
    setError(error) {
        this.setAttribute('error', error);
        this.classList.add('error');
        if (this.$notes) {
            this.$notes.innerHTML = error;
        }
    }
    clearError() {
        this.removeAttribute('error');
        this.classList.remove('error');
        if (this.$notes) {
            this.$notes.innerHTML = this.notes() || '&nbsp;';
        }
    }
    errorMessage() {
        if (this.error()) {
            return this.error();
        }
        const currentMin = this.min();
        if (currentMin && this.standardizedValue(this.currentValue()) < currentMin) {
            return `Must be ${this.valueString(currentMin)} or more`;
        }
        const currentMax = this.max();
        if (currentMax && this.standardizedValue(this.currentValue()) > currentMax) {
            return `Must be ${this.valueString(currentMax)} or less`;
        }
        return false;
    }
    setValue(value) {
        if (!this.$input) {
            return;
        }
        this.$input.value = value.toFixed(2);
        this.setAttribute('value', `${this.currentValue()}`);
    }
    focusInput() {
        if (this.$input) {
            this.$input.focus();
        }
    }
    refresh() {
        this.clearError();
        this._render();
    }
    _render() {
        if (!this.$label || !this.$input || !this.$notes) {
            throw new Error('elements not present');
        }
        const error = this.errorMessage();
        if (!this.initialRender && error) {
            this.setError(error);
        }
        else {
            this.clearError();
        }
        this.initialRender = false;
        this.setAttribute('value', `${this.currentValue()}`);
        this.dispatchEvent(new CustomEvent('onUpdate', { detail: { value: this.value() } }));
    }
}
exports.NumberInput = NumberInput;
window.customElements.define('number-input', NumberInput);


/***/ }),

/***/ "./src/components/percentageInput/index.ts":
/*!*************************************************!*\
  !*** ./src/components/percentageInput/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PercentageInput = void 0;
const numberInput_1 = __webpack_require__(/*! ../numberInput */ "./src/components/numberInput/index.ts");
class PercentageInput extends numberInput_1.NumberInput {
    constructor() {
        super();
        this.setAttribute('suffix', '%');
    }
    currentValue() {
        var _a;
        return new Number((_a = this.$input) === null || _a === void 0 ? void 0 : _a.value) / 100.0;
    }
    standardizedValue(val) {
        return val * 100.0;
    }
}
exports.PercentageInput = PercentageInput;
window.customElements.define('percentage-input', PercentageInput);


/***/ }),

/***/ "./src/components/thriftyCalculator/index.ts":
/*!***************************************************!*\
  !*** ./src/components/thriftyCalculator/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThriftyCalculator = void 0;
class ThriftyCalculator extends HTMLElement {
    constructor() {
        super();
        console.log(`
* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*                                                       *  
* Thrifty Calculators                                   *
*                                                       *
* Calculators Copyright 2021 WhysWorks LLC              *
*                                                       *
* For more information, contact chris@chrisdurheim.com  *
*                                                       *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  `);
        this._root = this.attachShadow({ 'mode': 'open' });
    }
    connectedCallback() {
        this._render();
    }
    disconnectedCallback() { }
    _render() {
    }
}
exports.ThriftyCalculator = ThriftyCalculator;
;


/***/ }),

/***/ "./src/components/toggleSwitch/index.ts":
/*!**********************************************!*\
  !*** ./src/components/toggleSwitch/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToggleSwitch = exports.toggleSwitchTemplate = void 0;
exports.toggleSwitchTemplate = document.createElement('template');
const css = `
<style>
  :host {
    display: inline-block;
    margin: 0.5rem 0;
    width: 8rem;
  }
  label {
    font-size: 0.875rem;
  }
  div.toggle-field {
    margin: 0.25rem 0;
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 0.5rem;
    background-color: white;
  }
  div.toggle-field:focus-within {
    border-color: blue;
  }
  span.label {}
    font-size: 0.75rem;
    color: gray;
  }
  span.label--left {
    text-align: right;
  }
  span.label--right {
    text-align: left;
  }
  input {
    border: none;
    outline: none;
    width: 5.5rem;
  }
  div.notes {
    color: gray;
    font-size: 0.75rem;
  }
  :host(.error) div.notes {
    color: red;
  }
</style>
`;
const html = `
  <label></label>
  <div class="toggle-field">
    <span class="label label--left"></span>
    <input type=number />
    <span class="label label--left"></span>
  </div>
  <div class="notes"></div>
`;
exports.toggleSwitchTemplate.innerHTML = css + html;
class ToggleSwitch extends HTMLElement {
    constructor() {
        super();
        this.$label = null;
        this.$prefix = null;
        this.$input = null;
        this.$suffix = null;
        this.$notes = null;
        this.initialRender = true;
        this._root = this.attachShadow({ 'mode': 'open' });
    }
    connectedCallback() {
        this._root.appendChild(exports.toggleSwitchTemplate.content.cloneNode(true));
        this.$label = this._root.querySelector('label');
        this.$prefix = this._root.querySelector('span.label--left');
        this.$input = this._root.querySelector('input');
        this.$suffix = this._root.querySelector('span.label--right');
        this.$notes = this._root.querySelector('div.notes');
        if (!this.$label || !this.$input || !this.$notes) {
            throw new Error('elements not present');
        }
        if (this.$prefix) {
            this.$prefix.innerHTML = this.inputPrefix();
            this.$prefix.addEventListener('click', this.focusInput.bind(this));
        }
        if (this.$suffix) {
            this.$suffix.innerHTML = this.inputSuffix();
            this.$suffix.addEventListener('click', this.focusInput.bind(this));
        }
        this.$input.id = (this.getAttribute('id') + '-input') || 0;
        this.$input.value = this.initialValue();
        if (this.$input.value) {
            this.setAttribute('value', `${this.currentValue()}`);
        }
        this.$input.placeholder = this.placeholder();
        this.$label.innerHTML = this.label();
        this.$label.htmlFor = (this.getAttribute('id') + '-input') || 0;
        this.$input.addEventListener('input', this.refresh.bind(this));
        this._render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "error" && this._root) {
            this._render();
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this.$input) === null || _a === void 0 ? void 0 : _a.removeEventListener('input', this._render.bind(this));
    }
    value() {
        const val = this.getAttribute('value');
        if (!val) {
            return undefined;
        }
        return new Number(val);
    }
    label() {
        return this.getAttribute('label') || '';
    }
    notes() {
        return this.getAttribute('notes') || '';
    }
    inputPrefix() {
        return this.getAttribute('labelLeft') || '';
    }
    inputSuffix() {
        return this.getAttribute('labelRight') || '';
    }
    placeholder() {
        return this.getAttribute('placeholder') || '';
    }
    initialValue() {
        return this.getAttribute('initialValue') || '';
    }
    error() {
        return this.getAttribute('error') || undefined;
    }
    min() {
        const minVal = this.getAttribute('min');
        if (!minVal) {
            return undefined;
        }
        return new Number(minVal);
    }
    max() {
        const maxVal = this.getAttribute('max');
        if (!maxVal) {
            return undefined;
        }
        return new Number(maxVal);
    }
    currentValue() {
        var _a;
        return this.standardizedValue(new Number((_a = this.$input) === null || _a === void 0 ? void 0 : _a.value));
    }
    standardizedValue(val) {
        return val;
    }
    valueString(val) {
        return `${this.inputPrefix()}${val}${this.inputSuffix()}`;
    }
    setError(error) {
        this.setAttribute('error', error);
        this.classList.add('error');
        if (this.$notes) {
            this.$notes.innerHTML = error;
        }
    }
    clearError() {
        this.removeAttribute('error');
        this.classList.remove('error');
        if (this.$notes) {
            this.$notes.innerHTML = this.notes() || '&nbsp;';
        }
    }
    errorMessage() {
        if (this.error()) {
            return this.error();
        }
        const currentMin = this.min();
        if (currentMin && this.standardizedValue(this.currentValue()) < currentMin) {
            return `Must be ${this.valueString(currentMin)} or more`;
        }
        const currentMax = this.max();
        if (currentMax && this.standardizedValue(this.currentValue()) > currentMax) {
            return `Must be ${this.valueString(currentMax)} or less`;
        }
        return false;
    }
    setValue(value) {
        if (!this.$input) {
            return;
        }
        this.$input.value = value.toFixed(2);
        this.setAttribute('value', `${this.currentValue()}`);
    }
    focusInput() {
        if (this.$input) {
            this.$input.focus();
        }
    }
    refresh() {
        this.clearError();
        this._render();
    }
    _render() {
        if (!this.$label || !this.$input || !this.$notes) {
            throw new Error('elements not present');
        }
        const error = this.errorMessage();
        if (!this.initialRender && error) {
            this.setError(error);
        }
        else {
            this.clearError();
        }
        this.initialRender = false;
        this.setAttribute('value', `${this.currentValue()}`);
        this.dispatchEvent(new CustomEvent('onUpdate', { detail: { value: this.value() } }));
    }
}
exports.ToggleSwitch = ToggleSwitch;
window.customElements.define('toggle-switch', ToggleSwitch);


/***/ }),

/***/ "./src/projects/retirement-calculator/index.ts":
/*!*****************************************************!*\
  !*** ./src/projects/retirement-calculator/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RetirementCalculator = exports.retirementCalculatorTemplate = void 0;
const components_1 = __webpack_require__(/*! ../../components/ */ "./src/components/index.ts");
const formatters_1 = __webpack_require__(/*! ../../utils/formatters */ "./src/utils/formatters.ts");
exports.retirementCalculatorTemplate = document.createElement('template');
const css = `
<style>
  :host {
    font-size: 16px;

    --primary-color: blue;
    --line-color: lightgray;
    --standard-radius: 0.5rem;
    --heading-color: black;

    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;

    box-sizing: border-box;

    margin: 2rem auto;
    padding: 1rem;

    width: calc(100% - 1rem);
    max-width: 20rem;
    
    border: 1px solid var(--line-color);
    border-radius: var(--standard-radius);

    display: flex;
    flex-wrap: wrap;
  }
  .calculator__title {
    color: var(--heading-color);
    font-size: 1.5rem;
    flex: 0 0 100%;
    font-weight: bold;
    text-align: center;
    padding: 0 0 1rem;
  }
  section.inputs-group {
    flex: 0 0 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .calculator__section-title {
    color: var(--heading-color);
    font-size: 1.25rem;
    flex: 0 0 100%;
    margin: 0.5rem 0;
    font-weight: bold;
    padding: 0 0 0.5rem;
    border-bottom: 1px solid var(--line-color);
  }
  .inputs {
    margin: 1rem 0;
    flex: 0 0 100%;
  }
  .outputs {
    margin: 1rem 0;
    flex: 0 0 100%;
    padding: 0;
  }
  number-input, currency-input, percentage-input {
    margin: 0.5rem 1rem;
  }

  #calculator__customize {
    border: 1px solid var(--line-color);
    border-radius: var(--standard-radius);

    background-color: WhiteSmoke;
    position: relative;
  }
  #calculator__customize number-input, 
  #calculator__customize toggle-switch, 
  #calculator__customize currency-input, 
  #calculator__customize percentage-input {
    display: none;
  }

  #calculator__customize.expanded number-input,
  #calculator__customize.expanded toggle-switch, 
  #calculator__customize.expanded currency-input, 
  #calculator__customize.expanded percentage-input {
    display: initial;
  }

  #calculator__customize .calculator__section-title:after {
    content: "";
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI5Mi4zNjJweCIgaGVpZ2h0PSIyOTIuMzYycHgiIHZpZXdCb3g9IjAgMCAyOTIuMzYyIDI5Mi4zNjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Mi4zNjIgMjkyLjM2MjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0DQoJCUMxLjgwNyw3Mi45OTgsMCw3Ny4yNzksMCw4Mi4yMjhjMCw0Ljk0OCwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDdsMTI3LjkwNywxMjcuOTA3YzMuNjIxLDMuNjE3LDcuOTAyLDUuNDI4LDEyLjg1LDUuNDI4DQoJCXM5LjIzMy0xLjgxMSwxMi44NDctNS40MjhMMjg2LjkzNSw5NS4wNzRjMy42MTMtMy42MTcsNS40MjctNy44OTgsNS40MjctMTIuODQ3QzI5Mi4zNjIsNzcuMjc5LDI5MC41NDgsNzIuOTk4LDI4Ni45MzUsNjkuMzc3eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=');
    background-size: 100% 100%;
    display: inline-block;
    
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 1.75rem;
    right: 1rem;
    cursor: pointer;
    transition: transform 250ms ease-in-out;
  }
  #calculator__customize.expanded .calculator__section-title:after {
    transform: rotate(-180deg);
  }

  #calculator__customize .calculator__section-title {
    color: var(--heading-color);
    flex: 0 0 calc(100% - 2rem);
    padding: 1rem 2rem 1rem 1rem;
    display: inline-block;
    border-bottom: none;
  }

  p.calculator__result {
    font-size: 1.125rem;
  }

  .calculator__progress-bar {
    border: 1px solid var(--line-color);
    height: 2rem;
    border-radius: var(--standard-radius);
    overflow: hidden;
  }

  .calculator__progress-bar .completed {
    display: inline-block;
    border-right: 1px solid var(--line-color);
    height: 2rem;
    background-color: var(--primary-color);;
    position: relative;
    transition: width 250ms ease 0s;
  }

  .calculator__progress-indicator {
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI5Mi4zNjJweCIgaGVpZ2h0PSIyOTIuMzYycHgiIHZpZXdCb3g9IjAgMCAyOTIuMzYyIDI5Mi4zNjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Mi4zNjIgMjkyLjM2MjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0DQoJCUMxLjgwNyw3Mi45OTgsMCw3Ny4yNzksMCw4Mi4yMjhjMCw0Ljk0OCwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDdsMTI3LjkwNywxMjcuOTA3YzMuNjIxLDMuNjE3LDcuOTAyLDUuNDI4LDEyLjg1LDUuNDI4DQoJCXM5LjIzMy0xLjgxMSwxMi44NDctNS40MjhMMjg2LjkzNSw5NS4wNzRjMy42MTMtMy42MTcsNS40MjctNy44OTgsNS40MjctMTIuODQ3QzI5Mi4zNjIsNzcuMjc5LDI5MC41NDgsNzIuOTk4LDI4Ni45MzUsNjkuMzc3eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=');
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: right center;
    display: block;
    width: 1rem;
    height: 1rem;
    padding-left: 0;
    transform: translateX(-0.5rem);
    transition: padding 250ms ease 0s;
  }

  @media screen and (min-width: 768px) {
    :host {
      width: calc(100% - 2rem);
      max-width: 60rem;
    }
    .inputs {
      flex: 1 0 20rem;
    }
    .outputs {
      flex: 1 0 18rem;
      padding: 0 2rem;
    } 
  }
</style>
`;
const html = `
  <div class="calculator__title">Retirement Calculator</div>

  <div class="inputs">
    <section class="inputs-group">
      <div class="calculator__section-title">Enter the Basics</div>
      <number-input label="Current Age" initialValue=35 id="current-age" min=0 max=120></number-input>
      <number-input label="Retirement Age" initialValue=67 id="retirement-age" min=0 max=120></number-input>
      <currency-input label="Current Savings" initialValue=25000 id="current-savings" min=0></currency-input>
      <currency-input label="Monthly Savings" initialValue=750 id="monthly-savings" min=0></currency-input>
      <currency-input label="Annual Income (Pre-tax)" initialValue=100000 id="annual-income" min=0></currency-input>
    </section>

    <section class="inputs-group" id="calculator__customize">
      <div class="calculator__section-title">Customize (optional)</div>
      <percentage-input label="Annual Salary Growth" initialValue=2 id="salary-growth-rate" min=0></percentage-input>
      <percentage-input label="Annual Inflation Rate" initialValue=3 id="inflation-rate" min=0></percentage-input>
      <percentage-input label="Invesmtent Return<br>(pre-retirement)" initialValue=7 id="pre-ret-inv-ror" min=0></percentage-input>
      <percentage-input label="Invesmtent Return<br>(in retirement)" initialValue=5 id="post-ret-inv-ror" min=0></percentage-input>
      <currency-input label="Monthly Retirement Spending" initialValue=4878.91 id="monthly-ret-spending" min=0 notes="Calculated as 80% of pre-retirement income - in today's dollars"></currency-input>
      <currency-input label="Other Retirement Income (monthly)" initialValue=1600 id="monthly-ret-other-income" min=0 notes="In today's dollars"></currency-input>
      <percentage-input label="Expected Withdrawal Rate" initialValue=4 id="withdrawal-rate" min=0></percentage-input>
    </section>
  </div>

  <div class="outputs">
    <section>
      <div class="calculator__section-title">Your Results</div>
      <p class="calculator__result">To retire on-schedule, you'll need <span id="amount-needed"></span>.</p>
      <p class="calculator__result">You're on track to have about <span id="amount-available"></span>.</p>
      <p class="calculator__result">You're <span id="percent-progress"></span> of the way there.</p>
    </section>
    <section>
      <div class="calculator__progress-indicator">
      </div>
      <div class="calculator__progress-bar">
        <span class="completed"></span>
        <span class="to-completeleft"></span>
      </div>
    </section>
  </div>
  
`;
exports.retirementCalculatorTemplate.innerHTML = css + html;
class RetirementCalculator extends components_1.ThriftyCalculator {
    constructor() {
        super();
        this.$currentAge = null;
        this.$retirementAge = null;
        this.$annualIncome = null;
        this.$currentSavings = null;
        this.$monthlySavings = null;
        this.$annualSalaryGrowth = null;
        this.$investmentPreRetRor = null;
        this.$investmentPostRetRor = null;
        this.$withdrawalRate = null;
        this.$inflationRate = null;
        this.$retSpending = null;
        this.$retIncome = null;
        this.$amountNeeded = null;
        this.$amountAvailable = null;
        this.$percentProgress = null;
        this.$progressBar = null;
        this.$progressIndicator = null;
        this.$toggleSwitch = null;
        this.$expandBox = null;
        this.$expandLink = null;
        this.setCustomStyling();
    }
    setCustomStyling() {
        const standardRadiusAttribute = this.attributes.getNamedItem('standard-radius');
        if (standardRadiusAttribute) {
            this.style.setProperty("--standard-radius", standardRadiusAttribute.value);
        }
        const primaryColorAttribute = this.attributes.getNamedItem('primary-color');
        if (primaryColorAttribute) {
            this.style.setProperty("--primary-color", primaryColorAttribute.value);
        }
        const lineColorAttribute = this.attributes.getNamedItem('line-color');
        if (lineColorAttribute) {
            this.style.setProperty("--line-color", lineColorAttribute.value);
        }
        const errorColorAttribute = this.attributes.getNamedItem('error-color');
        if (errorColorAttribute) {
            this.style.setProperty("--error-color", errorColorAttribute.value);
        }
        const metaColorAttribute = this.attributes.getNamedItem('meta-color');
        if (metaColorAttribute) {
            this.style.setProperty("--meta-color", metaColorAttribute.value);
        }
        const headingColorAttribute = this.attributes.getNamedItem('heading-color');
        if (headingColorAttribute) {
            this.style.setProperty("--heading-color", headingColorAttribute.value);
        }
    }
    passDownAttribute(element, attributeName) {
        const attributeValue = this.getAttribute(attributeName);
        if (attributeValue) {
            element.setAttribute(attributeName, attributeValue);
        }
    }
    connectedCallback() {
        this._root.appendChild(exports.retirementCalculatorTemplate.content.cloneNode(true));
        this.$currentAge = this._root.querySelector('number-input');
        this.$retirementAge = this._root.querySelector('#retirement-age');
        this.$annualIncome = this._root.querySelector('#annual-income');
        this.$currentSavings = this._root.querySelector('#current-savings');
        this.$monthlySavings = this._root.querySelector('#monthly-savings');
        this.$annualSalaryGrowth = this._root.querySelector('#salary-growth-rate');
        this.$investmentPreRetRor = this._root.querySelector('#pre-ret-inv-ror');
        this.$investmentPostRetRor = this._root.querySelector('#post-ret-inv-ror');
        this.$withdrawalRate = this._root.querySelector('#withdrawal-rate');
        this.$inflationRate = this._root.querySelector('#inflation-rate');
        this.$retSpending = this._root.querySelector('#monthly-ret-spending');
        this.$retIncome = this._root.querySelector('#monthly-ret-other-income');
        this.$expandBox = this._root.querySelector('#calculator__customize');
        this.$amountNeeded = this._root.querySelector('#amount-needed');
        this.$amountAvailable = this._root.querySelector('#amount-available');
        this.$percentProgress = this._root.querySelector('#percent-progress');
        this.$progressBar = this._root.querySelector('.calculator__progress-bar .completed');
        this.$progressIndicator = this._root.querySelector('.calculator__progress-indicator');
        const childElements = [this.$currentAge, this.$retirementAge, this.$annualIncome,
            this.$currentSavings, this.$monthlySavings, this.$annualSalaryGrowth,
            this.$investmentPreRetRor, this.$investmentPostRetRor, this.$withdrawalRate,
            this.$inflationRate, this.$retSpending, this.$retIncome];
        for (const ele of childElements) {
            if (ele) {
                this.passDownAttribute(ele, 'standard-radius');
                this.passDownAttribute(ele, 'primary-color');
                this.passDownAttribute(ele, 'line-color');
                this.passDownAttribute(ele, 'error-color');
                this.passDownAttribute(ele, 'meta-color');
                ele.addEventListener('onUpdate', this._render.bind(this));
            }
        }
        if (!this.$expandBox) {
            return;
        }
        this.$expandLink = this.$expandBox.querySelector('.calculator__section-title');
        if (!this.$expandLink) {
            return;
        }
        this.$expandLink.addEventListener('click', this.toggleExpand.bind(this));
        if (!this.$annualIncome || !this.$inflationRate || !this.$annualSalaryGrowth) {
            return;
        }
        this.$annualIncome.addEventListener('onUpdate', this._updateRetSpending.bind(this));
        this.$inflationRate.addEventListener('onUpdate', this._updateRetSpending.bind(this));
        this.$annualSalaryGrowth.addEventListener('onUpdate', this._updateRetSpending.bind(this));
        this._render();
    }
    disconnectedCallback() { }
    currentAge() { var _a; return ((_a = this.$currentAge) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    retirementAge() { var _a; return ((_a = this.$retirementAge) === null || _a === void 0 ? void 0 : _a.value()) || 67; }
    annualIncome() { var _a; return ((_a = this.$annualIncome) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    currentSavings() { var _a; return ((_a = this.$currentSavings) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    monthlySavings() { var _a; return ((_a = this.$monthlySavings) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    annualSalaryGrowth() { var _a; return ((_a = this.$annualSalaryGrowth) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    investmentPreRetRor() { var _a; return ((_a = this.$investmentPreRetRor) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    investmentPostRetRor() { var _a; return ((_a = this.$investmentPostRetRor) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    withdrawalRate() { var _a; return ((_a = this.$withdrawalRate) === null || _a === void 0 ? void 0 : _a.value()) || 0.04; }
    inflationRate() { var _a; return ((_a = this.$inflationRate) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    retSpending() { var _a; return ((_a = this.$retSpending) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    retIncome() { var _a; return ((_a = this.$retIncome) === null || _a === void 0 ? void 0 : _a.value()) || 0; }
    futureValue(presentValue, rate, nper) {
        return presentValue * (1 + rate) ** nper;
    }
    futureValueAnnuity(pmt, rate, nper, growth = 0) {
        if (Math.abs(rate - growth) < Number.EPSILON) {
            return pmt * nper * (1 + rate) ** (nper - 1);
        }
        return pmt * ((1 + rate) ** nper - (1 + growth) ** nper) / (rate - growth);
    }
    toggleExpand() {
        if (!this.$expandLink || !this.$expandBox) {
            return;
        }
        this.$expandBox.classList.toggle('expanded');
    }
    _updateRetSpending() {
        if (!this.$retSpending) {
            return;
        }
        const yearsToRet = this.retirementAge() - this.currentAge();
        const salaryAtRetirement = this.annualIncome() * (1 + this.annualSalaryGrowth()) ** yearsToRet;
        const expensesAtRetirement = salaryAtRetirement * 0.8;
        const retExpensesToday = expensesAtRetirement / (1 + this.inflationRate()) ** yearsToRet;
        this.$retSpending.setValue(retExpensesToday / 12);
    }
    _render() {
        var _a, _b, _c, _d;
        if (!this.$amountNeeded || !this.$amountAvailable || !this.$percentProgress || !this.$progressBar || !this.$progressIndicator) {
            return;
        }
        const currAge = this.currentAge();
        const retAge = this.retirementAge();
        if (!currAge || !retAge) {
            return;
        }
        if (currAge >= retAge) {
            (_a = this.$currentAge) === null || _a === void 0 ? void 0 : _a.setError('Current age must be less than retirement age');
            (_b = this.$retirementAge) === null || _b === void 0 ? void 0 : _b.setError('Retirement age must be greater than current age');
            return;
        }
        else {
            (_c = this.$currentAge) === null || _c === void 0 ? void 0 : _c.clearError();
            (_d = this.$retirementAge) === null || _d === void 0 ? void 0 : _d.clearError();
        }
        const yearsToRet = this.retirementAge() - this.currentAge();
        const originalSavingsValue = this.futureValue(this.currentSavings(), this.investmentPreRetRor(), yearsToRet);
        const newSavingsValue = this.futureValueAnnuity(this.monthlySavings() * 12, this.investmentPreRetRor(), yearsToRet, this.annualSalaryGrowth());
        const totalAtRetirement = originalSavingsValue + newSavingsValue;
        const gapToFinance = Math.max(0, this.retSpending() - this.retIncome());
        const amountNeeded = 12 * gapToFinance * (1 + this.inflationRate()) ** yearsToRet / this.withdrawalRate();
        this.$amountNeeded.innerHTML = formatters_1.currencyFormatter.format(amountNeeded);
        this.$amountAvailable.innerHTML = formatters_1.currencyFormatter.format(totalAtRetirement);
        if (amountNeeded > 0) {
            this.$percentProgress.innerHTML = formatters_1.percentFormatter.format(totalAtRetirement / amountNeeded);
            this.$progressBar.style.width = formatters_1.percentFormatter.format(Math.max(0, totalAtRetirement / amountNeeded));
            this.$progressIndicator.style.paddingLeft = formatters_1.percentFormatter.format(Math.min(1, totalAtRetirement / amountNeeded));
        }
        else {
            this.$percentProgress.innerHTML = formatters_1.percentFormatter.format(1);
            this.$progressBar.style.width = formatters_1.percentFormatter.format(1);
            this.$progressIndicator.style.paddingLeft = formatters_1.percentFormatter.format(1);
        }
    }
}
exports.RetirementCalculator = RetirementCalculator;
window.customElements.define('retirement-calculator', RetirementCalculator);


/***/ }),

/***/ "./src/utils/formatters.ts":
/*!*********************************!*\
  !*** ./src/utils/formatters.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.percentFormatter = exports.currencyFormatter = void 0;
exports.currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
exports.percentFormatter = new Intl.NumberFormat('en-US', { style: 'percent' });


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RetirementCalculator = exports.PercentageInput = exports.CurrencyInput = void 0;
const currencyInput_1 = __webpack_require__(/*! ./components/currencyInput */ "./src/components/currencyInput/index.ts");
Object.defineProperty(exports, "CurrencyInput", ({ enumerable: true, get: function () { return currencyInput_1.CurrencyInput; } }));
const percentageInput_1 = __webpack_require__(/*! ./components/percentageInput */ "./src/components/percentageInput/index.ts");
Object.defineProperty(exports, "PercentageInput", ({ enumerable: true, get: function () { return percentageInput_1.PercentageInput; } }));
const retirement_calculator_1 = __webpack_require__(/*! ./projects/retirement-calculator */ "./src/projects/retirement-calculator/index.ts");
Object.defineProperty(exports, "RetirementCalculator", ({ enumerable: true, get: function () { return retirement_calculator_1.RetirementCalculator; } }));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maW4tY2FsY3MvLi9zcmMvY29tcG9uZW50cy9jdXJyZW5jeUlucHV0L2luZGV4LnRzIiwid2VicGFjazovL2Zpbi1jYWxjcy8uL3NyYy9jb21wb25lbnRzL2luZGV4LnRzIiwid2VicGFjazovL2Zpbi1jYWxjcy8uL3NyYy9jb21wb25lbnRzL251bWJlcklucHV0L2luZGV4LnRzIiwid2VicGFjazovL2Zpbi1jYWxjcy8uL3NyYy9jb21wb25lbnRzL3BlcmNlbnRhZ2VJbnB1dC9pbmRleC50cyIsIndlYnBhY2s6Ly9maW4tY2FsY3MvLi9zcmMvY29tcG9uZW50cy90aHJpZnR5Q2FsY3VsYXRvci9pbmRleC50cyIsIndlYnBhY2s6Ly9maW4tY2FsY3MvLi9zcmMvY29tcG9uZW50cy90b2dnbGVTd2l0Y2gvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZmluLWNhbGNzLy4vc3JjL3Byb2plY3RzL3JldGlyZW1lbnQtY2FsY3VsYXRvci9pbmRleC50cyIsIndlYnBhY2s6Ly9maW4tY2FsY3MvLi9zcmMvdXRpbHMvZm9ybWF0dGVycy50cyIsIndlYnBhY2s6Ly9maW4tY2FsY3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmluLWNhbGNzLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSx5R0FBNkM7QUFDN0MsTUFBYSxhQUFjLFNBQVEseUJBQVc7SUFDNUM7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQUxELHNDQUtDO0FBR0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDVDlELHdHQUE0QztBQU1uQyw2RkFOQSx5QkFBVyxRQU1BO0FBTHBCLDhHQUFnRDtBQUsxQiwrRkFMYiw2QkFBYSxR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QUUsQ0FBQzs7Ozs7OztVQ0RwRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBLHlIQUEyRDtBQUlsRCwrRkFKQSw2QkFBYSxRQUlBO0FBSHRCLCtIQUErRDtBQUd2QyxpR0FIZixpQ0FBZSxRQUdlO0FBRnZDLDZJQUF3RTtBQUUvQixzR0FGaEMsNENBQW9CLFFBRWdDIiwiZmlsZSI6InRocmlmdHktY2FsY3VsYXRvci1idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOdW1iZXJJbnB1dCB9IGZyb20gJy4uL251bWJlcklucHV0JztcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeUlucHV0IGV4dGVuZHMgTnVtYmVySW5wdXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwcmVmaXgnLCAnJCcpO1xuICB9XG59XG5cbi8vIERlZmluZSB0aGUgZWxlbWVudCBpbiB0aGUgd2luZG93IG5hbWVzcGFjZVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY3VycmVuY3ktaW5wdXQnLCBDdXJyZW5jeUlucHV0KTtcbiIsImltcG9ydCB7IE51bWJlcklucHV0IH0gZnJvbSAnLi9udW1iZXJJbnB1dCc7XG5pbXBvcnQgeyBDdXJyZW5jeUlucHV0IH0gZnJvbSAnLi9jdXJyZW5jeUlucHV0JztcbmltcG9ydCB7IFBlcmNlbnRhZ2VJbnB1dCB9IGZyb20gJy4vcGVyY2VudGFnZUlucHV0JztcbmltcG9ydCB7IFRocmlmdHlDYWxjdWxhdG9yIH0gZnJvbSAnLi90aHJpZnR5Q2FsY3VsYXRvcic7XG5pbXBvcnQgeyBUb2dnbGVTd2l0Y2ggfSBmcm9tICcuL3RvZ2dsZVN3aXRjaCc7XG5cbmV4cG9ydCB7IE51bWJlcklucHV0LCBDdXJyZW5jeUlucHV0LCBQZXJjZW50YWdlSW5wdXQsIFRocmlmdHlDYWxjdWxhdG9yLCBUb2dnbGVTd2l0Y2ggfTtcbiIsImV4cG9ydCBjb25zdCBudW1iZXJJbnB1dFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcblxuY29uc3QgY3NzID0gYFxuPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgLS1wcmltYXJ5LWNvbG9yOiBibHVlO1xuICAgIC0tZXJyb3ItY29sb3I6IHJlZDtcbiAgICAtLWxpbmUtY29sb3I6IGxpZ2h0Z3JheTtcbiAgICAtLW1ldGEtY29sb3I6IGdyYXk7XG4gICAgLS1zdGFuZGFyZC1yYWRpdXM6IDAuNXJlbTtcbiAgICBcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICB3aWR0aDogOHJlbTtcbiAgfVxuICBpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIFxuICBpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24geyBcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7IFxuICB9XG5cbiAgaW5wdXRbdHlwZT1udW1iZXJdIHtcbiAgICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcbiAgfVxuICBsYWJlbCB7XG4gICAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgfVxuICBkaXYuaW5wdXQtZmllbGQge1xuICAgIG1hcmdpbjogMC4yNXJlbSAwO1xuICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saW5lLWNvbG9yKTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1zdGFuZGFyZC1yYWRpdXMpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB9XG4gIGRpdi5pbnB1dC1maWVsZDpmb2N1cy13aXRoaW4ge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvcik7XG4gIH1cbiAgOmhvc3QoLmVycm9yKSBkaXYuaW5wdXQtZmllbGQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tZXJyb3ItY29sb3IpO1xuICB9XG4gIHNwYW4ucHJlZml4LFxuICBzcGFuLnN1ZmZpeCB7XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1tZXRhLWNvbG9yKTtcbiAgfVxuICBpbnB1dCB7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgd2lkdGg6IDUuNXJlbTtcbiAgfVxuICA6aG9zdChbcHJlZml4XSkgaW5wdXQge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gIH1cbiAgOmhvc3QoW3N1ZmZpeF0pIGlucHV0IHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgfVxuICBkaXYubm90ZXMge1xuICAgIGNvbG9yOiB2YXIoLS1tZXRhLWNvbG9yKTtcbiAgICBmb250LXNpemU6IDAuNzVyZW07XG4gIH1cbiAgOmhvc3QoLmVycm9yKSBkaXYubm90ZXMge1xuICAgIGNvbG9yOiB2YXIoLS1lcnJvci1jb2xvcik7XG4gIH1cbjwvc3R5bGU+XG5gO1xuY29uc3QgaHRtbCA9IGBcbiAgPGxhYmVsPjwvbGFiZWw+XG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxuICAgIDxzcGFuIGNsYXNzPVwicHJlZml4XCI+PC9zcGFuPlxuICAgIDxpbnB1dCB0eXBlPW51bWJlciAvPlxuICAgIDxzcGFuIGNsYXNzPVwic3VmZml4XCI+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm5vdGVzXCI+PC9kaXY+XG5gO1xuXG5udW1iZXJJbnB1dFRlbXBsYXRlLmlubmVySFRNTCA9IGNzcyArIGh0bWw7XG4gICAgICBcbmV4cG9ydCBjbGFzcyBOdW1iZXJJbnB1dCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgcHJvdGVjdGVkIF9yb290OiBTaGFkb3dSb290O1xuXG4gIHByb3RlY3RlZCAkbGFiZWw6IEhUTUxMYWJlbEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRwcmVmaXg6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRpbnB1dDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJHN1ZmZpeDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJG5vdGVzOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIHByb3RlY3RlZCBpbml0aWFsUmVuZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHsgcmV0dXJuIFsnc3RhbmRhcmQtcmFkaXVzJywgJ3ByaW1hcnktY29sb3InLCAnbGluZS1jb2xvcicsICdlcnJvci1jb2xvcicsICdtZXRhLWNvbG9yJ107IH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7J21vZGUnOiAnb3BlbicgfSk7XG4gICAgdGhpcy5zZXRDdXN0b21TdHlsaW5nKCk7XG4gIH1cblxuICBzZXRDdXN0b21TdHlsaW5nKCkge1xuICAgIGNvbnN0IHN0YW5kYXJkUmFkaXVzQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnc3RhbmRhcmQtcmFkaXVzJyk7XG4gICAgaWYgKHN0YW5kYXJkUmFkaXVzQXR0cmlidXRlKSB7XG4gICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1zdGFuZGFyZC1yYWRpdXNcIiwgc3RhbmRhcmRSYWRpdXNBdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0IHByaW1hcnlDb2xvckF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oJ3ByaW1hcnktY29sb3InKTtcbiAgICBpZiAocHJpbWFyeUNvbG9yQXR0cmlidXRlKSB7XG4gICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wcmltYXJ5LWNvbG9yXCIsIHByaW1hcnlDb2xvckF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbGluZUNvbG9yQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnbGluZS1jb2xvcicpO1xuICAgIGlmIChsaW5lQ29sb3JBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLWxpbmUtY29sb3JcIiwgbGluZUNvbG9yQXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBlcnJvckNvbG9yQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnZXJyb3ItY29sb3InKTtcbiAgICBpZiAoZXJyb3JDb2xvckF0dHJpYnV0ZSkge1xuICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tZXJyb3ItY29sb3JcIiwgZXJyb3JDb2xvckF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWV0YUNvbG9yQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnbWV0YS1jb2xvcicpO1xuICAgIGlmIChtZXRhQ29sb3JBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1ldGEtY29sb3JcIiwgbWV0YUNvbG9yQXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBwb3B1bGF0ZSB0aGUgZWxlbWVudFxuICAgIHRoaXMuX3Jvb3QuYXBwZW5kQ2hpbGQobnVtYmVySW5wdXRUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICB0aGlzLiRsYWJlbCA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcbiAgICB0aGlzLiRwcmVmaXggPSAgdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCdzcGFuLnByZWZpeCcpO1xuICAgIHRoaXMuJGlucHV0ID0gIHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICB0aGlzLiRzdWZmaXggPSAgdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCdzcGFuLnN1ZmZpeCcpO1xuICAgIHRoaXMuJG5vdGVzID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCdkaXYubm90ZXMnKTtcblxuICAgIGlmICghdGhpcy4kbGFiZWwgfHwgIXRoaXMuJGlucHV0IHx8ICF0aGlzLiRub3Rlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdlbGVtZW50cyBub3QgcHJlc2VudCcpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJHByZWZpeCkge1xuICAgICAgdGhpcy4kcHJlZml4LmlubmVySFRNTCA9IHRoaXMuaW5wdXRQcmVmaXgoKTtcbiAgICAgIHRoaXMuJHByZWZpeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZm9jdXNJbnB1dC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kc3VmZml4KSB7XG4gICAgICB0aGlzLiRzdWZmaXguaW5uZXJIVE1MID0gdGhpcy5pbnB1dFN1ZmZpeCgpO1xuICAgICAgdGhpcy4kc3VmZml4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5mb2N1c0lucHV0LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLiRpbnB1dC5pZCA9ICAodGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykgKyAnLWlucHV0JykgfHwgJyc7XG4gICAgdGhpcy4kaW5wdXQudmFsdWUgPSB0aGlzLmluaXRpYWxWYWx1ZSgpO1xuICAgIGlmICh0aGlzLiRpbnB1dC52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgYCR7dGhpcy5jdXJyZW50VmFsdWUoKX1gKTtcbiAgICB9XG4gICAgdGhpcy4kaW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyKCk7XG5cbiAgICB0aGlzLiRsYWJlbC5pbm5lckhUTUwgPSB0aGlzLmxhYmVsKCk7XG4gICAgdGhpcy4kbGFiZWwuaHRtbEZvciA9ICh0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKSArICctaW5wdXQnKSB8fCAnJztcblxuICAgIHRoaXMuJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5yZWZyZXNoLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKE51bWJlcklucHV0Lm9ic2VydmVkQXR0cmlidXRlcy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgdGhpcy5zZXRDdXN0b21TdHlsaW5nKClcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLiRpbnB1dD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9yZW5kZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICB2YWx1ZSgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCd2YWx1ZScpXG4gICAgaWYgKCF2YWwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgTnVtYmVyKHZhbCkgYXMgbnVtYmVyO1xuICB9XG5cbiAgbGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhYmVsJykgfHwgJyc7XG4gIH1cblxuICBub3RlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbm90ZXMnKSB8fCAnJztcbiAgfVxuXG4gIGlucHV0UHJlZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwcmVmaXgnKSB8fCAnJztcbiAgfVxuXG4gIGlucHV0U3VmZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzdWZmaXgnKSB8fCAnJztcbiAgfVxuXG4gIHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpIHx8ICcnO1xuICB9XG5cbiAgaW5pdGlhbFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpbml0aWFsVmFsdWUnKSB8fCAnJztcbiAgfVxuXG4gIGVycm9yKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdlcnJvcicpIHx8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG1pbigpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IG1pblZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtaW4nKVxuICAgIGlmICghbWluVmFsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE51bWJlcihtaW5WYWwpIGFzIG51bWJlcjtcbiAgfVxuXG4gIG1heCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IG1heFZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtYXgnKVxuICAgIGlmICghbWF4VmFsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE51bWJlcihtYXhWYWwpIGFzIG51bWJlcjtcbiAgfVxuXG4gIGN1cnJlbnRWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0YW5kYXJkaXplZFZhbHVlKG5ldyBOdW1iZXIodGhpcy4kaW5wdXQ/LnZhbHVlKSBhcyBudW1iZXIpO1xuICB9XG5cbiAgc3RhbmRhcmRpemVkVmFsdWUodmFsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICB2YWx1ZVN0cmluZyh2YWw6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuaW5wdXRQcmVmaXgoKX0ke3ZhbH0ke3RoaXMuaW5wdXRTdWZmaXgoKX1gXG4gIH1cblxuICBzZXRFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Vycm9yJywgZXJyb3IpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICBpZiAodGhpcy4kbm90ZXMpIHtcbiAgICAgIHRoaXMuJG5vdGVzLmlubmVySFRNTCA9IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyRXJyb3IoKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2Vycm9yJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIGlmICh0aGlzLiRub3Rlcykge1xuICAgICAgdGhpcy4kbm90ZXMuaW5uZXJIVE1MID0gdGhpcy5ub3RlcygpIHx8ICcmbmJzcDsnO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5lcnJvcigpKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvcigpO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRNaW4gPSB0aGlzLm1pbigpO1xuICAgIGlmIChjdXJyZW50TWluICYmIHRoaXMuc3RhbmRhcmRpemVkVmFsdWUodGhpcy5jdXJyZW50VmFsdWUoKSkgPCBjdXJyZW50TWluKSB7XG4gICAgICByZXR1cm4gYE11c3QgYmUgJHt0aGlzLnZhbHVlU3RyaW5nKGN1cnJlbnRNaW4pfSBvciBtb3JlYDtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50TWF4ID0gdGhpcy5tYXgoKTtcbiAgICBpZiAoY3VycmVudE1heCAmJiB0aGlzLnN0YW5kYXJkaXplZFZhbHVlKHRoaXMuY3VycmVudFZhbHVlKCkpID4gY3VycmVudE1heCkge1xuICAgICAgcmV0dXJuIGBNdXN0IGJlICR7dGhpcy52YWx1ZVN0cmluZyhjdXJyZW50TWF4KX0gb3IgbGVzc2A7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlOyAgIFxuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy4kaW5wdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4kaW5wdXQudmFsdWUgPSB2YWx1ZS50b0ZpeGVkKDIpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGAke3RoaXMuY3VycmVudFZhbHVlKCl9YCk7XG4gIH1cblxuICBmb2N1c0lucHV0KCkge1xuICAgIGlmICh0aGlzLiRpbnB1dCkge1xuICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHRoaXMuY2xlYXJFcnJvcigpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgX3JlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuJGxhYmVsIHx8ICF0aGlzLiRpbnB1dCB8fCAhdGhpcy4kbm90ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZWxlbWVudHMgbm90IHByZXNlbnQnKVxuICAgIH1cblxuICAgIGNvbnN0IGVycm9yID0gdGhpcy5lcnJvck1lc3NhZ2UoKTtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbFJlbmRlciAmJiBlcnJvcikge1xuICAgICAgdGhpcy5zZXRFcnJvcihlcnJvcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGVhckVycm9yKCk7XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbFJlbmRlciA9IGZhbHNlO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGAke3RoaXMuY3VycmVudFZhbHVlKCl9YCk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb25VcGRhdGUnLCB7IGRldGFpbDogeyB2YWx1ZTogdGhpcy52YWx1ZSgpIH19KSk7XG4gIH1cbn1cblxuLy8gRGVmaW5lIHRoZSBlbGVtZW50IGluIHRoZSB3aW5kb3cgbmFtZXNwYWNlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdudW1iZXItaW5wdXQnLCBOdW1iZXJJbnB1dCk7XG4iLCJpbXBvcnQgeyBOdW1iZXJJbnB1dCB9IGZyb20gJy4uL251bWJlcklucHV0JztcblxuZXhwb3J0IGNsYXNzIFBlcmNlbnRhZ2VJbnB1dCBleHRlbmRzIE51bWJlcklucHV0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3VmZml4JywgJyUnKTtcbiAgfVxuXG4gIGN1cnJlbnRWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiBuZXcgTnVtYmVyKHRoaXMuJGlucHV0Py52YWx1ZSkgYXMgbnVtYmVyIC8gMTAwLjA7XG4gIH1cblxuICBzdGFuZGFyZGl6ZWRWYWx1ZSh2YWw6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHZhbCAqIDEwMC4wO1xuICB9XG59XG5cbi8vIERlZmluZSB0aGUgZWxlbWVudCBpbiB0aGUgd2luZG93IG5hbWVzcGFjZVxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncGVyY2VudGFnZS1pbnB1dCcsIFBlcmNlbnRhZ2VJbnB1dCk7XG4iLCJleHBvcnQgY2xhc3MgVGhyaWZ0eUNhbGN1bGF0b3IgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHByb3RlY3RlZCBfcm9vdDogU2hhZG93Um9vdDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnNvbGUubG9nKGBcbiogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICBcbiogVGhyaWZ0eSBDYWxjdWxhdG9ycyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qIENhbGN1bGF0b3JzIENvcHlyaWdodCAyMDIxIFdoeXNXb3JrcyBMTEMgICAgICAgICAgICAgICpcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgY29udGFjdCBjaHJpc0BjaHJpc2R1cmhlaW0uY29tICAqXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuICBgKVxuICAgIHRoaXMuX3Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7J21vZGUnOiAnb3BlbicgfSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBMb2FkIGVsZW1lbnQgYWNjZXNzb3JzXG4gICAgLy8gQ2hlY2sgdG8gZW5zdXJlIG9iamVjdHMgdGhhdCBuZWVkIGxpc3RlbmVycyBhcmUgcHJlc2VudFxuICAgIC8vIEFkZCBsaXN0ZW5lcnNcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIC8vIFV0aWxpdHkgZnVuY3Rpb25zIGdvIGhlcmVcbiAgXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge31cblxuICBfcmVuZGVyKCkge1xuICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IHRvZ2dsZVN3aXRjaFRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcblxuY29uc3QgY3NzID0gYFxuPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1hcmdpbjogMC41cmVtIDA7XG4gICAgd2lkdGg6IDhyZW07XG4gIH1cbiAgbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIH1cbiAgZGl2LnRvZ2dsZS1maWVsZCB7XG4gICAgbWFyZ2luOiAwLjI1cmVtIDA7XG4gICAgcGFkZGluZzogMC41cmVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIH1cbiAgZGl2LnRvZ2dsZS1maWVsZDpmb2N1cy13aXRoaW4ge1xuICAgIGJvcmRlci1jb2xvcjogYmx1ZTtcbiAgfVxuICBzcGFuLmxhYmVsIHt9XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgIGNvbG9yOiBncmF5O1xuICB9XG4gIHNwYW4ubGFiZWwtLWxlZnQge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICB9XG4gIHNwYW4ubGFiZWwtLXJpZ2h0IHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG4gIGlucHV0IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICB3aWR0aDogNS41cmVtO1xuICB9XG4gIGRpdi5ub3RlcyB7XG4gICAgY29sb3I6IGdyYXk7XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICB9XG4gIDpob3N0KC5lcnJvcikgZGl2Lm5vdGVzIHtcbiAgICBjb2xvcjogcmVkO1xuICB9XG48L3N0eWxlPlxuYDtcbmNvbnN0IGh0bWwgPSBgXG4gIDxsYWJlbD48L2xhYmVsPlxuICA8ZGl2IGNsYXNzPVwidG9nZ2xlLWZpZWxkXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJsYWJlbCBsYWJlbC0tbGVmdFwiPjwvc3Bhbj5cbiAgICA8aW5wdXQgdHlwZT1udW1iZXIgLz5cbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLS1sZWZ0XCI+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm5vdGVzXCI+PC9kaXY+XG5gO1xuXG50b2dnbGVTd2l0Y2hUZW1wbGF0ZS5pbm5lckhUTUwgPSBjc3MgKyBodG1sO1xuICAgICAgXG5leHBvcnQgY2xhc3MgVG9nZ2xlU3dpdGNoIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBwcm90ZWN0ZWQgX3Jvb3Q6IFNoYWRvd1Jvb3Q7XG5cbiAgcHJvdGVjdGVkICRsYWJlbDogSFRNTExhYmVsRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJHByZWZpeDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJGlucHV0OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkc3VmZml4OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkbm90ZXM6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIGluaXRpYWxSZW5kZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fcm9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsnbW9kZSc6ICdvcGVuJyB9KTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIHBvcHVsYXRlIHRoZSBlbGVtZW50XG4gICAgdGhpcy5fcm9vdC5hcHBlbmRDaGlsZCh0b2dnbGVTd2l0Y2hUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICB0aGlzLiRsYWJlbCA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignbGFiZWwnKTtcbiAgICB0aGlzLiRwcmVmaXggPSAgdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCdzcGFuLmxhYmVsLS1sZWZ0Jyk7XG4gICAgdGhpcy4kaW5wdXQgPSAgdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgIHRoaXMuJHN1ZmZpeCA9ICB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4ubGFiZWwtLXJpZ2h0Jyk7XG4gICAgdGhpcy4kbm90ZXMgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5ub3RlcycpO1xuXG4gICAgaWYgKCF0aGlzLiRsYWJlbCB8fCAhdGhpcy4kaW5wdXQgfHwgIXRoaXMuJG5vdGVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VsZW1lbnRzIG5vdCBwcmVzZW50JylcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kcHJlZml4KSB7XG4gICAgICB0aGlzLiRwcmVmaXguaW5uZXJIVE1MID0gdGhpcy5pbnB1dFByZWZpeCgpO1xuICAgICAgdGhpcy4kcHJlZml4LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5mb2N1c0lucHV0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRzdWZmaXgpIHtcbiAgICAgIHRoaXMuJHN1ZmZpeC5pbm5lckhUTUwgPSB0aGlzLmlucHV0U3VmZml4KCk7XG4gICAgICB0aGlzLiRzdWZmaXguYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmZvY3VzSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuJGlucHV0LmlkID0gICh0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKSArICctaW5wdXQnKSB8fCAnJztcbiAgICB0aGlzLiRpbnB1dC52YWx1ZSA9IHRoaXMuaW5pdGlhbFZhbHVlKCk7XG4gICAgaWYgKHRoaXMuJGlucHV0LnZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgJHt0aGlzLmN1cnJlbnRWYWx1ZSgpfWApO1xuICAgIH1cbiAgICB0aGlzLiRpbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIoKTtcblxuICAgIHRoaXMuJGxhYmVsLmlubmVySFRNTCA9IHRoaXMubGFiZWwoKTtcbiAgICB0aGlzLiRsYWJlbC5odG1sRm9yID0gKHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpICsgJy1pbnB1dCcpIHx8ICcnO1xuXG4gICAgdGhpcy4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLnJlZnJlc2guYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAobmFtZSA9PT0gXCJlcnJvclwiICYmIHRoaXMuX3Jvb3QpIHtcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuJGlucHV0Py5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX3JlbmRlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHZhbHVlKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICBpZiAoIXZhbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBOdW1iZXIodmFsKSBhcyBudW1iZXI7XG4gIH1cblxuICBsYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbGFiZWwnKSB8fCAnJztcbiAgfVxuXG4gIG5vdGVzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdub3RlcycpIHx8ICcnO1xuICB9XG5cbiAgaW5wdXRQcmVmaXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhYmVsTGVmdCcpIHx8ICcnO1xuICB9XG5cbiAgaW5wdXRTdWZmaXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhYmVsUmlnaHQnKSB8fCAnJztcbiAgfVxuXG4gIHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpIHx8ICcnO1xuICB9XG5cbiAgaW5pdGlhbFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpbml0aWFsVmFsdWUnKSB8fCAnJztcbiAgfVxuXG4gIGVycm9yKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdlcnJvcicpIHx8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG1pbigpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IG1pblZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtaW4nKVxuICAgIGlmICghbWluVmFsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE51bWJlcihtaW5WYWwpIGFzIG51bWJlcjtcbiAgfVxuXG4gIG1heCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IG1heFZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtYXgnKVxuICAgIGlmICghbWF4VmFsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE51bWJlcihtYXhWYWwpIGFzIG51bWJlcjtcbiAgfVxuXG4gIGN1cnJlbnRWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0YW5kYXJkaXplZFZhbHVlKG5ldyBOdW1iZXIodGhpcy4kaW5wdXQ/LnZhbHVlKSBhcyBudW1iZXIpO1xuICB9XG5cbiAgc3RhbmRhcmRpemVkVmFsdWUodmFsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICB2YWx1ZVN0cmluZyh2YWw6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuaW5wdXRQcmVmaXgoKX0ke3ZhbH0ke3RoaXMuaW5wdXRTdWZmaXgoKX1gXG4gIH1cblxuICBzZXRFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Vycm9yJywgZXJyb3IpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICBpZiAodGhpcy4kbm90ZXMpIHtcbiAgICAgIHRoaXMuJG5vdGVzLmlubmVySFRNTCA9IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyRXJyb3IoKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2Vycm9yJyk7XG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIGlmICh0aGlzLiRub3Rlcykge1xuICAgICAgdGhpcy4kbm90ZXMuaW5uZXJIVE1MID0gdGhpcy5ub3RlcygpIHx8ICcmbmJzcDsnO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5lcnJvcigpKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvcigpO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRNaW4gPSB0aGlzLm1pbigpO1xuICAgIGlmIChjdXJyZW50TWluICYmIHRoaXMuc3RhbmRhcmRpemVkVmFsdWUodGhpcy5jdXJyZW50VmFsdWUoKSkgPCBjdXJyZW50TWluKSB7XG4gICAgICByZXR1cm4gYE11c3QgYmUgJHt0aGlzLnZhbHVlU3RyaW5nKGN1cnJlbnRNaW4pfSBvciBtb3JlYDtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50TWF4ID0gdGhpcy5tYXgoKTtcbiAgICBpZiAoY3VycmVudE1heCAmJiB0aGlzLnN0YW5kYXJkaXplZFZhbHVlKHRoaXMuY3VycmVudFZhbHVlKCkpID4gY3VycmVudE1heCkge1xuICAgICAgcmV0dXJuIGBNdXN0IGJlICR7dGhpcy52YWx1ZVN0cmluZyhjdXJyZW50TWF4KX0gb3IgbGVzc2A7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlOyAgIFxuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy4kaW5wdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4kaW5wdXQudmFsdWUgPSB2YWx1ZS50b0ZpeGVkKDIpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGAke3RoaXMuY3VycmVudFZhbHVlKCl9YCk7XG4gIH1cblxuICBmb2N1c0lucHV0KCkge1xuICAgIGlmICh0aGlzLiRpbnB1dCkge1xuICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHRoaXMuY2xlYXJFcnJvcigpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgX3JlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuJGxhYmVsIHx8ICF0aGlzLiRpbnB1dCB8fCAhdGhpcy4kbm90ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZWxlbWVudHMgbm90IHByZXNlbnQnKVxuICAgIH1cblxuICAgIGNvbnN0IGVycm9yID0gdGhpcy5lcnJvck1lc3NhZ2UoKTtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbFJlbmRlciAmJiBlcnJvcikge1xuICAgICAgdGhpcy5zZXRFcnJvcihlcnJvcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGVhckVycm9yKCk7XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbFJlbmRlciA9IGZhbHNlO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGAke3RoaXMuY3VycmVudFZhbHVlKCl9YCk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb25VcGRhdGUnLCB7IGRldGFpbDogeyB2YWx1ZTogdGhpcy52YWx1ZSgpIH19KSk7XG4gIH1cbn1cblxuLy8gRGVmaW5lIHRoZSBlbGVtZW50IGluIHRoZSB3aW5kb3cgbmFtZXNwYWNlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0b2dnbGUtc3dpdGNoJywgVG9nZ2xlU3dpdGNoKTtcbiIsImltcG9ydCB7IEN1cnJlbmN5SW5wdXQsIFBlcmNlbnRhZ2VJbnB1dCwgTnVtYmVySW5wdXQsIFRvZ2dsZVN3aXRjaCwgVGhyaWZ0eUNhbGN1bGF0b3IgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzLydcblxuaW1wb3J0IHsgY3VycmVuY3lGb3JtYXR0ZXIsIHBlcmNlbnRGb3JtYXR0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXR0ZXJzJztcblxuZXhwb3J0IGNvbnN0IHJldGlyZW1lbnRDYWxjdWxhdG9yVGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuXG5jb25zdCBjc3MgPSBgXG48c3R5bGU+XG4gIDpob3N0IHtcbiAgICBmb250LXNpemU6IDE2cHg7XG5cbiAgICAtLXByaW1hcnktY29sb3I6IGJsdWU7XG4gICAgLS1saW5lLWNvbG9yOiBsaWdodGdyYXk7XG4gICAgLS1zdGFuZGFyZC1yYWRpdXM6IDAuNXJlbTtcbiAgICAtLWhlYWRpbmctY29sb3I6IGJsYWNrO1xuXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgIG1hcmdpbjogMnJlbSBhdXRvO1xuICAgIHBhZGRpbmc6IDFyZW07XG5cbiAgICB3aWR0aDogY2FsYygxMDAlIC0gMXJlbSk7XG4gICAgbWF4LXdpZHRoOiAyMHJlbTtcbiAgICBcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saW5lLWNvbG9yKTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1zdGFuZGFyZC1yYWRpdXMpO1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gIH1cbiAgLmNhbGN1bGF0b3JfX3RpdGxlIHtcbiAgICBjb2xvcjogdmFyKC0taGVhZGluZy1jb2xvcik7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgZmxleDogMCAwIDEwMCU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDAgMCAxcmVtO1xuICB9XG4gIHNlY3Rpb24uaW5wdXRzLWdyb3VwIHtcbiAgICBmbGV4OiAwIDAgMTAwJTtcblxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICB9XG4gIC5jYWxjdWxhdG9yX19zZWN0aW9uLXRpdGxlIHtcbiAgICBjb2xvcjogdmFyKC0taGVhZGluZy1jb2xvcik7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIGZsZXg6IDAgMCAxMDAlO1xuICAgIG1hcmdpbjogMC41cmVtIDA7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgcGFkZGluZzogMCAwIDAuNXJlbTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGluZS1jb2xvcik7XG4gIH1cbiAgLmlucHV0cyB7XG4gICAgbWFyZ2luOiAxcmVtIDA7XG4gICAgZmxleDogMCAwIDEwMCU7XG4gIH1cbiAgLm91dHB1dHMge1xuICAgIG1hcmdpbjogMXJlbSAwO1xuICAgIGZsZXg6IDAgMCAxMDAlO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbiAgbnVtYmVyLWlucHV0LCBjdXJyZW5jeS1pbnB1dCwgcGVyY2VudGFnZS1pbnB1dCB7XG4gICAgbWFyZ2luOiAwLjVyZW0gMXJlbTtcbiAgfVxuXG4gICNjYWxjdWxhdG9yX19jdXN0b21pemUge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxpbmUtY29sb3IpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXN0YW5kYXJkLXJhZGl1cyk7XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBXaGl0ZVNtb2tlO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICAjY2FsY3VsYXRvcl9fY3VzdG9taXplIG51bWJlci1pbnB1dCwgXG4gICNjYWxjdWxhdG9yX19jdXN0b21pemUgdG9nZ2xlLXN3aXRjaCwgXG4gICNjYWxjdWxhdG9yX19jdXN0b21pemUgY3VycmVuY3ktaW5wdXQsIFxuICAjY2FsY3VsYXRvcl9fY3VzdG9taXplIHBlcmNlbnRhZ2UtaW5wdXQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAjY2FsY3VsYXRvcl9fY3VzdG9taXplLmV4cGFuZGVkIG51bWJlci1pbnB1dCxcbiAgI2NhbGN1bGF0b3JfX2N1c3RvbWl6ZS5leHBhbmRlZCB0b2dnbGUtc3dpdGNoLCBcbiAgI2NhbGN1bGF0b3JfX2N1c3RvbWl6ZS5leHBhbmRlZCBjdXJyZW5jeS1pbnB1dCwgXG4gICNjYWxjdWxhdG9yX19jdXN0b21pemUuZXhwYW5kZWQgcGVyY2VudGFnZS1pbnB1dCB7XG4gICAgZGlzcGxheTogaW5pdGlhbDtcbiAgfVxuXG4gICNjYWxjdWxhdG9yX19jdXN0b21pemUgLmNhbGN1bGF0b3JfX3NlY3Rpb24tdGl0bGU6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlhWE52TFRnNE5Ua3RNU0kvUGcwS1BDRXRMU0JIWlc1bGNtRjBiM0k2SUVGa2IySmxJRWxzYkhWemRISmhkRzl5SURFMkxqQXVNQ3dnVTFaSElFVjRjRzl5ZENCUWJIVm5MVWx1SUM0Z1UxWkhJRlpsY25OcGIyNDZJRFl1TURBZ1FuVnBiR1FnTUNrZ0lDMHRQZzBLUENGRVQwTlVXVkJGSUhOMlp5QlFWVUpNU1VNZ0lpMHZMMWN6UXk4dlJGUkVJRk5XUnlBeExqRXZMMFZPSWlBaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdlIzSmhjR2hwWTNNdlUxWkhMekV1TVM5RVZFUXZjM1puTVRFdVpIUmtJajROQ2p4emRtY2dkbVZ5YzJsdmJqMGlNUzR4SWlCcFpEMGlRMkZ3WVY4eElpQjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIaHRiRzV6T25oc2FXNXJQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySWlCNFBTSXdjSGdpSUhrOUlqQndlQ0lOQ2drZ2QybGtkR2c5SWpJNU1pNHpOakp3ZUNJZ2FHVnBaMmgwUFNJeU9USXVNell5Y0hnaUlIWnBaWGRDYjNnOUlqQWdNQ0F5T1RJdU16WXlJREk1TWk0ek5qSWlJSE4wZVd4bFBTSmxibUZpYkdVdFltRmphMmR5YjNWdVpEcHVaWGNnTUNBd0lESTVNaTR6TmpJZ01qa3lMak0yTWpzaURRb0pJSGh0YkRwemNHRmpaVDBpY0hKbGMyVnlkbVVpUGcwS1BHYytEUW9KUEhCaGRHZ2daRDBpVFRJNE5pNDVNelVzTmprdU16YzNZeTB6TGpZeE5DMHpMall4TnkwM0xqZzVPQzAxTGpReU5DMHhNaTQ0TkRndE5TNDBNalJJTVRndU1qYzBZeTAwTGprMU1pd3dMVGt1TWpNekxERXVPREEzTFRFeUxqZzFMRFV1TkRJMERRb0pDVU14TGpnd055dzNNaTQ1T1Rnc01DdzNOeTR5Tnprc01DdzRNaTR5TWpoak1DdzBMamswT0N3eExqZ3dOeXc1TGpJeU9TdzFMalF5TkN3eE1pNDRORGRzTVRJM0xqa3dOeXd4TWpjdU9UQTNZek11TmpJeExETXVOakUzTERjdU9UQXlMRFV1TkRJNExERXlMamcxTERVdU5ESTREUW9KQ1hNNUxqSXpNeTB4TGpneE1Td3hNaTQ0TkRjdE5TNDBNamhNTWpnMkxqa3pOU3c1TlM0d056UmpNeTQyTVRNdE15NDJNVGNzTlM0ME1qY3ROeTQ0T1Rnc05TNDBNamN0TVRJdU9EUTNRekk1TWk0ek5qSXNOemN1TWpjNUxESTVNQzQxTkRnc056SXVPVGs0TERJNE5pNDVNelVzTmprdU16YzNlaUl2UGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BDOXpkbWMrRFFvPScpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDFyZW07XG4gICAgaGVpZ2h0OiAxcmVtO1xuICAgIHRvcDogMS43NXJlbTtcbiAgICByaWdodDogMXJlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDI1MG1zIGVhc2UtaW4tb3V0O1xuICB9XG4gICNjYWxjdWxhdG9yX19jdXN0b21pemUuZXhwYW5kZWQgLmNhbGN1bGF0b3JfX3NlY3Rpb24tdGl0bGU6YWZ0ZXIge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xODBkZWcpO1xuICB9XG5cbiAgI2NhbGN1bGF0b3JfX2N1c3RvbWl6ZSAuY2FsY3VsYXRvcl9fc2VjdGlvbi10aXRsZSB7XG4gICAgY29sb3I6IHZhcigtLWhlYWRpbmctY29sb3IpO1xuICAgIGZsZXg6IDAgMCBjYWxjKDEwMCUgLSAycmVtKTtcbiAgICBwYWRkaW5nOiAxcmVtIDJyZW0gMXJlbSAxcmVtO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICB9XG5cbiAgcC5jYWxjdWxhdG9yX19yZXN1bHQge1xuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XG4gIH1cblxuICAuY2FsY3VsYXRvcl9fcHJvZ3Jlc3MtYmFyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saW5lLWNvbG9yKTtcbiAgICBoZWlnaHQ6IDJyZW07XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tc3RhbmRhcmQtcmFkaXVzKTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLmNhbGN1bGF0b3JfX3Byb2dyZXNzLWJhciAuY29tcGxldGVkIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tbGluZS1jb2xvcik7XG4gICAgaGVpZ2h0OiAycmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IpOztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdHJhbnNpdGlvbjogd2lkdGggMjUwbXMgZWFzZSAwcztcbiAgfVxuXG4gIC5jYWxjdWxhdG9yX19wcm9ncmVzcy1pbmRpY2F0b3Ige1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpYVhOdkxUZzROVGt0TVNJL1BnMEtQQ0V0TFNCSFpXNWxjbUYwYjNJNklFRmtiMkpsSUVsc2JIVnpkSEpoZEc5eUlERTJMakF1TUN3Z1UxWkhJRVY0Y0c5eWRDQlFiSFZuTFVsdUlDNGdVMVpISUZabGNuTnBiMjQ2SURZdU1EQWdRblZwYkdRZ01Da2dJQzB0UGcwS1BDRkVUME5VV1ZCRklITjJaeUJRVlVKTVNVTWdJaTB2TDFjelF5OHZSRlJFSUZOV1J5QXhMakV2TDBWT0lpQWlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZSM0poY0docFkzTXZVMVpITHpFdU1TOUVWRVF2YzNabk1URXVaSFJrSWo0TkNqeHpkbWNnZG1WeWMybHZiajBpTVM0eElpQnBaRDBpUTJGd1lWOHhJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGh0Ykc1ek9uaHNhVzVyUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMM2hzYVc1cklpQjRQU0l3Y0hnaUlIazlJakJ3ZUNJTkNna2dkMmxrZEdnOUlqSTVNaTR6TmpKd2VDSWdhR1ZwWjJoMFBTSXlPVEl1TXpZeWNIZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeU9USXVNell5SURJNU1pNHpOaklpSUhOMGVXeGxQU0psYm1GaWJHVXRZbUZqYTJkeWIzVnVaRHB1WlhjZ01DQXdJREk1TWk0ek5qSWdNamt5TGpNMk1qc2lEUW9KSUhodGJEcHpjR0ZqWlQwaWNISmxjMlZ5ZG1VaVBnMEtQR2MrRFFvSlBIQmhkR2dnWkQwaVRUSTROaTQ1TXpVc05qa3VNemMzWXkwekxqWXhOQzB6TGpZeE55MDNMamc1T0MwMUxqUXlOQzB4TWk0NE5EZ3ROUzQwTWpSSU1UZ3VNamMwWXkwMExqazFNaXd3TFRrdU1qTXpMREV1T0RBM0xURXlMamcxTERVdU5ESTBEUW9KQ1VNeExqZ3dOeXczTWk0NU9UZ3NNQ3czTnk0eU56a3NNQ3c0TWk0eU1qaGpNQ3cwTGprME9Dd3hMamd3Tnl3NUxqSXlPU3cxTGpReU5Dd3hNaTQ0TkRkc01USTNMamt3Tnl3eE1qY3VPVEEzWXpNdU5qSXhMRE11TmpFM0xEY3VPVEF5TERVdU5ESTRMREV5TGpnMUxEVXVOREk0RFFvSkNYTTVMakl6TXkweExqZ3hNU3d4TWk0NE5EY3ROUzQwTWpoTU1qZzJMamt6TlN3NU5TNHdOelJqTXk0Mk1UTXRNeTQyTVRjc05TNDBNamN0Tnk0NE9UZ3NOUzQwTWpjdE1USXVPRFEzUXpJNU1pNHpOaklzTnpjdU1qYzVMREk1TUM0MU5EZ3NOekl1T1RrNExESTROaTQ1TXpVc05qa3VNemMzZWlJdlBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQQzl6ZG1jK0RRbz0nKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGF1dG8gMTAwJTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMXJlbTtcbiAgICBoZWlnaHQ6IDFyZW07XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMC41cmVtKTtcbiAgICB0cmFuc2l0aW9uOiBwYWRkaW5nIDI1MG1zIGVhc2UgMHM7XG4gIH1cblxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIDpob3N0IHtcbiAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAycmVtKTtcbiAgICAgIG1heC13aWR0aDogNjByZW07XG4gICAgfVxuICAgIC5pbnB1dHMge1xuICAgICAgZmxleDogMSAwIDIwcmVtO1xuICAgIH1cbiAgICAub3V0cHV0cyB7XG4gICAgICBmbGV4OiAxIDAgMThyZW07XG4gICAgICBwYWRkaW5nOiAwIDJyZW07XG4gICAgfSBcbiAgfVxuPC9zdHlsZT5cbmA7XG5jb25zdCBodG1sID0gYFxuICA8ZGl2IGNsYXNzPVwiY2FsY3VsYXRvcl9fdGl0bGVcIj5SZXRpcmVtZW50IENhbGN1bGF0b3I8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiaW5wdXRzXCI+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJpbnB1dHMtZ3JvdXBcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWxjdWxhdG9yX19zZWN0aW9uLXRpdGxlXCI+RW50ZXIgdGhlIEJhc2ljczwvZGl2PlxuICAgICAgPG51bWJlci1pbnB1dCBsYWJlbD1cIkN1cnJlbnQgQWdlXCIgaW5pdGlhbFZhbHVlPTM1IGlkPVwiY3VycmVudC1hZ2VcIiBtaW49MCBtYXg9MTIwPjwvbnVtYmVyLWlucHV0PlxuICAgICAgPG51bWJlci1pbnB1dCBsYWJlbD1cIlJldGlyZW1lbnQgQWdlXCIgaW5pdGlhbFZhbHVlPTY3IGlkPVwicmV0aXJlbWVudC1hZ2VcIiBtaW49MCBtYXg9MTIwPjwvbnVtYmVyLWlucHV0PlxuICAgICAgPGN1cnJlbmN5LWlucHV0IGxhYmVsPVwiQ3VycmVudCBTYXZpbmdzXCIgaW5pdGlhbFZhbHVlPTI1MDAwIGlkPVwiY3VycmVudC1zYXZpbmdzXCIgbWluPTA+PC9jdXJyZW5jeS1pbnB1dD5cbiAgICAgIDxjdXJyZW5jeS1pbnB1dCBsYWJlbD1cIk1vbnRobHkgU2F2aW5nc1wiIGluaXRpYWxWYWx1ZT03NTAgaWQ9XCJtb250aGx5LXNhdmluZ3NcIiBtaW49MD48L2N1cnJlbmN5LWlucHV0PlxuICAgICAgPGN1cnJlbmN5LWlucHV0IGxhYmVsPVwiQW5udWFsIEluY29tZSAoUHJlLXRheClcIiBpbml0aWFsVmFsdWU9MTAwMDAwIGlkPVwiYW5udWFsLWluY29tZVwiIG1pbj0wPjwvY3VycmVuY3ktaW5wdXQ+XG4gICAgPC9zZWN0aW9uPlxuXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJpbnB1dHMtZ3JvdXBcIiBpZD1cImNhbGN1bGF0b3JfX2N1c3RvbWl6ZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbGN1bGF0b3JfX3NlY3Rpb24tdGl0bGVcIj5DdXN0b21pemUgKG9wdGlvbmFsKTwvZGl2PlxuICAgICAgPHBlcmNlbnRhZ2UtaW5wdXQgbGFiZWw9XCJBbm51YWwgU2FsYXJ5IEdyb3d0aFwiIGluaXRpYWxWYWx1ZT0yIGlkPVwic2FsYXJ5LWdyb3d0aC1yYXRlXCIgbWluPTA+PC9wZXJjZW50YWdlLWlucHV0PlxuICAgICAgPHBlcmNlbnRhZ2UtaW5wdXQgbGFiZWw9XCJBbm51YWwgSW5mbGF0aW9uIFJhdGVcIiBpbml0aWFsVmFsdWU9MyBpZD1cImluZmxhdGlvbi1yYXRlXCIgbWluPTA+PC9wZXJjZW50YWdlLWlucHV0PlxuICAgICAgPHBlcmNlbnRhZ2UtaW5wdXQgbGFiZWw9XCJJbnZlc210ZW50IFJldHVybjxicj4ocHJlLXJldGlyZW1lbnQpXCIgaW5pdGlhbFZhbHVlPTcgaWQ9XCJwcmUtcmV0LWludi1yb3JcIiBtaW49MD48L3BlcmNlbnRhZ2UtaW5wdXQ+XG4gICAgICA8cGVyY2VudGFnZS1pbnB1dCBsYWJlbD1cIkludmVzbXRlbnQgUmV0dXJuPGJyPihpbiByZXRpcmVtZW50KVwiIGluaXRpYWxWYWx1ZT01IGlkPVwicG9zdC1yZXQtaW52LXJvclwiIG1pbj0wPjwvcGVyY2VudGFnZS1pbnB1dD5cbiAgICAgIDxjdXJyZW5jeS1pbnB1dCBsYWJlbD1cIk1vbnRobHkgUmV0aXJlbWVudCBTcGVuZGluZ1wiIGluaXRpYWxWYWx1ZT00ODc4LjkxIGlkPVwibW9udGhseS1yZXQtc3BlbmRpbmdcIiBtaW49MCBub3Rlcz1cIkNhbGN1bGF0ZWQgYXMgODAlIG9mIHByZS1yZXRpcmVtZW50IGluY29tZSAtIGluIHRvZGF5J3MgZG9sbGFyc1wiPjwvY3VycmVuY3ktaW5wdXQ+XG4gICAgICA8Y3VycmVuY3ktaW5wdXQgbGFiZWw9XCJPdGhlciBSZXRpcmVtZW50IEluY29tZSAobW9udGhseSlcIiBpbml0aWFsVmFsdWU9MTYwMCBpZD1cIm1vbnRobHktcmV0LW90aGVyLWluY29tZVwiIG1pbj0wIG5vdGVzPVwiSW4gdG9kYXkncyBkb2xsYXJzXCI+PC9jdXJyZW5jeS1pbnB1dD5cbiAgICAgIDxwZXJjZW50YWdlLWlucHV0IGxhYmVsPVwiRXhwZWN0ZWQgV2l0aGRyYXdhbCBSYXRlXCIgaW5pdGlhbFZhbHVlPTQgaWQ9XCJ3aXRoZHJhd2FsLXJhdGVcIiBtaW49MD48L3BlcmNlbnRhZ2UtaW5wdXQ+XG4gICAgPC9zZWN0aW9uPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwib3V0cHV0c1wiPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbGN1bGF0b3JfX3NlY3Rpb24tdGl0bGVcIj5Zb3VyIFJlc3VsdHM8L2Rpdj5cbiAgICAgIDxwIGNsYXNzPVwiY2FsY3VsYXRvcl9fcmVzdWx0XCI+VG8gcmV0aXJlIG9uLXNjaGVkdWxlLCB5b3UnbGwgbmVlZCA8c3BhbiBpZD1cImFtb3VudC1uZWVkZWRcIj48L3NwYW4+LjwvcD5cbiAgICAgIDxwIGNsYXNzPVwiY2FsY3VsYXRvcl9fcmVzdWx0XCI+WW91J3JlIG9uIHRyYWNrIHRvIGhhdmUgYWJvdXQgPHNwYW4gaWQ9XCJhbW91bnQtYXZhaWxhYmxlXCI+PC9zcGFuPi48L3A+XG4gICAgICA8cCBjbGFzcz1cImNhbGN1bGF0b3JfX3Jlc3VsdFwiPllvdSdyZSA8c3BhbiBpZD1cInBlcmNlbnQtcHJvZ3Jlc3NcIj48L3NwYW4+IG9mIHRoZSB3YXkgdGhlcmUuPC9wPlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWxjdWxhdG9yX19wcm9ncmVzcy1pbmRpY2F0b3JcIj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbGN1bGF0b3JfX3Byb2dyZXNzLWJhclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbXBsZXRlZFwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0by1jb21wbGV0ZWxlZnRcIj48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gIDwvZGl2PlxuICBcbmA7XG5cbnJldGlyZW1lbnRDYWxjdWxhdG9yVGVtcGxhdGUuaW5uZXJIVE1MID0gY3NzICsgaHRtbDtcbiAgICAgIFxuZXhwb3J0IGNsYXNzIFJldGlyZW1lbnRDYWxjdWxhdG9yIGV4dGVuZHMgVGhyaWZ0eUNhbGN1bGF0b3Ige1xuICBwcm90ZWN0ZWQgJGN1cnJlbnRBZ2U6IE51bWJlcklucHV0IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkcmV0aXJlbWVudEFnZTogTnVtYmVySW5wdXQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRhbm51YWxJbmNvbWU6IEN1cnJlbmN5SW5wdXQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRjdXJyZW50U2F2aW5nczogQ3VycmVuY3lJbnB1dCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJG1vbnRobHlTYXZpbmdzOiBDdXJyZW5jeUlucHV0IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkICRhbm51YWxTYWxhcnlHcm93dGg6IFBlcmNlbnRhZ2VJbnB1dCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJGludmVzdG1lbnRQcmVSZXRSb3I6IFBlcmNlbnRhZ2VJbnB1dCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJGludmVzdG1lbnRQb3N0UmV0Um9yOiBQZXJjZW50YWdlSW5wdXQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICR3aXRoZHJhd2FsUmF0ZTogUGVyY2VudGFnZUlucHV0IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkaW5mbGF0aW9uUmF0ZTogUGVyY2VudGFnZUlucHV0IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkcmV0U3BlbmRpbmc6IEN1cnJlbmN5SW5wdXQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRyZXRJbmNvbWU6IEN1cnJlbmN5SW5wdXQgfCBudWxsID0gbnVsbDtcblxuICBwcm90ZWN0ZWQgJGFtb3VudE5lZWRlZDogSFRNTFNwYW5FbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkYW1vdW50QXZhaWxhYmxlOiBIVE1MU3BhbkVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRwZXJjZW50UHJvZ3Jlc3M6IEhUTUxTcGFuRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJHByb2dyZXNzQmFyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgJHByb2dyZXNzSW5kaWNhdG9yOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIHByb3RlY3RlZCAkdG9nZ2xlU3dpdGNoOiBUb2dnbGVTd2l0Y2ggfCBudWxsID0gbnVsbDtcblxuICBwcm90ZWN0ZWQgJGV4cGFuZEJveDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRleHBhbmRMaW5rOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zZXRDdXN0b21TdHlsaW5nKCk7XG4gIH1cblxuICBzZXRDdXN0b21TdHlsaW5nKCkge1xuICAgIGNvbnN0IHN0YW5kYXJkUmFkaXVzQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnc3RhbmRhcmQtcmFkaXVzJyk7XG4gICAgaWYgKHN0YW5kYXJkUmFkaXVzQXR0cmlidXRlKSB7XG4gICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1zdGFuZGFyZC1yYWRpdXNcIiwgc3RhbmRhcmRSYWRpdXNBdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cblxuICAgIGNvbnN0IHByaW1hcnlDb2xvckF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oJ3ByaW1hcnktY29sb3InKTtcbiAgICBpZiAocHJpbWFyeUNvbG9yQXR0cmlidXRlKSB7XG4gICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wcmltYXJ5LWNvbG9yXCIsIHByaW1hcnlDb2xvckF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbGluZUNvbG9yQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnbGluZS1jb2xvcicpO1xuICAgIGlmIChsaW5lQ29sb3JBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLWxpbmUtY29sb3JcIiwgbGluZUNvbG9yQXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBlcnJvckNvbG9yQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnZXJyb3ItY29sb3InKTtcbiAgICBpZiAoZXJyb3JDb2xvckF0dHJpYnV0ZSkge1xuICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tZXJyb3ItY29sb3JcIiwgZXJyb3JDb2xvckF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWV0YUNvbG9yQXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnbWV0YS1jb2xvcicpO1xuICAgIGlmIChtZXRhQ29sb3JBdHRyaWJ1dGUpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1ldGEtY29sb3JcIiwgbWV0YUNvbG9yQXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBoZWFkaW5nQ29sb3JBdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKCdoZWFkaW5nLWNvbG9yJyk7XG4gICAgaWYgKGhlYWRpbmdDb2xvckF0dHJpYnV0ZSkge1xuICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVhZGluZy1jb2xvclwiLCBoZWFkaW5nQ29sb3JBdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHBhc3NEb3duQXR0cmlidXRlKGVsZW1lbnQ6IE51bWJlcklucHV0LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSkgeyBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSkgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gcG9wdWxhdGUgdGhlIGVsZW1lbnRcbiAgICB0aGlzLl9yb290LmFwcGVuZENoaWxkKHJldGlyZW1lbnRDYWxjdWxhdG9yVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgLy8gTG9hZCBlbGVtZW50IGFjY2Vzc29yc1xuICAgIHRoaXMuJGN1cnJlbnRBZ2UgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJ251bWJlci1pbnB1dCcpO1xuICAgIHRoaXMuJHJldGlyZW1lbnRBZ2UgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJyNyZXRpcmVtZW50LWFnZScpO1xuICAgIHRoaXMuJGFubnVhbEluY29tZSA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignI2FubnVhbC1pbmNvbWUnKTtcbiAgICB0aGlzLiRjdXJyZW50U2F2aW5ncyA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignI2N1cnJlbnQtc2F2aW5ncycpO1xuICAgIHRoaXMuJG1vbnRobHlTYXZpbmdzID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCcjbW9udGhseS1zYXZpbmdzJyk7XG4gIFxuICAgIHRoaXMuJGFubnVhbFNhbGFyeUdyb3d0aCA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignI3NhbGFyeS1ncm93dGgtcmF0ZScpO1xuICAgIHRoaXMuJGludmVzdG1lbnRQcmVSZXRSb3IgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJyNwcmUtcmV0LWludi1yb3InKTtcbiAgICB0aGlzLiRpbnZlc3RtZW50UG9zdFJldFJvciA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignI3Bvc3QtcmV0LWludi1yb3InKTtcbiAgICB0aGlzLiR3aXRoZHJhd2FsUmF0ZSA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignI3dpdGhkcmF3YWwtcmF0ZScpO1xuICAgIHRoaXMuJGluZmxhdGlvblJhdGUgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJyNpbmZsYXRpb24tcmF0ZScpO1xuICAgIHRoaXMuJHJldFNwZW5kaW5nID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCcjbW9udGhseS1yZXQtc3BlbmRpbmcnKTtcbiAgICB0aGlzLiRyZXRJbmNvbWUgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJyNtb250aGx5LXJldC1vdGhlci1pbmNvbWUnKTtcblxuICAgIHRoaXMuJGV4cGFuZEJveCA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignI2NhbGN1bGF0b3JfX2N1c3RvbWl6ZScpO1xuXG4gICAgdGhpcy4kYW1vdW50TmVlZGVkID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCcjYW1vdW50LW5lZWRlZCcpO1xuICAgIHRoaXMuJGFtb3VudEF2YWlsYWJsZSA9IHRoaXMuX3Jvb3QucXVlcnlTZWxlY3RvcignI2Ftb3VudC1hdmFpbGFibGUnKTtcbiAgICB0aGlzLiRwZXJjZW50UHJvZ3Jlc3MgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJyNwZXJjZW50LXByb2dyZXNzJyk7XG4gICAgdGhpcy4kcHJvZ3Jlc3NCYXIgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3IoJy5jYWxjdWxhdG9yX19wcm9ncmVzcy1iYXIgLmNvbXBsZXRlZCcpO1xuICAgIHRoaXMuJHByb2dyZXNzSW5kaWNhdG9yID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCcuY2FsY3VsYXRvcl9fcHJvZ3Jlc3MtaW5kaWNhdG9yJyk7XG5cbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gW3RoaXMuJGN1cnJlbnRBZ2UsIHRoaXMuJHJldGlyZW1lbnRBZ2UsIHRoaXMuJGFubnVhbEluY29tZSwgXG4gICAgICB0aGlzLiRjdXJyZW50U2F2aW5ncywgdGhpcy4kbW9udGhseVNhdmluZ3MsIHRoaXMuJGFubnVhbFNhbGFyeUdyb3d0aCwgXG4gICAgICB0aGlzLiRpbnZlc3RtZW50UHJlUmV0Um9yLCB0aGlzLiRpbnZlc3RtZW50UG9zdFJldFJvciwgdGhpcy4kd2l0aGRyYXdhbFJhdGUsIFxuICAgICAgdGhpcy4kaW5mbGF0aW9uUmF0ZSwgdGhpcy4kcmV0U3BlbmRpbmcsIHRoaXMuJHJldEluY29tZV1cbiAgICBmb3IgKGNvbnN0IGVsZSBvZiBjaGlsZEVsZW1lbnRzKSB7XG4gICAgICBpZiAoZWxlKSB7XG4gICAgICAgIHRoaXMucGFzc0Rvd25BdHRyaWJ1dGUoZWxlLCAnc3RhbmRhcmQtcmFkaXVzJylcbiAgICAgICAgdGhpcy5wYXNzRG93bkF0dHJpYnV0ZShlbGUsICdwcmltYXJ5LWNvbG9yJylcbiAgICAgICAgdGhpcy5wYXNzRG93bkF0dHJpYnV0ZShlbGUsICdsaW5lLWNvbG9yJylcbiAgICAgICAgdGhpcy5wYXNzRG93bkF0dHJpYnV0ZShlbGUsICdlcnJvci1jb2xvcicpXG4gICAgICAgIHRoaXMucGFzc0Rvd25BdHRyaWJ1dGUoZWxlLCAnbWV0YS1jb2xvcicpXG4gICAgICAgIFxuICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignb25VcGRhdGUnLCB0aGlzLl9yZW5kZXIuYmluZCh0aGlzKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuJGV4cGFuZEJveCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgdGhpcy4kZXhwYW5kTGluayA9IHRoaXMuJGV4cGFuZEJveC5xdWVyeVNlbGVjdG9yKCcuY2FsY3VsYXRvcl9fc2VjdGlvbi10aXRsZScpO1xuXG4gICAgaWYgKCF0aGlzLiRleHBhbmRMaW5rKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgXG4gICAgdGhpcy4kZXhwYW5kTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlRXhwYW5kLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKCF0aGlzLiRhbm51YWxJbmNvbWUgfHwgIXRoaXMuJGluZmxhdGlvblJhdGUgfHwgIXRoaXMuJGFubnVhbFNhbGFyeUdyb3d0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuJGFubnVhbEluY29tZS5hZGRFdmVudExpc3RlbmVyKCdvblVwZGF0ZScsIHRoaXMuX3VwZGF0ZVJldFNwZW5kaW5nLmJpbmQodGhpcykpXG4gICAgdGhpcy4kaW5mbGF0aW9uUmF0ZS5hZGRFdmVudExpc3RlbmVyKCdvblVwZGF0ZScsIHRoaXMuX3VwZGF0ZVJldFNwZW5kaW5nLmJpbmQodGhpcykpXG4gICAgdGhpcy4kYW5udWFsU2FsYXJ5R3Jvd3RoLmFkZEV2ZW50TGlzdGVuZXIoJ29uVXBkYXRlJywgdGhpcy5fdXBkYXRlUmV0U3BlbmRpbmcuYmluZCh0aGlzKSlcbiAgICBcbiAgICAvLyBDaGVjayB0byBlbnN1cmUgb2JqZWN0cyB0aGF0IG5lZWQgbGlzdGVuZXJzIGFyZSBwcmVzZW50XG4gICAgLy8gQWRkIGxpc3RlbmVyc1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgLy8gVXRpbGl0eSBmdW5jdGlvbnMgZ28gaGVyZVxuICBcbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7fVxuXG4gIGN1cnJlbnRBZ2UoKTogbnVtYmVyeyByZXR1cm4gdGhpcy4kY3VycmVudEFnZT8udmFsdWUoKSB8fCAwIH1cbiAgcmV0aXJlbWVudEFnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy4kcmV0aXJlbWVudEFnZT8udmFsdWUoKSB8fCA2NyB9XG4gIGFubnVhbEluY29tZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy4kYW5udWFsSW5jb21lPy52YWx1ZSgpIHx8IDAgfVxuICBjdXJyZW50U2F2aW5ncygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy4kY3VycmVudFNhdmluZ3M/LnZhbHVlKCkgfHwgMCB9XG4gIG1vbnRobHlTYXZpbmdzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLiRtb250aGx5U2F2aW5ncz8udmFsdWUoKSB8fCAwIH1cbiAgYW5udWFsU2FsYXJ5R3Jvd3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLiRhbm51YWxTYWxhcnlHcm93dGg/LnZhbHVlKCkgfHwgMCB9XG4gIGludmVzdG1lbnRQcmVSZXRSb3IoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuJGludmVzdG1lbnRQcmVSZXRSb3I/LnZhbHVlKCkgfHwgMCB9XG4gIGludmVzdG1lbnRQb3N0UmV0Um9yKCk6IG51bWJlciB7IHJldHVybiB0aGlzLiRpbnZlc3RtZW50UG9zdFJldFJvcj8udmFsdWUoKSB8fCAwIH1cbiAgd2l0aGRyYXdhbFJhdGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuJHdpdGhkcmF3YWxSYXRlPy52YWx1ZSgpIHx8IDAuMDQgfVxuICBpbmZsYXRpb25SYXRlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLiRpbmZsYXRpb25SYXRlPy52YWx1ZSgpIHx8IDAgfVxuICByZXRTcGVuZGluZygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy4kcmV0U3BlbmRpbmc/LnZhbHVlKCkgfHwgMCB9XG4gIHJldEluY29tZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy4kcmV0SW5jb21lPy52YWx1ZSgpIHx8IDAgfVxuXG4gIGZ1dHVyZVZhbHVlKHByZXNlbnRWYWx1ZTogbnVtYmVyLCByYXRlOiBudW1iZXIsIG5wZXI6IG51bWJlcikge1xuICAgIHJldHVybiBwcmVzZW50VmFsdWUgKiAoMSArIHJhdGUpICoqIG5wZXI7XG4gIH1cblxuICBmdXR1cmVWYWx1ZUFubnVpdHkocG10OiBudW1iZXIsIHJhdGU6IG51bWJlciwgbnBlcjogbnVtYmVyLCBncm93dGg6IG51bWJlciA9IDApIHtcbiAgICBpZiAoTWF0aC5hYnMoIHJhdGUgLSBncm93dGggKSA8IE51bWJlci5FUFNJTE9OKSB7XG4gICAgICByZXR1cm4gcG10ICogbnBlciAqICgxICsgcmF0ZSkgKiogKG5wZXIgLSAxKVxuICAgIH1cbiAgICByZXR1cm4gcG10ICogKCgxICsgcmF0ZSkgKiogbnBlciAtICgxICsgZ3Jvd3RoKSAqKiBucGVyKSAvIChyYXRlIC0gZ3Jvd3RoKTtcbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZCgpIHtcbiAgICBpZiAoIXRoaXMuJGV4cGFuZExpbmsgfHwgIXRoaXMuJGV4cGFuZEJveCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLiRleHBhbmRCb3guY2xhc3NMaXN0LnRvZ2dsZSgnZXhwYW5kZWQnKTtcbiAgfVxuXG4gIF91cGRhdGVSZXRTcGVuZGluZygpIHtcbiAgICBpZiAoIXRoaXMuJHJldFNwZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHllYXJzVG9SZXQgPSB0aGlzLnJldGlyZW1lbnRBZ2UoKSAtIHRoaXMuY3VycmVudEFnZSgpO1xuICAgIGNvbnN0IHNhbGFyeUF0UmV0aXJlbWVudCA9IHRoaXMuYW5udWFsSW5jb21lKCkgKiAoMSArIHRoaXMuYW5udWFsU2FsYXJ5R3Jvd3RoKCkpICoqIHllYXJzVG9SZXQ7XG4gICAgY29uc3QgZXhwZW5zZXNBdFJldGlyZW1lbnQgPSBzYWxhcnlBdFJldGlyZW1lbnQgKiAwLjg7XG4gICAgY29uc3QgcmV0RXhwZW5zZXNUb2RheSA9IGV4cGVuc2VzQXRSZXRpcmVtZW50IC8gKDEgKyB0aGlzLmluZmxhdGlvblJhdGUoKSkgKiogeWVhcnNUb1JldDtcblxuICAgIHRoaXMuJHJldFNwZW5kaW5nLnNldFZhbHVlKHJldEV4cGVuc2VzVG9kYXkgLyAxMik7XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy4kYW1vdW50TmVlZGVkIHx8ICF0aGlzLiRhbW91bnRBdmFpbGFibGUgfHwgIXRoaXMuJHBlcmNlbnRQcm9ncmVzcyB8fCAhdGhpcy4kcHJvZ3Jlc3NCYXIgfHwgIXRoaXMuJHByb2dyZXNzSW5kaWNhdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1cnJBZ2UgPSB0aGlzLmN1cnJlbnRBZ2UoKTtcbiAgICBjb25zdCByZXRBZ2UgPSB0aGlzLnJldGlyZW1lbnRBZ2UoKTtcbiAgICAvLyBjaGVjayBmb3IgYW5kIHJlbmRlciBlcnJvcnNcbiAgICBpZiAoIWN1cnJBZ2UgfHwgIXJldEFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY3VyckFnZSA+PSByZXRBZ2UpIHtcbiAgICAgIHRoaXMuJGN1cnJlbnRBZ2U/LnNldEVycm9yKCdDdXJyZW50IGFnZSBtdXN0IGJlIGxlc3MgdGhhbiByZXRpcmVtZW50IGFnZScpO1xuICAgICAgdGhpcy4kcmV0aXJlbWVudEFnZT8uc2V0RXJyb3IoJ1JldGlyZW1lbnQgYWdlIG11c3QgYmUgZ3JlYXRlciB0aGFuIGN1cnJlbnQgYWdlJyk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGN1cnJlbnRBZ2U/LmNsZWFyRXJyb3IoKTtcbiAgICAgIHRoaXMuJHJldGlyZW1lbnRBZ2U/LmNsZWFyRXJyb3IoKTtcbiAgICB9XG5cbiAgICBjb25zdCB5ZWFyc1RvUmV0ID0gdGhpcy5yZXRpcmVtZW50QWdlKCkgLSB0aGlzLmN1cnJlbnRBZ2UoKTtcblxuICAgIGNvbnN0IG9yaWdpbmFsU2F2aW5nc1ZhbHVlID0gdGhpcy5mdXR1cmVWYWx1ZSh0aGlzLmN1cnJlbnRTYXZpbmdzKCksIHRoaXMuaW52ZXN0bWVudFByZVJldFJvcigpLCB5ZWFyc1RvUmV0KTtcbiAgICBjb25zdCBuZXdTYXZpbmdzVmFsdWUgPSB0aGlzLmZ1dHVyZVZhbHVlQW5udWl0eSh0aGlzLm1vbnRobHlTYXZpbmdzKCkgKiAxMiwgdGhpcy5pbnZlc3RtZW50UHJlUmV0Um9yKCksIHllYXJzVG9SZXQsIHRoaXMuYW5udWFsU2FsYXJ5R3Jvd3RoKCkpO1xuICAgIGNvbnN0IHRvdGFsQXRSZXRpcmVtZW50ID0gb3JpZ2luYWxTYXZpbmdzVmFsdWUgKyBuZXdTYXZpbmdzVmFsdWU7XG5cbiAgICBjb25zdCBnYXBUb0ZpbmFuY2UgPSBNYXRoLm1heCgwLCB0aGlzLnJldFNwZW5kaW5nKCkgLSB0aGlzLnJldEluY29tZSgpKVxuXG4gICAgY29uc3QgYW1vdW50TmVlZGVkID0gMTIgKiBnYXBUb0ZpbmFuY2UgKiAoMSArIHRoaXMuaW5mbGF0aW9uUmF0ZSgpKSAqKiB5ZWFyc1RvUmV0IC8gdGhpcy53aXRoZHJhd2FsUmF0ZSgpO1xuXG4gICAgdGhpcy4kYW1vdW50TmVlZGVkLmlubmVySFRNTCA9IGN1cnJlbmN5Rm9ybWF0dGVyLmZvcm1hdChhbW91bnROZWVkZWQpO1xuICAgIHRoaXMuJGFtb3VudEF2YWlsYWJsZS5pbm5lckhUTUwgPSBjdXJyZW5jeUZvcm1hdHRlci5mb3JtYXQodG90YWxBdFJldGlyZW1lbnQpO1xuICAgIGlmIChhbW91bnROZWVkZWQgPiAwKSB7XG4gICAgICB0aGlzLiRwZXJjZW50UHJvZ3Jlc3MuaW5uZXJIVE1MID0gcGVyY2VudEZvcm1hdHRlci5mb3JtYXQodG90YWxBdFJldGlyZW1lbnQgLyBhbW91bnROZWVkZWQpO1xuICAgICAgdGhpcy4kcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBwZXJjZW50Rm9ybWF0dGVyLmZvcm1hdChNYXRoLm1heCgwLCB0b3RhbEF0UmV0aXJlbWVudCAvIGFtb3VudE5lZWRlZCkpO1xuICAgICAgdGhpcy4kcHJvZ3Jlc3NJbmRpY2F0b3Iuc3R5bGUucGFkZGluZ0xlZnQgPSBwZXJjZW50Rm9ybWF0dGVyLmZvcm1hdChNYXRoLm1pbigxLCB0b3RhbEF0UmV0aXJlbWVudCAvIGFtb3VudE5lZWRlZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRwZXJjZW50UHJvZ3Jlc3MuaW5uZXJIVE1MID0gcGVyY2VudEZvcm1hdHRlci5mb3JtYXQoMSk7XG4gICAgICB0aGlzLiRwcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IHBlcmNlbnRGb3JtYXR0ZXIuZm9ybWF0KDEpO1xuICAgICAgdGhpcy4kcHJvZ3Jlc3NJbmRpY2F0b3Iuc3R5bGUucGFkZGluZ0xlZnQgPSBwZXJjZW50Rm9ybWF0dGVyLmZvcm1hdCgxKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRGVmaW5lIHRoZSBlbGVtZW50IGluIHRoZSB3aW5kb3cgbmFtZXNwYWNlXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZXRpcmVtZW50LWNhbGN1bGF0b3InLCBSZXRpcmVtZW50Q2FsY3VsYXRvcik7XG5cbi8vPHRvZ2dsZS1zd2l0Y2ggbGFiZWw9XCJDYWxjdWxhdGUgUmV0aXJlbWVudCBOZWVkcyBiYXNlZCBvblwiIGxhYmVsTGVmdD1cIldpdGhkcmF3YWwgUmF0ZVwiIGxhYmVsUmlnaHQ9XCJMaWZlc3BhblwiIGluaXRpYWxWYWx1ZT0wPjwvdG9nZ2xlLXN3aXRjaD5cbiIsImV4cG9ydCBjb25zdCBjdXJyZW5jeUZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ1VTRCcgfSk7XG5leHBvcnQgY29uc3QgcGVyY2VudEZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7IHN0eWxlOiAncGVyY2VudCcgfSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBDdXJyZW5jeUlucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL2N1cnJlbmN5SW5wdXQnO1xuaW1wb3J0IHsgUGVyY2VudGFnZUlucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL3BlcmNlbnRhZ2VJbnB1dCc7XG5pbXBvcnQgeyBSZXRpcmVtZW50Q2FsY3VsYXRvciB9IGZyb20gJy4vcHJvamVjdHMvcmV0aXJlbWVudC1jYWxjdWxhdG9yJztcblxuZXhwb3J0IHsgQ3VycmVuY3lJbnB1dCwgUGVyY2VudGFnZUlucHV0LCBSZXRpcmVtZW50Q2FsY3VsYXRvciB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==