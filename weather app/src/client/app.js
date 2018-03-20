module.exports = (data, error="")=>`
<style>
body {
  font-family: monaco, monospace;
  font-size: 2vw;
}
.ico {
  height: auto;
  width: 20%
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
input{
  background: transparent;
  border: none;
  margin-top: 1%;
  border-bottom: 1px solid black;
  width: 100%;
  text-align: center;
  padding-top: 2%;
  padding bottom: 2%;
}
input:focus{
	outline-style:none;
	box-shadow:none;
	border-color:transparent;
	border-bottom: 1px solid black;
}
input:hover{
  border-bottom: 1px solid grey;
}
::placeholder {
	color: black;
	font-size: 120%;
}
.item{
  text-align: center;
  padding: 1%;
  width: 50%;
}
</style>

	<div style="padding:2%">
	<form method="post">
	<input type="text" onblur="this.form.submit()" placeholder="City" name="city">
	</form>
	<div class='row'>
		<div class='item'>${error}</div>
	</div>

	${data?`
		<div class='row' style="font-size: 150%;">
			<img class='ico' src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].main}">
			<div>
				<div>${data.name}</div>
				<div>${data.weather[0].main}</div>
				<div style="font-size: 50%;">${data.weather[0].description}</div>
			</div>
		</div>

		<div class='row'>
			<div class='item'>Temperature</div>
			<div class='item'>${data.main.temp - 273.15}&#8451</div>
		</div>

		<div class='row'>
			<div class='item'>Pressure</div>
			<div class='item'>${data.main.pressure}hPa</div>
		</div>

		<div class='row'>
			<div class='item'>Humidity</div>
			<div class='item'>${data.main.humidity}%</div>
		</div>

		<div class='row'>
			<div class='item'>Wind speed</div>
			<div class='item'>${data.wind.speed}mps</div>
		</div>

		<div class='row'>
			<div class='item'>Clouds</div>
			<div class='item'>${data.clouds.all}%</div>
		</div>
	`:''}
`;