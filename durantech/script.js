document.addEventListener("DOMContentLoaded", () => {
	const threads = document.querySelectorAll('.thread');
	let lastTouch = 0;
	threads.forEach(thread => {
		thread.addEventListener('wheel', event => {
			thread.style.scrollBehavior = 'unset';
			thread.scrollTo({
				top: Math.max(0, thread.scrollTop + event.deltaY)
			});
			thread.style.scrollBehavior = 'smooth';
		});
		thread.addEventListener('touchstart', event => {
			lastTouch = event.touches[0].clientY;
		});
		thread.addEventListener('touchend', event => {
			lastTouch = 0;
		});	
		thread.addEventListener('touchmove', event => {
			const currentTouch = event.touches[0].clientY;
			thread.style.scrollBehavior = 'unset';
			thread.scrollTo({
				top: Math.max(0, thread.scrollTop + (lastTouch - currentTouch))
			});
			thread.style.scrollBehavior = 'smooth';
			lastTouch = currentTouch;
		});
	});
	
	const updateActiveLink = event => {
		let activeHash = window.location.hash;
		document.querySelectorAll("#menu a").forEach(link => {
			if (link.getAttribute("href") === activeHash) {
				link.parentElement.classList.add("pressed");
			} else {
				link.parentElement.classList.remove("pressed");
            }
		});
    };

    window.addEventListener("hashchange", updateActiveLink);
    updateActiveLink(); // Executa quando a página carrega
});