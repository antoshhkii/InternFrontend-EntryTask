<script lang="ts">
  let amountFrom: number = 0;
  let amountTo: number = 0;
  let fromCurrency: string = 'USD';
  let toCurrency: string = 'EUR';
  let exchangeRate: number = 0;

  async function fetchExchangeRate() {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    exchangeRate = data.rates[toCurrency];
  }
  function handleCurrencyChange() {
    fetchExchangeRate();
  }

  $: {
    fetchExchangeRate();
  }

  $: {
    amountTo = amountFrom * exchangeRate;
  }

  function formatNumber(number: number, decimals: number): string {
    return number.toFixed(decimals);
  }

  function handleInputFrom(event: Event) {
    amountFrom = Number((event.target as HTMLInputElement).value);
    amountTo = amountFrom * exchangeRate;
  }

  function handleInputTo(event: Event) {
    amountTo = Number((event.target as HTMLInputElement).value);
    amountFrom = amountTo / exchangeRate;
  }
</script>

<style> /* Немного стиля*/
  div {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    color: #000;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="number"], select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>

<div>
  <h1>Валютный конвертер</h1>
  <label>
    Сумма в исходной валюте:
    <input type="number" bind:value={amountFrom} on:input={handleInputFrom}>
  </label>
  <label>
    Сумма в целевой валюте:
    <input type="number" bind:value={amountTo} on:input={handleInputTo}>
  </label>
  <label>
    Из:
    <select bind:value={fromCurrency} on:change={handleCurrencyChange}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
      <option value="CNY">CNY</option>
    </select>
  </label>
  <label>
    В:
    <select bind:value={toCurrency} on:change={handleCurrencyChange}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
      <option value="CNY">CNY</option>
    </select>
  </label>
</div>
