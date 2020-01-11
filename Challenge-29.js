(function (win,doc){
	'use strict'
	
		var $model = doc.querySelector("[data-js='model']")
		var $year = doc.querySelector("[data-js='year']");
		var $placa = doc.querySelector("[data-js='placa']");
		var $color = doc.querySelector("[data-js='color']");
		var $tableCars = doc.querySelector("[data-js='tableCars']");	

	function app(){		

		return {
			init: function init(){						
				this.startAjax();
				this.initEvents();				

			},

			startAjax: function startAjax (){
				var ajax = new window.XMLHttpRequest();
				ajax.open('GET', '/company.json',true);	
				ajax.send();						
				ajax.addEventListener('readystatechange', this.getCompanyInfo ,false);
			},			

			getCompanyInfo: function getCompanyInfo(){
					var data =JSON.parse(this.responseText);
					var $companyName = doc.querySelector("[data-js='companyName']");
					var $companyPhone = doc.querySelector("[data-js='companyPhone']")
					$companyName.textContent = data.name;
					$companyPhone.textContent = data.phone;
			},

			initEvents: function initEvents(){			
				var $send = doc.querySelector("[data-js='send']").addEventListener('click', this.handleSubmit, false);		

			},

			handleSubmit: function handleSubmit(evt){	
				evt.preventDefault();				
				app().createCarLine();			
				app().cleanFields();
			},

			createCarLine: function createCarLine(){			
				$tableCars.insertAdjacentHTML('beforeend','<td><td><td><td><td><button>');				
				$tableCars.lastElementChild.firstElementChild.textContent = $model.value;
				$tableCars.lastElementChild.firstElementChild.nextSibling.textContent = $year.value;
				$tableCars.lastElementChild.firstElementChild.nextSibling.nextSibling.textContent = $placa.value;
				$tableCars.lastElementChild.lastElementChild.previousElementSibling.textContent = $color.value;

				$tableCars.lastElementChild.lastElementChild.firstChild.addEventListener('click', function removeCar(){
						this.parentNode.parentNode.remove();
				} ,false); 	
			},

		
			cleanFields: function cleanFields(){	
				$model.value = null;
				$year.value = null;
				$placa.value = null;
				$color.value = null;
			}

		};

	};

	app().init();

})(window,document);
