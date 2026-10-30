/* ============================================
   ON Hair Salon & Beauty — three.js barber pole
   Source for pole3d.min.js; rebuild with `npm run build:pole`.

   Draws the hero's barber pole into a canvas that script.js lays over the
   CSS pole. World units are the hero scene's design pixels (the scene is a
   600 x 660 canvas), so the pole lines up with the orbit ring around it.
   Rendering only happens when script.js asks for a new turn.
   ============================================ */
import {
  ACESFilmicToneMapping,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  LatheGeometry,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// The canvas covers this part of the scene, in design pixels.
export const POLE_VIEW = { left: 170, top: 6, width: 260, height: 600 };

const TUBE = { radius: 41, top: 190, bottom: -184 };
// Matches the scene's CSS perspective, so the pole and the cards share a camera.
const CAMERA_DISTANCE = 1300;
// Leans the pole towards the viewer so the caps read as seen from just above,
// like the tilted orbit ring.
const TILT = 0.18;

/* Seamless diagonal stripes: two red and two blue bands per turn of the pole. */
function stripeTexture(anisotropy) {
  const size = 512;
  const period = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fbf6ef';
  ctx.fillRect(0, 0, size, size);
  const bands = [['#ad0f29', 0, 0.25], ['#152d66', 0.5, 0.75]];
  for (let c = -size; c < size * 2; c += period) {
    bands.forEach(([color, from, to]) => {
      // A band lies between the lines x + y = c1 and x + y = c2.
      const c1 = c + from * period;
      const c2 = c + to * period;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(c1, 0);
      ctx.lineTo(c2, 0);
      ctx.lineTo(c2 - size, size);
      ctx.lineTo(c1 - size, size);
      ctx.closePath();
      ctx.fill();
    });
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  // One tile per turn; stretching it to the tube's height sets the stripe angle.
  const circumference = Math.PI * 2 * TUBE.radius;
  texture.repeat.set(1, ((TUBE.top - TUBE.bottom) / circumference) * 0.8);
  texture.anisotropy = anisotropy;
  return texture;
}

const lathe = (points) => new LatheGeometry(points.map(([r, y]) => new Vector2(r, y)), 96);

/* Collar, cap and dome above the tube, profiled as [radius, y] from the bottom up. */
function topProfile() {
  const points = [[TUBE.radius, 182], [50, 184], [52, 186.5], [52, 194], [50.5, 196], [52, 198], [52, 205.5], [50, 208], [39, 208]];
  for (let i = 0; i <= 12; i++) {
    const t = (i / 12) * (Math.PI / 2);
    points.push([38 * Math.cos(t), 208 + 46 * Math.sin(t)]);
  }
  return points;
}

/* Collar, tapered base and foot below the tube, from the floor up. */
function bottomProfile() {
  return [[0, -250], [46, -250], [50, -247], [50, -239.5], [46, -236.5], [36, -236.5], [28, -204], [50, -202], [52, -199.5], [52, -192], [50.5, -190], [52, -188], [52, -180.5], [50, -178], [TUBE.radius, -176]];
}

/* Resolves to { render(turn) }, or null when WebGL is unavailable. Shaders are
   compiled up front, off the main thread where the browser allows it, so the
   first render does not stall a scroll. */
export async function createBarberPole(canvas, { pixelRatio = 1, onLost } = {}) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (error) {
    return null;
  }
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(POLE_VIEW.width, POLE_VIEW.height, false);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  // Dimmer surroundings than the room preset, so the key light can model the tube.
  scene.environmentIntensity = 0.75;
  pmrem.dispose();

  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(-320, 420, 640);
  const rim = new DirectionalLight(0xffe4c8, 0.9);
  rim.position.set(420, 160, -320);
  scene.add(key, rim);

  const fov = (2 * Math.atan(POLE_VIEW.height / 2 / CAMERA_DISTANCE) * 180) / Math.PI;
  const camera = new PerspectiveCamera(fov, POLE_VIEW.width / POLE_VIEW.height, 10, 4000);
  camera.position.set(0, 0, CAMERA_DISTANCE);

  const gold = new MeshStandardMaterial({ color: new Color('#d6ae63'), metalness: 1, roughness: 0.24 });
  const stripes = new MeshPhysicalMaterial({
    map: stripeTexture(renderer.capabilities.getMaxAnisotropy()),
    roughness: 0.42,
    clearcoat: 1,
    clearcoatRoughness: 0.03
  });

  const pole = new Group();
  const tube = new Mesh(new CylinderGeometry(TUBE.radius, TUBE.radius, TUBE.top - TUBE.bottom, 128, 1, true), stripes);
  tube.position.y = (TUBE.top + TUBE.bottom) / 2;
  const finial = new Mesh(new SphereGeometry(11, 32, 16), gold);
  finial.position.y = 265;
  pole.add(tube, new Mesh(lathe(topProfile()), gold), new Mesh(lathe(bottomProfile()), gold), finial);
  pole.rotation.x = TILT;
  // The canvas is centred on design y 306; the tube's middle sits at design y 302.
  pole.position.y = 4;
  scene.add(pole);

  try {
    await renderer.compileAsync(scene, camera);
  } catch (error) {
    renderer.dispose();
    return null;
  }

  // turn: how far the striped tube has rotated, in radians.
  let lastTurn = null;
  const render = (turn) => {
    if (lastTurn !== null && Math.abs(turn - lastTurn) < 0.0005) return;
    lastTurn = turn;
    tube.rotation.y = turn;
    renderer.render(scene, camera);
  };

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    if (onLost) onLost();
  }, { once: true });

  return { render };
}
