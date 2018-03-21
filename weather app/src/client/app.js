module.exports = (error="")=>`<form method="post">
<div>City</div>
<div>
	<input type="text" onblur="this.form.submit()" name="city">
</div>
	<div>${error}</div>
<div>
	check window.res to seee results
</div>
</form>
`