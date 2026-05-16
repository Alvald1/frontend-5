import { Application, Graphics } from 'pixi.js';

const app = new Application();

await app.init({ width: 800, height: 600, background: '#1a1a2e' });

document.body.appendChild(app.canvas);

const rect = new Graphics();
rect.rect(-100, -50, 200, 100).fill(0x4488ff);

rect.x = app.screen.width / 2;
rect.y = app.screen.height / 2;

app.stage.addChild(rect);

app.ticker.add(() => {
  rect.rotation += 0.02;
});
