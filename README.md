# Three.js Interactive Scene

An interactive 3D scene built with Three.js featuring a textured box with real-time material controls using lil-gui.

## Features

- Interactive 3D scene with OrbitControls
- Real-time material property adjustments:
  - Roughness
  - Metalness
  - Normal mapping
  - Color tinting
- Dynamic lighting setup with:
  - Key light
  - Fill light
  - Ambient light
  - Rim light
  - High-intensity directional light
- Responsive design that adapts to window resizing

## Technologies Used

- Three.js
- Vite
- TailwindCSS
- lil-gui for controls

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Milindddd/threee.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Controls

The scene includes a GUI panel with the following controls:

### Material Settings

- Roughness: Adjust surface roughness (0-1)
- Metalness: Control metallic appearance (0-1)
- Normal Scale: Adjust normal mapping intensity
- Color Tint: Change the base color of the material

### Mesh Settings

- Rotation: Control X, Y, Z rotation
- Scale: Adjust X, Y, Z dimensions

### Lighting Settings

- Key Light: Main directional light intensity
- Fill Light: Ambient fill light intensity
- Ambient Light: Overall scene illumination
- Rim Light: Edge highlighting intensity
- Intense Light: Additional directional light intensity

## Project Structure

```
threee/
├── main.js          # Main Three.js scene setup
├── index.html       # HTML entry point
├── style.css        # Global styles
├── text/            # Texture files
│   ├── color.jpg
│   ├── roughness.jpg
│   └── normal.png
└── package.json     # Project dependencies
```

## License

MIT License
