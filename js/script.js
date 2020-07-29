// $(function () {





// $('#input-mes').keydown(inserisci);

// 	function inserisci(e) {
// 		if (e.which == 13 || e.keyCode == 13) {

// 			var testo = $(this).val();
// 			if (testo != '') {
// 				console.log(testo);
// 				$(this).val('')
// 				// clono tutto l'elemento bubble
// 				var elemento = $('.template .bubble').clone();
// 				// modifico l'elemento NUOVO in memoria
// 				elemento.addClass('send');
// 				elemento.find('.bubble-text').append(testo);
// 				// lo appendo nel DOM
// 				$('.chat').append(elemento);
// 				/* template.append(testo); */
// 			} else {
// 				console.log('riga vuota');
// 			}
// 		}
// 	}
// });


$(function () {

	$('#input-mes').keydown(inserisci);

	function inserisci(e) {
		if (e.which == 13 || e.keyCode == 13) {

			var testo = $(this).val();


			var data = new Date();
			var ora = data.getHours() + ":" + data.getMinutes();

			$('.chat').append(`
					<div class="bubble send">
						<p class='bubble-text'>${testo}</p>
						<div class="bubble-time">${ora}</div>
					</div>
				</div>`);


			setTimeout(risposta, 3000);


			function risposta() {
				var testo = 'Buonanotte';
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

});