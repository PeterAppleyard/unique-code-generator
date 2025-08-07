let codes = new Set();

function generateCodes() {
	const codeCount = document.getElementById('codeCount').value;
	const codeLength = document.getElementById('codeLength').value;
	const resultDiv = document.getElementById('result');
	resultDiv.innerHTML = ''; // Clear previous results
	codes.clear(); // Clear previous codes

	while (codes.size < codeCount) {
		codes.add(generateUniqueCode(codeLength));
	}

	codes.forEach(code => {
		const codeElement = document.createElement('p');
		codeElement.textContent = code;
		resultDiv.appendChild(codeElement);
	});
}

function generateUniqueCode(length) {
	// const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const characters = '0123456789ACDFGHJKMNPRUWY';
	let code = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		code += characters[randomIndex];
	}
	return code;
}

function downloadCodes() {
	let codeArray = Array.from(codes);
	let codeText = codeArray.join('\n');
	let blob = new Blob([codeText], { type: 'text/plain' });
	let link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = 'codes.txt';
	link.click();
}
