$(function () {

	var template = $('#template .bubble').clone();
	console.log(template);


	$('#input-mes').keydown(inserisci);

	function inserisci(e) {
		if (e.which == 13 || e.keyCode == 13) {

			var testo = $(this).val();
			$(this).val('')
			console.log(testo);
		}
	}
});





/* $(function () {

	var testo = 'prova';
	var data = new Date();
	var ora = data.getHours() + ":" + data.getMinutes();

	$('.chat').append(`<div class="message send">
					<div class="bubble">
						<p>${testo}</p>
						<div class="bubble-time">${ora}</div>
					</div>
				</div>`);


	setTimeout(risposta, 3000);


	function risposta() {
		var testo = 'Buonanotte';
		var data = new Date();
		var ora = data.getHours() + ":" + data.getMinutes();

		$('.chat').append(`<div class="message received">
					<div class="bubble">
						<p>${testo}</p>
						<div class="bubble-time">${ora}</div>
					</div>
				</div>`);

	}


}); */