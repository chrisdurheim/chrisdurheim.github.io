(()=>{"use strict";var t={129:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.CurrencyInput=void 0;const r=n(424);class i extends r.NumberInput{constructor(){super(),this.setAttribute("prefix","$")}}e.CurrencyInput=i,window.customElements.define("currency-input",i)},740:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ThriftyCalculator=e.PercentageInput=e.CurrencyInput=e.NumberInput=void 0;const r=n(424);Object.defineProperty(e,"NumberInput",{enumerable:!0,get:function(){return r.NumberInput}});const i=n(129);Object.defineProperty(e,"CurrencyInput",{enumerable:!0,get:function(){return i.CurrencyInput}});const s=n(31);Object.defineProperty(e,"PercentageInput",{enumerable:!0,get:function(){return s.PercentageInput}});const a=n(457);Object.defineProperty(e,"ThriftyCalculator",{enumerable:!0,get:function(){return a.ThriftyCalculator}})},424:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.NumberInput=e.numberInputTemplate=void 0,e.numberInputTemplate=document.createElement("template"),e.numberInputTemplate.innerHTML='\n<style>\n  :host {\n    --primary-color: blue;\n    --error-color: red;\n    --line-color: lightgray;\n    --meta-color: gray;\n    --standard-radius: 0.5rem;\n    \n    display: inline-block;\n    margin: 0.5rem 0;\n    width: 8rem;\n  }\n  input[type=number]::-webkit-inner-spin-button, \n  input[type=number]::-webkit-outer-spin-button { \n    -webkit-appearance: none; \n  }\n\n  input[type=number] {\n    -moz-appearance: textfield;\n  }\n  label {\n    font-size: 0.875rem;\n  }\n  div.input-field {\n    margin: 0.25rem 0;\n    padding: 0.5rem;\n    border: 1px solid var(--line-color);\n    border-radius: var(--standard-radius);\n    background-color: white;\n  }\n  div.input-field:focus-within {\n    border-color: var(--primary-color);\n  }\n  :host([error]) div.input-field {\n    border-color: var(--error-color);\n  }\n  span.prefix,\n  span.suffix {\n    font-size: 0.75rem;\n    color: var(--meta-color);\n  }\n  input {\n    border: none;\n    outline: none;\n    width: 5.25rem;\n  }\n  :host([prefix]) input {\n    text-align: left;\n  }\n  :host([suffix]) input {\n    text-align: right;\n  }\n  div.notes {\n    color: var(--meta-color);\n    font-size: 0.75rem;\n  }\n  :host([error]) div.notes {\n    color: var(--error-color);\n  }\n</style>\n\n  <label></label>\n  <div class="input-field">\n    <span class="prefix"></span>\n    <input type=number />\n    <span class="suffix"></span>\n  </div>\n  <div class="notes"></div>\n';class n extends HTMLElement{constructor(){super(),this.$label=null,this.$prefix=null,this.$input=null,this.$suffix=null,this.$notes=null,this.initialRender=!0,this._root=this.attachShadow({mode:"open"}),this.setCustomStyling()}static get observedAttributes(){return["standard-radius","primary-color","line-color","error-color","meta-color"]}setCustomStyling(){const t=this.attributes.getNamedItem("standard-radius");t&&this.style.setProperty("--standard-radius",t.value);const e=this.attributes.getNamedItem("primary-color");e&&this.style.setProperty("--primary-color",e.value);const n=this.attributes.getNamedItem("line-color");n&&this.style.setProperty("--line-color",n.value);const r=this.attributes.getNamedItem("error-color");r&&this.style.setProperty("--error-color",r.value);const i=this.attributes.getNamedItem("meta-color");i&&this.style.setProperty("--meta-color",i.value)}connectedCallback(){if(this._root.appendChild(e.numberInputTemplate.content.cloneNode(!0)),this.$label=this._root.querySelector("label"),this.$prefix=this._root.querySelector("span.prefix"),this.$input=this._root.querySelector("input"),this.$suffix=this._root.querySelector("span.suffix"),this.$notes=this._root.querySelector("div.notes"),!this.$label||!this.$input||!this.$notes)throw new Error("elements not present");this.$prefix&&(this.$prefix.innerHTML=this.inputPrefix(),this.$prefix.addEventListener("click",this.focusInput.bind(this))),this.$suffix&&(this.$suffix.innerHTML=this.inputSuffix(),this.$suffix.addEventListener("click",this.focusInput.bind(this))),this.$input.id=this.getAttribute("id")+"-input"||0,this.$input.value=this.initialValue(),this.$input.value&&this.setAttribute("value",`${this.currentValue()}`),this.$input.placeholder=this.placeholder(),this.$label.innerHTML=this.label(),this.$label.htmlFor=this.getAttribute("id")+"-input"||0,this.$input.addEventListener("input",this.refresh.bind(this)),this._render()}attributeChangedCallback(t,e,r){n.observedAttributes.includes(t)&&this.setCustomStyling()}disconnectedCallback(){var t;null===(t=this.$input)||void 0===t||t.removeEventListener("input",this._render.bind(this))}value(){const t=this.getAttribute("value");if(t)return new Number(t)}label(){return this.getAttribute("label")||""}notes(){return this.getAttribute("notes")||""}inputPrefix(){return this.getAttribute("prefix")||""}inputSuffix(){return this.getAttribute("suffix")||""}placeholder(){return this.getAttribute("placeholder")||""}initialValue(){return this.getAttribute("initialValue")||""}error(){return this.getAttribute("error")||void 0}min(){const t=this.getAttribute("min");if(t)return new Number(t)}max(){const t=this.getAttribute("max");if(t)return new Number(t)}currentValue(){var t;return this.standardizedValue(new Number(null===(t=this.$input)||void 0===t?void 0:t.value))}standardizedValue(t){return t}valueString(t){return`${this.inputPrefix()}${t}${this.inputSuffix()}`}setNotes(t){this.$notes&&(this.$notes.innerHTML=t)}setError(t){this.setAttribute("error",t),this.$notes&&(this.$notes.innerHTML=t)}clearError(){this.removeAttribute("error"),this.$notes&&(this.$notes.innerHTML=this.notes()||"&nbsp;")}errorMessage(){const t=this.min();if(t&&this.standardizedValue(this.currentValue())<t)return`Must be ${this.valueString(t)} or more`;const e=this.max();return!!(e&&this.standardizedValue(this.currentValue())>e)&&`Must be ${this.valueString(e)} or less`}setValue(t){this.$input&&(this.$input.value=t.toFixed(2),this.setAttribute("value",`${this.currentValue()}`))}focusInput(){this.$input&&this.$input.focus()}refresh(){this.clearError(),this._render()}_render(){if(!this.$label||!this.$input||!this.$notes)throw new Error("elements not present");const t=this.errorMessage();!this.initialRender&&t?this.setError(t):this.clearError(),this.initialRender=!1,this.setAttribute("value",`${this.currentValue()}`),this.dispatchEvent(new CustomEvent("onUpdate",{detail:{value:this.value()}}))}}e.NumberInput=n,window.customElements.define("number-input",n)},31:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PercentageInput=void 0;const r=n(424);class i extends r.NumberInput{constructor(){super(),this.setAttribute("suffix","%")}currentValue(){var t;return new Number(null===(t=this.$input)||void 0===t?void 0:t.value)/100}standardizedValue(t){return 100*t}}e.PercentageInput=i,window.customElements.define("percentage-input",i)},457:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ThriftyCalculator=void 0;class n extends HTMLElement{constructor(){super(),console.log("\n* * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n*                                                       *  \n* Thrifty Calculators                                   *\n*                                                       *\n* Calculators Copyright 2021 WhysWorks LLC              *\n*                                                       *\n* For more information, contact chris@chrisdurheim.com  *\n*                                                       *\n* * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n  "),this._root=this.attachShadow({mode:"open"})}connectedCallback(){this._render()}disconnectedCallback(){}_render(){}}e.ThriftyCalculator=n},448:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.RetirementCalculator=e.retirementCalculatorTemplate=void 0;const r=n(740),i=n(911);e.retirementCalculatorTemplate=document.createElement("template"),e.retirementCalculatorTemplate.innerHTML='\n<style>\n  :host {\n    font-size: 16px;\n\n    --primary-color: blue;\n    --line-color: lightgray;\n    --standard-radius: 0.5rem;\n    --heading-color: black;\n\n    display: inline-block;\n    font-family: Arial, Helvetica, sans-serif;\n\n    box-sizing: border-box;\n\n    margin: 2rem auto;\n    padding: 1rem;\n\n    width: calc(100% - 1rem);\n    max-width: 20rem;\n    \n    border: 1px solid var(--line-color);\n    border-radius: var(--standard-radius);\n\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .calculator__title {\n    color: var(--heading-color);\n    font-size: 1.5rem;\n    flex: 0 0 100%;\n    font-weight: bold;\n    text-align: center;\n    padding: 0 0 1rem;\n  }\n  section.inputs-group {\n    flex: 0 0 100%;\n\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-around;\n  }\n  .calculator__section-title {\n    color: var(--heading-color);\n    font-size: 1.25rem;\n    flex: 0 0 100%;\n    margin: 0.5rem 0;\n    font-weight: bold;\n    padding: 0 0 0.5rem;\n    border-bottom: 1px solid var(--line-color);\n  }\n  .inputs {\n    margin: 1rem 0;\n    flex: 0 0 100%;\n  }\n  .outputs {\n    margin: 1rem 0;\n    flex: 0 0 100%;\n    padding: 0;\n  }\n  number-input, currency-input, percentage-input {\n    margin: 0.5rem 1rem;\n  }\n\n  #calculator__customize {\n    border: 1px solid var(--line-color);\n    border-radius: var(--standard-radius);\n\n    background-color: WhiteSmoke;\n    position: relative;\n  }\n  #calculator__customize number-input, \n  #calculator__customize toggle-switch, \n  #calculator__customize currency-input, \n  #calculator__customize percentage-input,\n  #calculator__customize button.input-toggle {\n    display: none;\n  }\n\n  #calculator__customize.expanded number-input,\n  #calculator__customize.expanded toggle-switch, \n  #calculator__customize.expanded currency-input, \n  #calculator__customize.expanded percentage-input,\n  #calculator__customize.expanded button.input-toggle {\n    display: initial;\n  }\n\n  #calculator__customize .calculator__section-title:after {\n    content: "";\n    background-image: url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI5Mi4zNjJweCIgaGVpZ2h0PSIyOTIuMzYycHgiIHZpZXdCb3g9IjAgMCAyOTIuMzYyIDI5Mi4zNjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Mi4zNjIgMjkyLjM2MjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0DQoJCUMxLjgwNyw3Mi45OTgsMCw3Ny4yNzksMCw4Mi4yMjhjMCw0Ljk0OCwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDdsMTI3LjkwNywxMjcuOTA3YzMuNjIxLDMuNjE3LDcuOTAyLDUuNDI4LDEyLjg1LDUuNDI4DQoJCXM5LjIzMy0xLjgxMSwxMi44NDctNS40MjhMMjg2LjkzNSw5NS4wNzRjMy42MTMtMy42MTcsNS40MjctNy44OTgsNS40MjctMTIuODQ3QzI5Mi4zNjIsNzcuMjc5LDI5MC41NDgsNzIuOTk4LDI4Ni45MzUsNjkuMzc3eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=\');\n    background-size: 100% 100%;\n    display: inline-block;\n    \n    position: absolute;\n    width: 1rem;\n    height: 1rem;\n    top: 1.75rem;\n    right: 1rem;\n    cursor: pointer;\n    transition: transform 250ms ease-in-out;\n  }\n  #calculator__customize.expanded .calculator__section-title:after {\n    transform: rotate(-180deg);\n  }\n\n  #calculator__customize .calculator__section-title {\n    color: var(--heading-color);\n    flex: 0 0 calc(100% - 2rem);\n    padding: 1rem 2rem 1rem 1rem;\n    display: inline-block;\n    border-bottom: none;\n  }\n\n  #calculator__customize #life-expectancy {\n    display: none;\n  }\n\n  button.input-toggle {\n    font-weight: bold;\n    margin: 1rem;\n    border: none;\n    background: none;\n    color: var(--primary-color);\n    cursor: pointer;\n  }\n\n  button.input-toggle:hover,\n  button.input-toggle:focus {\n    text-decoration: underline;\n  }\n\n  p.calculator__result {\n    font-size: 1.125rem;\n  }\n\n  .calculator__progress-bar {\n    border: 1px solid var(--line-color);\n    height: 2rem;\n    border-radius: var(--standard-radius);\n    overflow: hidden;\n  }\n\n  .calculator__progress-bar .completed {\n    display: inline-block;\n    border-right: 1px solid var(--line-color);\n    height: 2rem;\n    background-color: var(--primary-color);;\n    position: relative;\n    transition: width 250ms ease 0s;\n  }\n\n  .calculator__progress-indicator {\n    background-image: url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjI5Mi4zNjJweCIgaGVpZ2h0PSIyOTIuMzYycHgiIHZpZXdCb3g9IjAgMCAyOTIuMzYyIDI5Mi4zNjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Mi4zNjIgMjkyLjM2MjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0DQoJCUMxLjgwNyw3Mi45OTgsMCw3Ny4yNzksMCw4Mi4yMjhjMCw0Ljk0OCwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDdsMTI3LjkwNywxMjcuOTA3YzMuNjIxLDMuNjE3LDcuOTAyLDUuNDI4LDEyLjg1LDUuNDI4DQoJCXM5LjIzMy0xLjgxMSwxMi44NDctNS40MjhMMjg2LjkzNSw5NS4wNzRjMy42MTMtMy42MTcsNS40MjctNy44OTgsNS40MjctMTIuODQ3QzI5Mi4zNjIsNzcuMjc5LDI5MC41NDgsNzIuOTk4LDI4Ni45MzUsNjkuMzc3eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=\');\n    background-size: auto 100%;\n    background-repeat: no-repeat;\n    background-position: right center;\n    display: inline-block;\n    width: 1rem;\n    height: 1rem;\n    padding-left: 0;\n    transform: translateX(-0.5rem);\n    transition: padding 250ms ease 0s;\n    max-width: 100%;\n  }\n\n  .error-outputs {\n    display: none;\n  }\n\n  @media screen and (min-width: 768px) {\n    :host {\n      width: calc(100% - 2rem);\n      max-width: 60rem;\n    }\n    .inputs {\n      flex: 1 0 20rem;\n    }\n    .outputs {\n      flex: 1 0 18rem;\n      padding: 0 2rem;\n    } \n  }\n</style>\n\n  <div class="calculator__title">Retirement Calculator</div>\n\n  <div class="inputs">\n    <section class="inputs-group">\n      <div class="calculator__section-title">Enter the Basics</div>\n      <number-input label="Current Age" initialValue=50 id="current-age" min=0 max=120></number-input>\n      <number-input label="Retirement Age" initialValue=65 id="retirement-age" min=0 max=120></number-input>\n      <currency-input label="Current Savings" initialValue=400000 id="current-savings" min=0></currency-input>\n      <currency-input label="Monthly Savings" initialValue=750 id="monthly-savings" min=0></currency-input>\n      <currency-input label="Annual Income (Pre-tax)" initialValue=125000 id="annual-income" min=0></currency-input>\n    </section>\n\n    <section class="inputs-group" id="calculator__customize">\n      <div class="calculator__section-title">Customize (optional)</div>\n      <percentage-input label="Annual Salary Growth" initialValue=2 id="salary-growth-rate" min=0></percentage-input>\n      <percentage-input label="Annual Inflation Rate" initialValue=3 id="inflation-rate" min=0></percentage-input>\n      <percentage-input label="Invesmtent Return<br>(pre-retirement)" initialValue=7 id="pre-ret-inv-ror" min=0></percentage-input>\n      <currency-input label="Monthly Retirement Spending" initialValue=7198.85 id="monthly-ret-spending" min=0 notes="Calculated as 80% of pre-retirement income - in today\'s dollars"></currency-input>\n      <currency-input label="Other Retirement Income (monthly)" initialValue=1600 id="monthly-ret-other-income" min=0 notes="In today\'s dollars"></currency-input>\n      <percentage-input label="Expected Withdrawal Rate" initialValue=4 id="withdrawal-rate" min=0></percentage-input>\n      <percentage-input label="Invesmtent Return<br>(in retirement)" initialValue=5 id="post-ret-inv-ror" min=0></percentage-input>\n      <number-input label="Life Expectancy" initialValue=100 id="life-expectancy" min=0 max=120></number-input>\n      <button class="input-toggle">Click to use Life Expectancy instead of Withdrawal Rate</button>\n    </section>\n  </div>\n\n  <div class="outputs">\n    <div class="valid-outputs">\n      <section>\n        <div class="calculator__section-title">Your Results</div>\n        <p class="calculator__result">To retire on-schedule, you\'ll need <span id="amount-needed"></span>.</p>\n        <p class="calculator__result">You\'re on track to have about <span id="amount-available"></span>.</p>\n        <p class="calculator__result">You\'re <span id="percent-progress"></span> of the way there.</p>\n      </section>\n      <section>\n        <div class="calculator__progress-indicator">\n        </div>\n        <div class="calculator__progress-bar">\n          <span class="completed"></span>\n          <span class="to-completeleft"></span>\n        </div>\n      </section>\n    </div>\n    <div class="error-outputs">\n      <section>\n        <div class="calculator__section-title">Error</div>\n        <p class="calculator__result"><span id="error-message"></span></p>\n      </section>\n    </div>\n  </div>\n  \n';class s extends r.ThriftyCalculator{constructor(){super(),this.$currentAge=null,this.$retirementAge=null,this.$annualIncome=null,this.$currentSavings=null,this.$monthlySavings=null,this.$annualSalaryGrowth=null,this.$investmentPreRetRor=null,this.$investmentPostRetRor=null,this.$withdrawalRate=null,this.$inflationRate=null,this.$retSpending=null,this.$retIncome=null,this.$lifeExpectancy=null,this.$amountNeeded=null,this.$amountAvailable=null,this.$percentProgress=null,this.$progressBar=null,this.$progressIndicator=null,this.$toggleButton=null,this.$validOutputs=null,this.$errorOutputs=null,this.$errorMessage=null,this.calcOnWithdrawalRate=!0,this.$expandBox=null,this.$expandLink=null,this.setCustomStyling()}setCustomStyling(){const t=this.attributes.getNamedItem("standard-radius");t&&this.style.setProperty("--standard-radius",t.value);const e=this.attributes.getNamedItem("primary-color");e&&this.style.setProperty("--primary-color",e.value);const n=this.attributes.getNamedItem("line-color");n&&this.style.setProperty("--line-color",n.value);const r=this.attributes.getNamedItem("error-color");r&&this.style.setProperty("--error-color",r.value);const i=this.attributes.getNamedItem("meta-color");i&&this.style.setProperty("--meta-color",i.value);const s=this.attributes.getNamedItem("heading-color");s&&this.style.setProperty("--heading-color",s.value)}passDownAttribute(t,e){const n=this.getAttribute(e);n&&t.setAttribute(e,n)}connectedCallback(){this._root.appendChild(e.retirementCalculatorTemplate.content.cloneNode(!0)),this.$currentAge=this._root.querySelector("#current-age"),this.$retirementAge=this._root.querySelector("#retirement-age"),this.$annualIncome=this._root.querySelector("#annual-income"),this.$currentSavings=this._root.querySelector("#current-savings"),this.$monthlySavings=this._root.querySelector("#monthly-savings"),this.$annualSalaryGrowth=this._root.querySelector("#salary-growth-rate"),this.$investmentPreRetRor=this._root.querySelector("#pre-ret-inv-ror"),this.$investmentPostRetRor=this._root.querySelector("#post-ret-inv-ror"),this.$withdrawalRate=this._root.querySelector("#withdrawal-rate"),this.$inflationRate=this._root.querySelector("#inflation-rate"),this.$retSpending=this._root.querySelector("#monthly-ret-spending"),this.$retIncome=this._root.querySelector("#monthly-ret-other-income"),this.$lifeExpectancy=this._root.querySelector("#life-expectancy"),this.$toggleButton=this._root.querySelector("button.input-toggle"),this.$expandBox=this._root.querySelector("#calculator__customize"),this.$validOutputs=this._root.querySelector(".valid-outputs"),this.$errorOutputs=this._root.querySelector(".error-outputs"),this.$errorMessage=this._root.querySelector("#error-message"),this.$amountNeeded=this._root.querySelector("#amount-needed"),this.$amountAvailable=this._root.querySelector("#amount-available"),this.$percentProgress=this._root.querySelector("#percent-progress"),this.$progressBar=this._root.querySelector(".calculator__progress-bar .completed"),this.$progressIndicator=this._root.querySelector(".calculator__progress-indicator");const t=[this.$currentAge,this.$retirementAge,this.$annualIncome,this.$currentSavings,this.$monthlySavings,this.$annualSalaryGrowth,this.$investmentPreRetRor,this.$investmentPostRetRor,this.$withdrawalRate,this.$inflationRate,this.$retSpending,this.$retIncome,this.$lifeExpectancy];for(const e of t)e&&(this.passDownAttribute(e,"standard-radius"),this.passDownAttribute(e,"primary-color"),this.passDownAttribute(e,"line-color"),this.passDownAttribute(e,"error-color"),this.passDownAttribute(e,"meta-color"),e.addEventListener("onUpdate",this._render.bind(this)));this.$expandBox?(this.$expandLink=this.$expandBox.querySelector(".calculator__section-title"),this.$expandLink?(this.$expandLink.addEventListener("click",this.toggleExpand.bind(this)),this.$toggleButton?(this.$toggleButton.addEventListener("click",this.toggleRetirementCalculation.bind(this)),this.$currentAge&&this.$retirementAge&&this.$annualIncome&&this.$inflationRate&&this.$annualSalaryGrowth&&this.$retSpending?(this.$currentAge.addEventListener("onUpdate",this.updateRetSpending.bind(this)),this.$retirementAge.addEventListener("onUpdate",this.updateRetSpending.bind(this)),this.$annualIncome.addEventListener("onUpdate",this.updateRetSpending.bind(this)),this.$inflationRate.addEventListener("onUpdate",this.updateRetSpending.bind(this)),this.$annualSalaryGrowth.addEventListener("onUpdate",this.updateRetSpending.bind(this)),this.$retSpending.addEventListener("onUpdate",this.updateRetSpendingNote.bind(this)),this._render()):this.renderError("Calculator element(s) missing")):this.renderError("Calculator element(s) missing")):this.renderError("Calculator element(s) missing")):this.renderError("Calculator element(s) missing")}disconnectedCallback(){}currentAge(){var t;return(null===(t=this.$currentAge)||void 0===t?void 0:t.value())||0}retirementAge(){var t;return(null===(t=this.$retirementAge)||void 0===t?void 0:t.value())||67}annualIncome(){var t;return(null===(t=this.$annualIncome)||void 0===t?void 0:t.value())||0}currentSavings(){var t;return(null===(t=this.$currentSavings)||void 0===t?void 0:t.value())||0}monthlySavings(){var t;return(null===(t=this.$monthlySavings)||void 0===t?void 0:t.value())||0}annualSalaryGrowth(){var t;return(null===(t=this.$annualSalaryGrowth)||void 0===t?void 0:t.value())||0}investmentPreRetRor(){var t;return(null===(t=this.$investmentPreRetRor)||void 0===t?void 0:t.value())||0}investmentPostRetRor(){var t;return(null===(t=this.$investmentPostRetRor)||void 0===t?void 0:t.value())||0}withdrawalRate(){var t;return(null===(t=this.$withdrawalRate)||void 0===t?void 0:t.value())||.04}lifeExpectancy(){var t;return(null===(t=this.$lifeExpectancy)||void 0===t?void 0:t.value())||100}inflationRate(){var t;return(null===(t=this.$inflationRate)||void 0===t?void 0:t.value())||0}retSpending(){var t;return(null===(t=this.$retSpending)||void 0===t?void 0:t.value())||0}retIncome(){var t;return(null===(t=this.$retIncome)||void 0===t?void 0:t.value())||0}futureValue(t,e,n){return t*(1+e)**n}futureValueAnnuity(t,e,n,r=0){return Math.abs(e-r)<Number.EPSILON?t*n*(1+e)**(n-1):t*((1+e)**n-(1+r)**n)/(e-r)}toggleExpand(){this.$expandLink&&this.$expandBox?(this.$expandBox.classList.toggle("expanded"),this._render()):this.renderError("Calculator element(s) missing")}toggleRetirementCalculation(){this.calcOnWithdrawalRate=!this.calcOnWithdrawalRate,this._render()}anyErrors(){return!![this.$currentAge,this.$retirementAge,this.$annualIncome,this.$currentSavings,this.$monthlySavings,this.$annualSalaryGrowth,this.$investmentPreRetRor,this.$inflationRate,this.$retSpending,this.$retIncome].some((t=>null==t?void 0:t.hasAttribute("error")))||!(!this.calcOnWithdrawalRate||this.$withdrawalRate&&!this.$withdrawalRate.hasAttribute("error"))||!(this.calcOnWithdrawalRate||this.$lifeExpectancy&&this.$investmentPostRetRor&&!this.$lifeExpectancy.hasAttribute("error")&&!this.$investmentPostRetRor.hasAttribute("error"))}renderError(t){this.$validOutputs&&this.$errorOutputs&&this.$errorMessage&&(this.$validOutputs.style.display="none",this.$errorOutputs.style.display="initial",this.$errorMessage.innerHTML=t)}clearError(){this.$validOutputs&&this.$errorOutputs&&this.$errorMessage&&(this.$validOutputs.style.display="initial",this.$errorOutputs.style.display="none",this.$errorMessage.innerHTML="")}updateRetSpending(){if(!this.$retSpending)return void this.renderError("Calculator element(s) missing");const t=this.retirementAge()-this.currentAge(),e=this.annualIncome()*(1+this.annualSalaryGrowth())**t*.8/(1+this.inflationRate())**t;this.$retSpending.setValue(e/12),this.$retSpending.setNotes("Calculated as 80% of pre-retirement income - in today's dollars"),this._render()}updateRetSpendingNote(){var t;const e=this.retirementAge()-this.currentAge();if(!this.$retSpending)return void this.renderError("Calculator element(s) missing");const n=12*((null===(t=this.$retSpending)||void 0===t?void 0:t.value())||0)*(1+this.inflationRate())**e/(this.annualIncome()*(1+this.annualSalaryGrowth())**e);this.$retSpending.setNotes(`${i.percentFormatter.format(n)} of pre-retirement income in today's dollars`),this._render()}_render(){var t,e,n,r,s,a,o,l,u,c,d,h;if(!(this.$toggleButton&&this.$lifeExpectancy&&this.$investmentPostRetRor&&this.$expandBox&&this.$withdrawalRate))return void this.renderError("Calculator element(s) missing");if(this.calcOnWithdrawalRate?(this.$toggleButton.innerHTML="Click to use Life Expectancy instead of Withdrawal Rate",this.$lifeExpectancy.style.display="none",this.$investmentPostRetRor.style.display="none",this.$expandBox.classList.contains("expanded")?this.$withdrawalRate.style.display="initial":this.$withdrawalRate.style.display="none"):(this.$toggleButton.innerHTML="Click to use Withdrawal Rate instead of Life Expectancy",this.$expandBox.classList.contains("expanded")?(this.$investmentPostRetRor.style.display="initial",this.$lifeExpectancy.style.display="initial"):(this.$investmentPostRetRor.style.display="none",this.$lifeExpectancy.style.display="none"),this.$withdrawalRate.style.display="none"),!(this.$amountNeeded&&this.$amountAvailable&&this.$percentProgress&&this.$progressBar&&this.$progressIndicator))return void this.renderError("Calculator element(s) missing");const p=this.currentAge(),m=this.retirementAge();if(!p||!m)return void this.renderError("Calculator element(s) missing");if(p>=m)return null===(t=this.$currentAge)||void 0===t||t.setError("Current age must be less than retirement age"),null===(e=this.$retirementAge)||void 0===e||e.setError("Retirement age must be greater than current age"),void this.renderError("Something's not right - check your inputs");if("Current age must be less than retirement age"===(null===(n=this.$currentAge)||void 0===n?void 0:n.error())&&(null===(r=this.$currentAge)||void 0===r||r.clearError()),"Retirement age must be greater than current age"===(null===(s=this.$retirementAge)||void 0===s?void 0:s.error())&&(null===(a=this.$retirementAge)||void 0===a||a.clearError()),!this.calcOnWithdrawalRate&&this.lifeExpectancy()<=this.retirementAge())return null===(o=this.$lifeExpectancy)||void 0===o||o.setError("Life expectancy must be greater than retirement age"),null===(l=this.$retirementAge)||void 0===l||l.setError("Retirement age must be less than life expectancy"),void this.renderError("Something's not right - check your inputs");if("Life expectancy must be greater than retirement age"===(null===(u=this.$lifeExpectancy)||void 0===u?void 0:u.error())&&(null===(c=this.$lifeExpectancy)||void 0===c||c.clearError()),"Retirement age must be less than life expectancy"===(null===(d=this.$retirementAge)||void 0===d?void 0:d.error())&&(null===(h=this.$retirementAge)||void 0===h||h.clearError()),this.anyErrors())return void this.renderError("Something's not right - check your inputs");this.clearError();const g=this.retirementAge()-this.currentAge(),v=this.futureValue(this.currentSavings(),this.investmentPreRetRor(),g)+this.futureValueAnnuity(12*this.monthlySavings(),this.investmentPreRetRor(),g,this.annualSalaryGrowth()),y=Math.max(0,this.retSpending()-this.retIncome());let b=0;if(this.calcOnWithdrawalRate)b=12*y*(1+this.inflationRate())**g/this.withdrawalRate();else{const t=this.lifeExpectancy()-this.retirementAge()+2;b=12*y*(1+this.inflationRate())**g/(this.investmentPostRetRor()-this.inflationRate())*(1-((1+this.inflationRate())/(1+this.investmentPostRetRor()))**t)}this.$amountNeeded.innerHTML=i.currencyFormatter.format(b),this.$amountAvailable.innerHTML=i.currencyFormatter.format(v),b>0?(this.$percentProgress.innerHTML=i.percentFormatter.format(v/b),this.$progressBar.style.width=i.percentFormatter.format(Math.max(0,v/b)),this.$progressIndicator.style.paddingLeft=i.percentFormatter.format(Math.min(1,v/b))):(this.$percentProgress.innerHTML=i.percentFormatter.format(1),this.$progressBar.style.width=i.percentFormatter.format(1),this.$progressIndicator.style.paddingLeft=i.percentFormatter.format(1))}}e.RetirementCalculator=s,window.customElements.define("retirement-calculator",s)},911:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.percentFormatter=e.currencyFormatter=void 0,e.currencyFormatter=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),e.percentFormatter=new Intl.NumberFormat("en-US",{style:"percent"})}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,n),s.exports}n(129),n(31),n(448)})();