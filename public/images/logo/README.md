# Bilder für Skinlux Website

Füge deine Bilder in die entsprechenden Ordner ein:

## Erforderliche Bilder:

### 1. Hero Section
- **hero-background.jpg** - Statisches Hintergrundbild (optional, empfohlen: 1920x1080px)
  - Subtiles Bild, da es mit sehr niedriger Opacity (5%) angezeigt wird
  - Ideal: Abstrakte Textur, dezentes Studio-Bild oder neutrale Aufnahme
  - Das Bild bleibt konstant, nur der Text wechselt zwischen den Behandlungen

### 2. About Section
- **about-team.jpg** - Team-Bild oder Studio-Aufnahme (empfohlen: 800x1000px)
  - Wird in der About Section rechts angezeigt
  - Portrait-Format bevorzugt

### 3. Treatments Section
#### Hintergrund (Optional)
- **pattern-light.png** - Subtiles Muster für den Hintergrund
  - Kleine Datei (400x400px), wird gekachelt
  - Sehr dezent, da mit 2% Opacity

#### Behandlungsbilder (NEU)
Erstelle einen Ordner `treatments/` mit folgenden Bildern:
- **laser-hair-removal.jpg** - Laser Haarentfernung (empfohlen: 800x600px)
- **hydra-facial.jpg** - Hydra Facial Behandlung (empfohlen: 800x600px)
- **circadia.jpg** - Klassische Behandlung mit Circadia (empfohlen: 800x600px)
- **microneedling.jpg** - Microneedling Behandlung (empfohlen: 800x600px)
- **skin-analysis.jpg** - Hautanalyse (empfohlen: 800x600px)

### 4. Gallery Section
Erstelle einen Ordner `gallery/` mit folgenden Bildern:
- **treatment-1.jpg** - Laser Behandlung
- **studio-1.jpg** - Studio Ambiente  
- **treatment-2.jpg** - Hydra Facial
- **studio-2.jpg** - Empfangsbereich
- **treatment-3.jpg** - Hautanalyse
- **team-1.jpg** - Team-Foto

Empfohlene Größe: 800x800px (quadratisch)

### 5. Special Offer Section
- **special-offer-bg.jpg** - Vollbild-Hintergrundbild (empfohlen: 1920x1080px)
  - Wird mit dunklem Overlay (60% schwarz) angezeigt
  - Ideal: Hochwertige Studio- oder Behandlungsaufnahme

## Bildoptimierung:

1. **Format**: Verwende .jpg für Fotos, .png für Grafiken mit Transparenz
2. **Größe**: Optimiere Bilder für Web (max. 200-300kb pro Bild)
3. **Qualität**: 80-85% JPEG-Qualität ist meist ausreichend
4. **Tools**: 
   - https://tinypng.com/ für Komprimierung
   - https://squoosh.app/ für erweiterte Optimierung

## Ordnerstruktur:

```
public/
└── images/
    ├── hero-background.jpg     # Optional: Statisches Hintergrundbild
    ├── about-team.jpg
    ├── pattern-light.png       # Optional: Hintergrundmuster
    ├── special-offer-bg.jpg
    ├── treatments/             # NEU: Behandlungsbilder
    │   ├── laser-hair-removal.jpg
    │   ├── hydra-facial.jpg
    │   ├── circadia.jpg
    │   ├── microneedling.jpg
    │   └── skin-analysis.jpg
    └── gallery/
        ├── treatment-1.jpg
        ├── studio-1.jpg
        ├── treatment-2.jpg
        ├── studio-2.jpg
        ├── treatment-3.jpg
        └── team-1.jpg
``` 