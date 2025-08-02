# 🎨 Web Whiteboard

A comprehensive, collaborative web-based whiteboard application built with React. Perfect for brainstorming, teaching, presenting, and creating professional diagrams and flowcharts.

![Web Whiteboard Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-18.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Core Tools
- **Drawing Tools**: Pen, brush with variable sizes and opacity
- **Shape Library**: Lines, arrows, rectangles, circles, triangles, stars, diamonds
- **Text Tool**: Add custom text with font size controls
- **Sticky Notes**: Colorful sticky notes for brainstorming
- **Emoji Support**: Extensive emoji collection for visual communication
- **Eraser**: Smart erasing with background color matching

### 📊 Professional Diagramming
- **Flowchart Shapes**: Decision diamonds, start/end ovals, process rectangles
- **Flowchart Templates**: 
  - Basic Flowchart
  - Decision Tree
  - Swimlane Diagram
  - System Flowchart
  - User Flow
  - Algorithm Flow
- **Smart Connectors**: Professional connecting lines with arrows
- **Color-Coded Elements**: Different colors for different operation types

### 🎨 Design & Customization
- **30+ Preset Colors**: Quick access to common colors
- **Custom Color Picker**: Full spectrum color selection
- **20+ Sticky Note Colors**: Vibrant options for categorization
- **Background Colors**: Customizable canvas backgrounds
- **Opacity Control**: Transparent drawing capabilities
- **Grid System**: Optional grid overlay for precise alignment

### 🚀 Advanced Features
- **Layer Management**: Multi-layer support with visibility/lock controls
- **Zoom & Pan**: Smooth zooming (25%-300%) and canvas panning
- **Unlimited Undo/Redo**: Complete history tracking (50 states)
- **Auto-save**: Automatic canvas state preservation
- **Export/Import**: Download as PNG, upload images
- **Real-time Collaboration**: Multi-user support with live cursors

### 📋 Template Library
- **16+ Professional Templates**:
  - Diagrams ChatGPT (AI Tools)
  - Mind Maps
  - Kanban Boards
  - SWOT Analysis
  - User Journey Maps
  - Organizational Charts
  - Wireframes
  - Timeline Views

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `P` | Pen tool |
| `S` | Select tool |
| `H` | Hand/Pan tool |
| `T` | Text tool |
| `N` | Sticky notes |
| `E` | Emoji panel |
| `L` | Layers panel |
| `G` | Toggle grid |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+S` | Download |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste |
| `+/-` | Zoom in/out |
| `Ctrl+0` | Reset zoom |
| `Del` | Delete selected |
| `Esc` | Close panels |

## 🛠️ Technology Stack

- **Frontend**: React 18+ with Hooks
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Canvas**: HTML5 Canvas API
- **State Management**: React useState/useRef
- **File Handling**: FileReader API
- **Touch Support**: Multi-touch gestures

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with Canvas support

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/web-whiteboard.git
cd web-whiteboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
# or
yarn build
```

## 🎮 Usage Guide

### Basic Drawing
1. Select the **Pen tool** (P) from the sidebar
2. Choose your color from the bottom toolbar
3. Adjust brush size and opacity as needed
4. Start drawing on the canvas

### Creating Flowcharts
1. Click **Shapes** button in the sidebar
2. Select flowchart shapes (diamonds for decisions, rectangles for processes)
3. Use **Templates** for quick flowchart starting points
4. Connect elements with arrow tools

### Adding Text & Annotations
1. Select **Text tool** (T)
2. Click where you want to add text
3. Type your content in the modal
4. Adjust font size using brush size controls

### Using Templates
1. Click **Templates** icon in sidebar
2. Browse 16+ professional templates
3. Click on any template to load it
4. Customize colors, text, and layout

### Collaboration Features
- **Live Cursors**: See other users' cursors in real-time
- **User Avatars**: View active collaborators
- **Share Board**: Generate shareable links
- **Auto-sync**: Changes sync automatically

## 🎨 Customization

### Color Themes
The application includes 30+ preset colors and supports custom color selection. You can modify the color palette in the `presetColors` array:

```javascript
const presetColors = [
  '#000000', '#FFFFFF', '#FF0000', // Add your colors here
];
```

### Adding New Templates
Templates are defined in the `templates` array. Add new ones with:

```javascript
{
  name: 'Your Template',
  icon: '🎯',
  category: 'Custom',
  description: 'Template description'
}
```

### Keyboard Shortcuts
Modify shortcuts in the `handleKeyDown` function to customize the user experience.

## 📱 Mobile Support

- **Touch Drawing**: Full touch and gesture support
- **Responsive Design**: Adapts to different screen sizes
- **Mobile Optimized**: Touch-friendly UI elements
- **Pinch to Zoom**: Native mobile zoom gestures

## 🔧 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari | ✅ Full Support |
| Edge | ✅ Full Support |
| Mobile Safari | ✅ Touch Optimized |
| Chrome Mobile | ✅ Touch Optimized |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use TypeScript for new features
- Add tests for new functionality
- Update documentation
- Follow the existing code style

## 🐛 Known Issues & Solutions

### Performance
- **Large Canvas**: For large drawings, consider implementing canvas virtualization
- **Memory Usage**: History is limited to 50 states to prevent memory issues
- **Mobile Performance**: Some complex operations may be slower on mobile

### Browser Storage
- **No localStorage**: The app doesn't use browser storage for compatibility
- **Session-based**: All data is stored in memory during the session
- **Auto-download**: Important work should be downloaded regularly

## 🔮 Roadmap

### Upcoming Features
- [ ] **Real-time Collaboration** with WebSockets
- [ ] **Cloud Storage** integration
- [ ] **Vector Graphics** support (SVG export)
- [ ] **Advanced Shape Library** (UML, network diagrams)
- [ ] **Version History** with branching
- [ ] **Plugin System** for custom tools
- [ ] **AI-Powered** shape recognition
- [ ] **Voice Annotations** support
- [ ] **Presentation Mode** with slide navigation
- [ ] **Team Workspaces** and permissions

### Performance Improvements
- [ ] Canvas virtualization for large boards
- [ ] WebGL rendering for better performance
- [ ] Progressive loading for templates
- [ ] Background auto-save to cloud

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React Community** for excellent documentation
- **Canvas API** for powerful drawing capabilities

## 📞 Support

- **Documentation**: Check this README and inline comments
- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: Use GitHub Discussions for questions
- **Email**: support@webwhiteboard.com 

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ for the creative community**

*Perfect for educators, designers, developers, project managers, and anyone who needs a powerful, collaborative whiteboard solution.*
