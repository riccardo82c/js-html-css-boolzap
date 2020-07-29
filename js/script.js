$(function () {

	/* array delle risposte fake */
	var risposte = [
		'Tutto bene, tu?',
		'A che ora ci vediamo domani?',
		'Hai voglia di uscire dopo?',
		'Bentornato!!!',
		'Era da tanto che nn ti facevi sentire.',
		'Mi piace sentire la tua voce.',
		'Chi non muore si rivede è?',
		'Certamente!',
		'Domani hanno detto che farà brutto tempo.'
	]

	/* resetto il campo input al loading della pagina */
	$('#input-mes').val('');

	/* richiamo funzione per cambiare icona lato destro input al focus */
	$('#input-mes').focus(changeMicToMess);
	$('#input-mes').focusout(changeMicToMess);

	/* richiamo funzione inserimento caratteri al press di tasti nell'input */
	$('#input-mes').keydown(chatKeyboard);

	/* richiamo funzione inserimento caratteri al press del tasto fly mess */
	$('#input-mes-btn').on('click', chatting);






	/* Funzioni */

	// funzione per cambiare icona a lato input chat
	function changeMicToMess() {
		$('.fly-message,.mic').toggle(400);
	}
	// numero random
	function numRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// add zero all'ora corrente
	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	/* funzione inserimento caratteri al press di tasti nell'input */
	function chatKeyboard(e) {
		if (e.which == 13 || e.keyCode == 13) {
			chatting();
		}
	}

	// funzione invio e ricezione messaggi
	function chatting() {

		var testo = $('#input-mes').val();
		var data = new Date();
		var ora = addZero(data.getHours()) + ":" + addZero(data.getMinutes());
		if (testo != '') {
			console.log(testo);
			$('#input-mes').val('')
			// clono tutto l'elemento bubble
			var elemento = $('.template .bubble').clone();
			// modifico l'elemento NUOVO in memoria
			elemento.addClass('send');
			elemento.find('.bubble-text').append(testo);
			elemento.find('.bubble-time').append(ora);
			// lo appendo nel DOM
			$('.chat').append(elemento);
			$('.chat').scrollTop(2000);
			/* template.append(testo); */
		}

		setTimeout(receiveMess, 3000);

		function receiveMess() {

			var indice = numRandom(1, risposte.length - 1);
			var testo = risposte[indice];
			var data = new Date();
			var ora = data.getHours() + ":" + data.getMinutes();

			// clono tutto l'elemento bubble
			var elemento = $('.template .bubble').clone();
			// modifico l'elemento NUOVO in memoria
			elemento.addClass('received');
			elemento.find('.bubble-text').append(testo);
			elemento.find('.bubble-time').append(ora);
			// lo appendo nel DOM
			$('.chat').append(elemento);

			// al termine del messaggiori di ritorno faccio lo scroll down
			$('.chat').scrollTop(2000);






		}
	}



});


/* $(function () {

	$('#input-mes').keydown(inserisci);

	function inserisci(e) {
		if (e.which == 13 || e.keyCode == 13) {

			var testo = $(this).val();
			$(this).val('')


			if(testo)

			var data = new Date();
			var ora = data.getHours() + ":" + data.getMinutes();

			$('.chat').append(`
					<div class="bubble send">
						<p class='bubble-text'>${testo}</p>
						<div class="bubble-time">${ora}</div>
					</div>
				</div>`);


			setTimeout(risposta, 3000);

			var risposte = [
				'Tutto bene, tu?',
				'A che ora ci vediamo domani?',
				'Hai voglia di uscire dopo?',
				'Bentornato!!!',
				'Era da tanto che nn ti facevi sentire'
			]

			function numRandom(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			function risposta() {

				var indice = numRandom(1, risposte.length - 1);
				console.log(indice);
				var testo = risposte[indice];
				var data = new Date();
				var ora = data.getHours() + ":" + data.getMinutes();

				$('.chat').append(`
					<div class="bubble received">
						<p class='bubble-text'>${testo}</p>
						<div class="bubble-time">${ora}</div>
					</div>
				</div>`);

			}
		}
	}

}); */