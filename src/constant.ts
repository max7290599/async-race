const base = 'http://localhost:3000';

export const url = {
  garage: `${base}/garage`,
  engine: `${base}/engine`,
  winners: `${base}/winners`,
};

export const winnerView = document.getElementById('winners-view') as HTMLElement;
export const models = ['Tesla', 'Mersedes', 'Bmw', 'Toyota', 'Zhigyli', 'Moskvich', 'Opel', 'Porshe', 'Seat'];
export const names = ['Toledo', '7', 'CLK', 'Camry', '9', 'Corsa', 'DB9', 'Cayene', 'Combi'];
