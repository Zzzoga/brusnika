// Doc done scripts
document.addEventListener('DOMContentLoaded', () => {

	document.querySelectorAll('.plus').forEach(plus => {
		plus.addEventListener('mouseover', e => {
			e.target.closest('.detail__item').classList.add('active')
		})
		plus.addEventListener('mouseout', e => {
			e.target.closest('.detail__item').classList.remove('active')
		})
	})

	// project select
	document.querySelectorAll('a.project__nav__item').forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			const dataNum = e.target.closest('a.project__nav__item').dataset.num
			
			document.querySelectorAll('.project__item').forEach(item => {
				item.classList.remove('active')
			})
			document.querySelectorAll('a.project__nav__item').forEach(btn => {
				btn.classList.remove('active')
			})
	
			e.target.closest('a.project__nav__item').classList.add('active')
			document.querySelectorAll('.project__item').forEach(item => {
				if (item.dataset.num == dataNum) {
					item.classList.add('active')
				}
			})
		})
	})

	// document.querySelector('a.btn.icon__btn.burger').addEventListener('click', e => {
	// 	e.preventDefault()
	// 	if (!document.querySelector('.modal__nav').classList.contains('active')) {
	// 		document.querySelector('.modal__nav').classList.add('active')
	// 		document.querySelector('header').classList.add('active')
	// 		document.querySelector('body').classList.add('hidden')
	// 		document.querySelector('a.btn.icon__btn.burger').classList.add('active')
	// 	} else {
	// 		document.querySelector('.modal__nav').classList.remove('active')
	// 		document.querySelector('header').classList.remove('active')
	// 		document.querySelector('body').classList.remove('hidden')
	// 		document.querySelector('a.btn.icon__btn.burger').classList.remove('active')
	// 	}
	// })

	// document.querySelectorAll('a.modal__nav__link').forEach(element => {
	// 	element.addEventListener('click', e => {
	// 		document.querySelector('.modal__nav').classList.remove('active')
	// 		document.querySelector('header').classList.remove('active')
	// 		document.querySelector('body').classList.remove('hidden')
	// 		document.querySelector('a.btn.icon__btn.burger').classList.remove('active')
	// 	})
	// });
	
	const body = document.querySelector('body')
	function openModal(btn, modal, closeBtn, overlay) {
		btn.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()
				modal.classList.add('active')
				body.classList.add('hidden')
			})
		})
	
		closeBtn.addEventListener('click', e => {
			e.preventDefault()
			modal.classList.remove('active')
			body.classList.remove('hidden')
		})
	
		overlay.addEventListener('click', e => {
			e.preventDefault()
			modal.classList.remove('active')
			body.classList.remove('hidden')
		})
	}
	
	openModal(document.querySelectorAll('.project__item a.btn'), document.querySelector('.modal__project'), document.querySelector('.modal__project .modal__close'), document.querySelector('.modal__project .modal__overlay'))
	openModal(document.querySelectorAll('a.btn.view__more'), document.querySelector('.modal__view'), document.querySelector('.modal__view .modal__close'), document.querySelector('.modal__view .modal__overlay'))

	document.querySelectorAll('.project__item a.btn').forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			document.querySelector('.modal__project .modal__content').innerHTML = e.target.closest('.project__item').querySelector('.project__info').innerHTML
		})
	})

	document.querySelectorAll('a.btn.view__more').forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			document.querySelector('.modal__view .modal__content').innerHTML = e.target.closest('.view__item').querySelector('.view__info').innerHTML
		})
	})

	document.querySelector('a.modal__btn.btn').addEventListener('click', e => {
		e.preventDefault()
		document.querySelector('.modal__project').classList.remove('active')
		body.classList.remove('hidden')
	})

	// Modal nav
	document.querySelector('.burger').addEventListener('click', e => {
		e.preventDefault()
		if (!document.querySelector('.burger').classList.contains('active')) {
			document.querySelector('.burger').classList.add('active')
			document.querySelector('.burger img').src = 'img/close.svg'
			document.querySelector('.burger span').innerHTML = 'Закрыть'
			document.querySelector('.modal__nav').classList.add('active')
		    body.classList.add('hidden')
		} else {
			document.querySelector('.burger').classList.remove('active')
			document.querySelector('.burger img').src = 'img/burger.svg'
			document.querySelector('.burger span').innerHTML = 'Меню'
			document.querySelector('.modal__nav').classList.remove('active')
		    body.classList.remove('hidden')
		}
	})

	document.querySelectorAll('a.modal__nav__link').forEach(link => {
		link.addEventListener('click', e => {
			document.querySelector('.burger').classList.remove('active')
			document.querySelector('.burger img').src = 'img/burger.svg'
			document.querySelector('.burger span').innerHTML = 'Меню'
			document.querySelector('.modal__nav').classList.remove('active')
		    body.classList.remove('hidden')
		})
	})
	
	if (document.documentElement.clientWidth <= 1366) {
		document.querySelector('a.call__btn.btn.btn__wob').innerHTML = '<img src="img/call.svg" alt="">'
	}

	// Smooth scroll when link clicked
	const $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 100
		}, 800);
		return false;
	});

	// Phone mask
	function maskPhone(selector, masked = '+7 (___) ___-__-__') {
		const elems = document.querySelectorAll(selector);
	
		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			console.log(template);
			let i = 0,
				newValue = template.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
				});
			i = newValue.indexOf("_");
			if (i !== -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}";
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = newValue;
			}
			if (event.type === "blur" && this.value.length < 5) {
				this.value = "";
			}
	
		}
	
		for (const elem of elems) {
			elem.addEventListener("input", mask);
			elem.addEventListener("focus", mask);
			elem.addEventListener("blur", mask);
		}
		
	}
		
	maskPhone('input[type="tel"]')
})


