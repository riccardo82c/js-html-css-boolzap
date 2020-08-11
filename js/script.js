$(function () {

	/* To Do: */
	/* DONE settare al click del mouse nei contatti di sx il cambio dell'icona ultimo accesso, del nome e dell'ora ultimo accesso (header).
	Sostituire icona in alto a sx con la mia del pirata */

	/* DONE Inserire possibilità di effettuare search per filtrare i risultati
	dei contatti  */





	/* inserimento audio invio ricezione messaggio*/
	const sendMessAudio = new Audio("sounds/Button-click-sound.mp3");
	const receiveMessAudio = new Audio("sounds/Pop-sound-effect.mp3");


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
		'Domani hanno detto che farà brutto tempo.',
		'Forse mi confondi con qualcun\'altro',
		'Sono in riunione',
		'Ciao, come stai?',
		'Come stanno i tuoi?',
		'Dove ci troviamo?',
		'Mi sembra un\'ottima idea'
	];

	/* resetto il campo input al loading della pagina */
	$('#input-mes').val('');



	/* richiamo funzione per cambiare icona lato destro messaggio inserito al focus dello stesso*/
	$('#input-mes').focus(changeMicToMess);
	$('#input-mes').focusout(changeMicToMess);

	/* richiamo funzione inserimento caratteri al press di tasti da tastiera */
	$('#input-mes').keydown(chatKeyboard);

	/* richiamo funzione inserimento caratteri al press del bottone fly mess */
	$('#input-mes-btn').on('click', sendMess);

	/* richiamo funzione selezione contatto (set active class) */
	$('.contatti').on('click', selectContact);

	/* funzione search contatti */
	$('#search').keyup(searchContact);



	/* FUNCTION SECTION */

	/* funzione ricerca contatto */

	function searchContact() {
		let filterValue = $('#search').val().toLowerCase();
		let contatto = $('ul li.contatti');
		for (let i = 0; i < contatto.length; i++) {
			let item = contatto.eq(i).find('.contatto-name').text();
			if (item.toLowerCase().includes(filterValue)) {

				contatto.eq(i).show();
			} else {

				contatto.eq(i).hide();
			}
		}

		/* se non ci sono contatti visualizzo messaggio */
		if ($('.contatti:visible').length == 0) {
			console.log('non ci sono contatti');
			$('#no-contact').show();
			$('#no-ins').text($('#search').val());
		} else {
			$('#no-contact').hide();
		}
	}


	/* funzione selezione contatto -> .active */
	function selectContact() {

		// rimuovo classe .active da tutti i contatti e da tutte le chat
		$('.contatti').removeClass('active');
		$('.chat').removeClass('active');
		// aggiungo classe .active a QUESTO elemento li
		$(this).addClass('active');

		// trovo nome e ora di accesso del contatto corrente
		let lastAccesName = $('.contatti.active .contatto-name').text();

		let lastAccesTime = $('.contatti.active .contatto-time').text();
		let lastAccesAvatar = $('.contatti.active .contatto-avatar').attr('src');

		// e la sposto in alto come ultimo accesso
		$('.ultimo-accesso-text').text(lastAccesName);
		$('.ultimo-accesso-time').text(lastAccesTime);
		$('.ultimo-accesso-avatar').attr('src', lastAccesAvatar);


		// trovo l'indice el corrente
		var indice = $(this).index();
		// setto active alla chat con lo stesso indice dell'elemento li
		$('.chat').eq(indice).addClass('active');
	}

	// funzione per cambiare icona a lato input chat
	function changeMicToMess() {
		$('.fly-message,.mic').toggle(300);
	}
	// numero random
	function numRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// add zero all'ora corrente
	function currentTime() {

		function addZero(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}
		var data = new Date();
		var ora = addZero(data.getHours()) + ":" + addZero(data.getMinutes());
		return ora;

	}

	/* funzione inserimento caratteri al press di tasti nell'input */
	function chatKeyboard(e) {
		if (e.which == 13 || e.keyCode == 13) {
			sendMess();
		}
	}


	// funzione scroll della chat
	function scrollChat() {
		$('.chat.active').animate({
			scrollTop: $('.chat.active')[0].scrollHeight
		});
	}

	// funzione invio  messaggi (che al suo interno richiama ricezione messaggi)
	function sendMess() {

		var testo = $('#input-mes').val();

		if (testo != '') {
			sendMessAudio.play()

			$('#input-mes').val('')
			// clono tutto l'elemento bubble ALL'INTERNO DI TEMPLATE
			var elemento = $('.template .bubble').clone();
			// modifico l'elemento NUOVO in memoria
			elemento.addClass('send');
			elemento.find('.bubble-text').append(testo);
			elemento.find('.bubble-time').append(currentTime());
			// lo appendo nel DOM

			$('.chat.active').append(elemento);
			scrollChat();


			// dopo un tot di tempo avvio la funzione ricezione messaggi
			setTimeout(receiveMess, (numRandom(1, 3) * 1000), 'received');
		}

	}

	// funzione ricezione messaggi (richiamata da invio messaggi)

	function receiveMess(str) {

		var indice = numRandom(1, risposte.length - 1);
		var testo = risposte[indice];


		// clono tutto l'elemento bubble ALL'INTERNO DI TEMPLATE
		var elemento = $('.template .bubble').clone();
		// modifico l'elemento NUOVO in memoria
		elemento.addClass(str);
		elemento.find('.bubble-text').append(testo);

		// inserisco il testo anche nell contatto di sx
		// testo tagliato

		$('.contatti.active').find($('.lastSend')).text(testo.substring(0, 20) + '...');
		$('.contatti.active').find($('.contatto-time')).text(currentTime());

		/*Vado a cambiare anche l'ora nella sezione alta ultimo accesso del contatto corrente, senza questa istruzione il cambio ora avviene solo al cambio del contatto selezionato */
		$('.ultimo-accesso-time').text(currentTime());

		// 



		elemento.find('.bubble-time').append(currentTime());
		// lo appendo nel DOM
		$('.chat.active').append(elemento);

		receiveMessAudio.play();

		// al termine del messaggio di ritorno faccio lo scroll down
		scrollChat();


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