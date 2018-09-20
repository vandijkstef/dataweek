class Bubbler {
	constructor() {
		this.bubbles = [];
		const bubbles = document.querySelectorAll('.bubble');
		bubbles.forEach((bubble) => {
			const newBubble = new Bubble(bubble);
			newBubble.Bubbler = this;
			this.bubbles.push(newBubble);
		});
		this.bubbles[0].Activate();
		this.header = document.querySelector('header');
	}

	AddText(Bubble) {
		const newText = document.createElement('span');
		newText.innerText = Bubble.floating.innerText;
		newText.innerText += " " + Bubble.mainText.innerText;
		this.header.appendChild(newText);
	}
}

class Bubble {
	constructor(bubble) {
		this.DOM = bubble;
		this.DOM.Bubble = this;

		this.content = this.DOM.querySelector('.content');
		this.mainText = this.content.querySelector('p:not(.floating)');
		this.floating = this.content.querySelector('.floating');
		
		this.level = this.DOM.classList.item(1).split('-')[1];
		this.childLevel = parseInt(this.level) + 1;

		this.children = this.DOM.querySelectorAll('.bubble-' + this.childLevel);
		
		this.DOM.addEventListener('click', this.ClickHandler);
	}

	ClickHandler(e) {
		e.stopPropagation();
		if (!e.target.classList.contains('floating')) {
			if (this.Bubble.children.length > 0) {

				const visibles = document.querySelectorAll(`.bubble-${this.Bubble.level}.visible`);
				visibles.forEach((bubble) => {
					if (bubble != this) {
						bubble.classList.remove('visible');
					}
				});
				this.Bubble.children.forEach((bubble) => {
					bubble.Bubble.Activate();
				});
				this.Bubble.Hide();
				this.Bubble.Bubbler.AddText(this.Bubble);
			}
		}
	}

	Activate() {
		this.DOM.classList.add('visible');
	}

	Hide() {
		this.content.classList.add('hidden');
	}
}



document.addEventListener('DOMContentLoaded', () => {
	new Bubbler();
});