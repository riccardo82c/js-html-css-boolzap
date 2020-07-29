$(function () {

	$('#input-mes').focus(changeMicToMess);

	$('#input-mes').focusout(changeMicToMess2);

	function changeMicToMess() {
		$('.fly-message').fadeIn(1);
		$('.mic').fadeOut(1);


	}

	function changeMicToMess2() {
		$('.mic').fadeIn(1);
		$('.fly-message').fadeOut(1);
	}




	var testo = $('#input-mes').val('');


	$('#input-mes').keydown(inserisci);

	function inserisci(e) {
		if (e.which == 13 || e.keyCode == 13) {

			var testo = $(this).val();
			var data = new Date();
			var ora = data.getHours() + ":" + data.getMinutes();
			if (testo != '') {
				console.log(testo);
				$(this).val('')
				// clono tutto l'elemento bubble
				var elemento = $('.template .bubble').clone();
				// modifico l'elemento NUOVO in memoria
				elemento.addClass('send');
				elemento.find('.bubble-text').append(testo);
				elemento.find('.bubble-time').append(ora);
				// lo appendo nel DOM
				$('.chat').append(elemento);
				/* template.append(testo); */
			}

			setTimeout(risposta, 3000);

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

			function numRandom(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}


			function risposta() {

				var indice = numRandom(1, risposte.length - 1);
				console.log(indice);
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
				/* template.append(testo); */

			}

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