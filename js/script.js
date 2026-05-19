async function loadData() {
const url = 'https://hp-api.onrender.com/api/characters'; // mit korrekter API-URL ersetzen
try {
const response = await fetch(url);
return await response.json();
} catch (error) {
console.error(error);
return false;
}
}
const data = await loadData();
console.log(data);
