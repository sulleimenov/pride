// import '~/app/vendor/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {
	/* lazy */
	const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]');
	const loadMapBlock = document.querySelector('.load-map');
	const windowHeight = document.documentElement.clientHeight;

	let lazyImagesPositions = [];
	if (lazyImages.length > 0) {
		lazyImages.forEach((img) => {
			if (img.dataset.src || img.dataset.srcset) {
				lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			}
		});
	}
	console.log(lazyImagesPositions);

	window.addEventListener('scroll', lazyScroll);

	function lazyScroll() {
		if (document.querySelectorAll('img[data-src], source[data-srcset').length > 0) {
			lazyLoadCheck();
		}
	}

	function lazyLoadCheck() {
		let imgIndex = lazyImagesPositions.findIndex((item) => pageYOffset > item - windowHeight);
		if (imgIndex >= 0) {
			if (lazyImages[imgIndex].dataset.src) {
				lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
				lazyImages[imgIndex].removeAttribute('data-src');
			} else if (lazyImages[imgIndex].dataset.srcset) {
				lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
				lazyImages[imgIndex].removeAttribute('data-srcset');
			}
			delete lazyImagesPositions[imgIndex];
		}
	}

	// const images = document.querySelectorAll('img');
	// images.forEach((image) => {
	// 	image.classList.add('lazy');
	// });
});
