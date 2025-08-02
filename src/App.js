import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Download, Upload, RotateCcw, RotateCw, Save, Trash2, Palette, Circle, Square, 
  ArrowRight, Type, Minus, Star, Sparkles, Users, Share2, Settings, Menu,
  MousePointer, Edit3, Shapes, StickyNote, MessageSquare, Image, Grid,
  ZoomIn, ZoomOut, Move, Hand, ChevronRight, Clock, User, Plus, X,
  Search, Filter, BookOpen, Zap, Target, Coffee, Brain, RefreshCw,
  Layers, Lock, Unlock, Eye, EyeOff, Copy, Scissors, FileText,
  Triangle, Hexagon, Pentagon, Smile, Heart, MapPin, Flag
} from 'lucide-react';

const WebWhiteboard = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBrushSize, setShowBrushSize] = useState(false);
  const [background, setBackground] = useState('#ffffff');
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [action, setAction] = useState('draw');
  const [tool, setTool] = useState('brush');
  const [showShapes, setShowShapes] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const [showOpacity, setShowOpacity] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showStickies, setShowStickies] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [showMoreShapes, setShowMoreShapes] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', visible: true, locked: false },
    { id: 2, name: 'Layer 1', visible: true, locked: false }
  ]);
  const [currentLayer, setCurrentLayer] = useState(2);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const [collaborators] = useState([
    { id: 1, name: 'Wareesha', avatar: '👨', color: '#FF6B6B', active: true },
    { id: 2, name: 'Moneeb', avatar: '👩', color: '#4ECDC4', active: true },
    { id: 3, name: 'Tayyaba', avatar: '👨‍💼', color: '#45B7D1', active: false }
  ]);

  // Enhanced templates data with more options
 const templates = [
    { name: 'Diagrams ChatGPT', icon: '📊', category: 'AI Tools', description: 'AI-powered diagram creation' },
    { name: 'Basic Flowchart', icon: '🔀', category: 'Flowchart', description: 'Simple process flow' },
    { name: 'Decision Tree', icon: '🌳', category: 'Flowchart', description: 'Decision-making flowchart' },
    { name: 'Swimlane Diagram', icon: '🏊', category: 'Flowchart', description: 'Multi-department process' },
    { name: 'System Flowchart', icon: '⚙️', category: 'Flowchart', description: 'System process flow' },
    { name: 'User Flow', icon: '👤', category: 'Flowchart', description: 'User journey flowchart' },
    { name: 'Algorithm Flow', icon: '🧮', category: 'Flowchart', description: 'Programming algorithm' },
    { name: 'Stickies', icon: '📝', category: 'Notes', description: 'Brainstorming with sticky notes' },
    { name: '2x2 Method', icon: '⚡', category: 'Framework', description: 'Priority matrix template' },
    { name: 'Mind Map', icon: '🧠', category: 'Brainstorm', description: 'Visual thinking tool' },
    { name: 'Kanban Board', icon: '📋', category: 'Project', description: 'Task management board' },
    { name: 'SWOT Analysis', icon: '🎯', category: 'Strategy', description: 'Strategic planning matrix' },
    { name: 'User Journey', icon: '🛤️', category: 'UX', description: 'Customer experience mapping' },
    { name: 'Timeline', icon: '📅', category: 'Planning', description: 'Project timeline' },
    { name: 'Org Chart', icon: '🏢', category: 'Structure', description: 'Organizational structure' },
    { name: 'Wireframe', icon: '📱', category: 'Design', description: 'UI/UX wireframing' }
  ];

  // Preset colors with more options
  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#FF7675', '#74B9FF', '#00B894', '#FDCB6E', '#6C5CE7', '#E17055',
    '#00CEC9', '#55A3FF', '#FD79A8', '#FFAA5A', '#81ECEC', '#A29BFE'
  ];

  // Sticky note colors
  const stickyColors = [
    '#FFEB3B', '#FF9800', '#F44336', '#E91E63', '#9C27B0', 
    '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFE082',
    '#FFCC02', '#FF6F00', '#E65100', '#BF360C', '#3E2723'
  ];

  // Emoji collection
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
    '🔥', '💡', '⭐', '✨', '🎯', '🚀', '💎', '🏆', '🎉', '🎊'
  ];
  

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawCanvas();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    setTimeout(() => {
      saveCanvasState();
    }, 100);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [background]);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.key.toLowerCase()) {
        case 'g':
          e.preventDefault();
          setGridVisible(!gridVisible);
          redrawCanvas();
          break;
        case 'h':
          e.preventDefault();
          setTool('pan');
          break;
        case 'p':
          e.preventDefault();
          setTool('brush');
          break;
        case 't':
          e.preventDefault();
          setTool('text');
          break;
        case 'n':
          e.preventDefault();
          setTool('sticky');
          break;
        case 'l':
          e.preventDefault();
          setShowLayers(!showLayers);
          break;
        case 'e':
          e.preventDefault();
          setShowEmojis(!showEmojis);
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            downloadCanvas();
          } else {
            setTool('select');
          }
          break;
        case 'c':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            copySelected();
          }
          break;
        case 'v':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            pasteSelected();
          }
          break;
        case 'z':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            
          }
          break;
        case 'delete':
        case 'backspace':
          if (!showTextInput) {
            e.preventDefault();
            deleteSelected();
          }
          break;
        case 'escape':
          setShowColorPicker(false);
          setShowBrushSize(false);
          setShowOpacity(false);
          setShowBackgroundPicker(false);
          setShowTemplates(false);
          setShowShapes(false);
          setShowCollaboration(false);
          setShowMoreShapes(false);
          setShowEmojis(false);
          setShowLayers(false);
          setShowQuickActions(false);
          break;
        case '+':
        case '=':
          e.preventDefault();
          setZoom(Math.min(3, zoom + 0.25));
          break;
        case '-':
          e.preventDefault();
          setZoom(Math.max(0.25, zoom - 0.25));
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gridVisible, zoom, historyStep, history.length, showTextInput, showLayers, showEmojis]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    if (gridVisible) {
      drawGrid(context);
    }
  };

  const drawGrid = (context) => {
    const gridSize = 20;
    context.strokeStyle = '#E0E0E0';
    context.lineWidth = 0.5;
    
    for (let x = 0; x <= context.canvas.width; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, context.canvas.height);
      context.stroke();
    }
    
    for (let y = 0; y <= context.canvas.height; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(context.canvas.width, y);
      context.stroke();
    }
  };
  

  const saveCanvasState = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const canvasData = canvas.toDataURL();
      const newHistory = history.slice(0, historyStep + 1);
      newHistory.push(canvasData);
      
      if (newHistory.length > 50) {
        newHistory.shift();
        setHistoryStep(newHistory.length - 1);
      } else {
        setHistoryStep(newHistory.length - 1);
      }
      
      setHistory(newHistory);
    } catch (error) {
      console.error('Failed to save canvas state:', error);
    }
  };

  const restoreCanvasState = (step) => {
    if (!history[step]) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = document.createElement('img');
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.onerror = () => {
      console.error('Failed to restore canvas state');
      redrawCanvas();
    };
    img.src = history[step];
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom - pan.x,
      y: (e.clientY - rect.top) / zoom - pan.y
    };
  };

  const getTouchPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.touches[0].clientX - rect.left) / zoom - pan.x,
      y: (e.touches[0].clientY - rect.top) / zoom - pan.y
    };
  };

  const startDrawing = (e) => {
    if (tool === 'pan') {
      setIsPanning(true);
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const pos = e.touches ? getTouchPos(e) : getMousePos(e);
    
    setStartPos(pos);
    setIsDrawing(true);

    if (tool === 'text') {
      setTextPosition(pos);
      setShowTextInput(true);
      return;
    }

    if (tool === 'sticky') {
      addStickyNote(pos);
      return;
    }

    if (tool === 'emoji') {
      setTextPosition(pos);
      setShowEmojis(true);
      return;
    }

    context.globalAlpha = opacity;
    context.strokeStyle = action === 'erase' ? background : color;
    context.fillStyle = action === 'erase' ? background : color;
    context.lineWidth = brushSize;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    if (tool === 'brush') {
      context.beginPath();
      context.moveTo(pos.x, pos.y);
    }
  };

  const draw = (e) => {
    if (isPanning && tool === 'pan') {
      const pos = e.touches ? getTouchPos(e) : getMousePos(e);
      setPan(prev => ({
        x: prev.x + (pos.x - startPos.x) * 0.1,
        y: prev.y + (pos.y - startPos.y) * 0.1
      }));
      return;
    }

    if (!isDrawing || tool === 'text' || tool === 'sticky' || tool === 'emoji') return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const pos = e.touches ? getTouchPos(e) : getMousePos(e);

    if (tool === 'brush') {
      context.lineTo(pos.x, pos.y);
      context.stroke();
    }
  };

  const stopDrawing = (e) => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const pos = e.touches ? getTouchPos(e) : getMousePos(e);

    if (tool === 'line') {
      context.beginPath();
      context.moveTo(startPos.x, startPos.y);
      context.lineTo(pos.x, pos.y);
      context.stroke();
    } else if (tool === 'rectangle') {
      const width = pos.x - startPos.x;
      const height = pos.y - startPos.y;
      context.strokeRect(startPos.x, startPos.y, width, height);
    } else if (tool === 'circle') {
      const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
      context.beginPath();
      context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      context.stroke();
    } else if (tool === 'arrow') {
      drawArrow(context, startPos.x, startPos.y, pos.x, pos.y);
    } else if (tool === 'triangle') {
      drawTriangle(context, startPos.x, startPos.y, pos.x, pos.y);
    } else if (tool === 'star') {
      drawStar(context, startPos.x, startPos.y, Math.abs(pos.x - startPos.x));
    }

    if (tool !== 'text' && tool !== 'sticky' && tool !== 'emoji') {
      context.closePath();
      saveCanvasState();
    }
    
    setIsDrawing(false);
  };

  const drawArrow = (context, fromX, fromY, toX, toY) => {
    const headlen = 15;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(toX, toY);
    context.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
  };

  const drawTriangle = (context, x1, y1, x2, y2) => {
    const width = x2 - x1;
    const height = y2 - y1;
    
    context.beginPath();
    context.moveTo(x1 + width / 2, y1);
    context.lineTo(x1, y2);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
  };

  const drawStar = (context, x, y, radius) => {
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius * 0.4;
    
    context.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes;
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      
      if (i === 0) {
        context.moveTo(px, py);
      } else {
        context.lineTo(px, py);
      }
    }
    context.closePath();
    context.stroke();
  };

  const addStickyNote = (pos) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const stickyColor = stickyColors[Math.floor(Math.random() * stickyColors.length)];
    
    // Draw sticky note shadow
    context.fillStyle = 'rgba(0,0,0,0.1)';
    context.fillRect(pos.x + 3, pos.y + 3, 120, 120);
    
    // Draw sticky note background
    context.fillStyle = stickyColor;
    context.fillRect(pos.x, pos.y, 120, 120);
    
    // Add border
    context.strokeStyle = '#000';
    context.lineWidth = 1;
    context.strokeRect(pos.x, pos.y, 120, 120);
    
    // Add folded corner effect
    context.fillStyle = 'rgba(0,0,0,0.1)';
    context.beginPath();
    context.moveTo(pos.x + 100, pos.y);
    context.lineTo(pos.x + 120, pos.y);
    context.lineTo(pos.x + 120, pos.y + 20);
    context.closePath();
    context.fill();
    
    // Add some default text
    context.fillStyle = '#000';
    context.font = '14px Arial';
    context.fillText('Double click', pos.x + 10, pos.y + 30);
    context.fillText('to edit', pos.x + 10, pos.y + 50);
    
    saveCanvasState();
  };
  const drawDiamond = (context, x, y, width, height) => {
  context.beginPath();
  context.moveTo(x, y - height/2); // Top point
  context.lineTo(x + width/2, y); // Right point
  context.lineTo(x, y + height/2); // Bottom point
  context.lineTo(x - width/2, y); // Left point
  context.closePath();
  context.stroke();
  
  if (action === 'draw') {
    context.fillStyle = color;
    context.fill();
  }
};

  const addEmoji = (emoji) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    context.font = `${brushSize * 4}px Arial`;
    context.fillText(emoji, textPosition.x, textPosition.y);
    
    setShowEmojis(false);
    saveCanvasState();
  };

  const addText = () => {
    if (!textInput.trim()) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    context.globalAlpha = opacity;
    context.fillStyle = color;
    context.font = `${brushSize * 3}px Arial`;
    context.fillText(textInput, textPosition.x, textPosition.y);
    
    setTextInput('');
    setShowTextInput(false);
    saveCanvasState();
  };

  const loadTemplate = (templateName) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    redrawCanvas();
    
    switch (templateName) {
      case 'Stickies':
        const positions = [{x: 100, y: 100}, {x: 250, y: 100}, {x: 400, y: 100}];
        positions.forEach((pos, i) => {
          const color = stickyColors[i % 3];
          
          // Shadow
          context.fillStyle = 'rgba(0,0,0,0.1)';
          context.fillRect(pos.x + 3, pos.y + 3, 120, 120);
          
          // Background
          context.fillStyle = color;
          context.fillRect(pos.x, pos.y, 120, 120);
          
          // Border
          context.strokeStyle = '#000';
          context.strokeRect(pos.x, pos.y, 120, 120);
          
          // Folded corner
          context.fillStyle = 'rgba(0,0,0,0.1)';
          context.beginPath();
          context.moveTo(pos.x + 100, pos.y);
          context.lineTo(pos.x + 120, pos.y);
          context.lineTo(pos.x + 120, pos.y + 20);
          context.closePath();
          context.fill();
          
          // Text
          context.fillStyle = '#000';
          context.font = '14px Arial';
          context.fillText(`Idea ${i + 1}`, pos.x + 10, pos.y + 30);
          context.fillText('Click to edit', pos.x + 10, pos.y + 50);
        });
        break;
        
      case 'Kanban Board':
        const columns = ['To Do', 'In Progress', 'Review', 'Done'];
        const colWidth = 200;
        const startX = 100;
        
        columns.forEach((col, i) => {
          const x = startX + i * (colWidth + 20);
          
          // Column header
          context.fillStyle = '#F0F0F0';
          context.fillRect(x, 100, colWidth, 50);
          context.strokeStyle = '#DDD';
          context.strokeRect(x, 100, colWidth, 50);
          
          context.fillStyle = '#000';
          context.font = '16px Arial';
          context.fillText(col, x + 10, 130);
          
          // Sample cards
          for (let j = 0; j < 2; j++) {
            const cardY = 170 + j * 80;
            context.fillStyle = '#FFF';
            context.fillRect(x + 10, cardY, colWidth - 20, 60);
            context.strokeStyle = '#DDD';
            context.strokeRect(x + 10, cardY, colWidth - 20, 60);
            
            context.fillStyle = '#000';
            context.font = '12px Arial';
            context.fillText(`Task ${j + 1}`, x + 20, cardY + 20);
            context.fillText('Description...', x + 20, cardY + 40);
          }
        });
        break;
        
      case 'Flowchart':
          // Keep existing flowchart logic for backward compatibility
          // Start node
        context.fillStyle = '#4CAF50';
        context.beginPath();
        context.arc(400, 150, 40, 0, 2 * Math.PI);
        context.fill();
        context.strokeStyle = '#000';
        context.stroke();
        context.fillStyle = '#FFF';
        context.font = '12px Arial';
        context.fillText('Start', 385, 155);
        
        /* // Process nodes
        const processes = [
          {x: 400, y: 250, text: 'Process 1'},
          {x: 400, y: 350, text: 'Decision?'},
          {x: 300, y: 450, text: 'Process 2'},
          {x: 500, y: 450, text: 'Process 3'}
        ];
         */
        processes.forEach((proc, i) => {
          if (i === 1) {
            // Diamond shape for decision
            context.fillStyle = '#FF9800';
            context.beginPath();
            context.moveTo(proc.x, proc.y - 30);
            context.lineTo(proc.x + 40, proc.y);
            context.lineTo(proc.x, proc.y + 30);
            context.lineTo(proc.x - 40, proc.y);
            context.closePath();
            context.fill();
          } else {
            // Rectangle for process
            context.fillStyle = '#2196F3';
            context.fillRect(proc.x - 40, proc.y - 20, 80, 40);
          }
          
          context.strokeStyle = '#000';
          context.stroke();
          context.fillStyle = '#FFF';
          context.font = '10px Arial';
          context.fillText(proc.text, proc.x - 25, proc.y + 3);
        });
        
        // Arrows
        context.strokeStyle = '#000';
        context.lineWidth = 2;
        
        // Start to Process 1
        context.beginPath();
        context.moveTo(400, 190);
        context.lineTo(400, 230);
        drawArrow(context, 400, 190, 400, 230);
        
        // Process 1 to Decision
        context.beginPath();
        context.moveTo(400, 270);
        context.lineTo(400, 320);
        drawArrow(context, 400, 270, 400, 320);
        
        // Decision to Process 2 and 3
        drawArrow(context, 370, 380, 320, 430);
        drawArrow(context, 430, 380, 480, 430);
        
          context.fillStyle = '#4CAF50';
          context.beginPath();
          context.arc(400, 150, 40, 0, 2 * Math.PI);
          context.fill();
          context.strokeStyle = '#000';
          context.stroke();
          context.fillStyle = '#FFF';
          context.font = '12px Arial';
          context.fillText('Start', 385, 155);
          
          const processes = [
            {x: 400, y: 250, text: 'Process 1'},
            {x: 400, y: 350, text: 'Decision?'},
            {x: 300, y: 450, text: 'Process 2'},
            {x: 500, y: 450, text: 'Process 3'}
          ];
          
          processes.forEach((proc, i) => {
            if (i === 1) {
              context.fillStyle = '#FF9800';
              context.beginPath();
              context.moveTo(proc.x, proc.y - 30);
              context.lineTo(proc.x + 40, proc.y);
              context.lineTo(proc.x, proc.y + 30);
              context.lineTo(proc.x - 40, proc.y);
              context.closePath();
              context.fill();
            } else {
              context.fillStyle = '#2196F3';
              context.fillRect(proc.x - 40, proc.y - 20, 80, 40);
            }
            
            context.strokeStyle = '#000';
            context.stroke();
            context.fillStyle = '#FFF';
            context.font = '10px Arial';
            context.fillText(proc.text, proc.x - 25, proc.y + 3);
          });
          
          context.strokeStyle = '#000';
          context.lineWidth = 2;
          drawArrow(context, 400, 190, 400, 230);
          drawArrow(context, 400, 270, 400, 320);
          drawArrow(context, 370, 380, 320, 430);
          drawArrow(context, 430, 380, 480, 430);
          
          break;
          redrawCanvas();
          
          // Start oval
          context.fillStyle = '#4CAF50';
          context.beginPath();
          context.ellipse(400, 150, 60, 30, 0, 0, 2 * Math.PI);
          context.fill();
          context.strokeStyle = '#2E7D32';
          context.lineWidth = 2;
          context.stroke();
          context.fillStyle = '#FFF';
          context.font = 'bold 14px Arial';
          context.textAlign = 'center';
          context.fillText('START', 400, 155);
          
          // Process rectangle
          context.fillStyle = '#2196F3';
          context.fillRect(340, 220, 120, 60);
          context.strokeStyle = '#1565C0';
          context.strokeRect(340, 220, 120, 60);
          context.fillStyle = '#FFF';
          context.fillText('Process Data', 400, 245);
          context.fillText('Input: User Info', 400, 265);
          
          // Decision diamond
          context.fillStyle = '#FF9800';
          context.beginPath();
          context.moveTo(400, 320);
          context.lineTo(460, 370);
          context.lineTo(400, 420);
          context.lineTo(340, 370);
          context.closePath();
          context.fill();
          context.strokeStyle = '#E65100';
          context.stroke();
          context.fillStyle = '#FFF';
          context.font = 'bold 12px Arial';
          context.fillText('Valid?', 400, 375);
          
          // Yes branch - Process
          context.fillStyle = '#4CAF50';
          context.fillRect(520, 340, 100, 60);
          context.strokeStyle = '#2E7D32';
          context.strokeRect(520, 340, 100, 60);
          context.fillStyle = '#FFF';
          context.fillText('Save Data', 570, 365);
          context.fillText('Send Email', 570, 385);
          
          // No branch - Process
          context.fillStyle = '#F44336';
          context.fillRect(220, 340, 100, 60);
          context.strokeStyle = '#C62828';
          context.strokeRect(220, 340, 100, 60);
          context.fillStyle = '#FFF';
          context.fillText('Show Error', 270, 365);
          context.fillText('Retry Input', 270, 385);
          
          // End oval
          context.fillStyle = '#9C27B0';
          context.beginPath();
          context.ellipse(400, 500, 50, 25, 0, 0, 2 * Math.PI);
          context.fill();
          context.strokeStyle = '#6A1B9A';
          context.stroke();
          context.fillStyle = '#FFF';
          context.fillText('END', 400, 505);
          
          // Arrows with labels
          context.strokeStyle = '#333';
          context.lineWidth = 2;
          context.font = '12px Arial';
          context.fillStyle = '#333';
          
          // Start to Process
          drawArrow(context, 400, 180, 400, 220);
          
          // Process to Decision
          drawArrow(context, 400, 280, 400, 320);
          
          // Decision to Yes
          drawArrow(context, 460, 370, 520, 370);
          context.fillText('Yes', 480, 365);
          
          // Decision to No
          drawArrow(context, 340, 370, 320, 370);
          context.fillText('No', 325, 365);
          
          // Yes to End
          drawArrow(context, 570, 400, 570, 450);
          drawArrow(context, 570, 450, 430, 480);
          
          // No back to Process (feedback loop)
          context.beginPath();
          context.moveTo(270, 340);
          context.lineTo(270, 300);
          context.lineTo(340, 300);
          context.lineTo(340, 280);
          context.stroke();
          drawArrow(context, 340, 300, 340, 280);
          
          break;
          
        case 'Decision Tree':
          redrawCanvas();
          
          // Root decision
          context.fillStyle = '#FF9800';
          drawDiamond(context, 350, 100, 450, 160);
          context.fillStyle = '#FF9800';
          context.beginPath();
          context.moveTo(400, 100);
          context.lineTo(450, 130);
          context.lineTo(400, 160);
          context.lineTo(350, 130);
          context.closePath();
          context.fill();
          context.strokeStyle = '#E65100';
          context.stroke();
          context.fillStyle = '#FFF';
          context.font = 'bold 12px Arial';
          context.textAlign = 'center';
          context.fillText('Budget?', 400, 135);
          
          // Left branch - Low budget
          context.fillStyle = '#2196F3';
          context.fillRect(200, 220, 120, 50);
          context.strokeStyle = '#1565C0';
          context.strokeRect(200, 220, 120, 50);
          context.fillStyle = '#FFF';
          context.fillText('Basic Plan', 260, 250);
          
          // Right branch - High budget
          context.fillStyle = '#4CAF50';
          context.fillRect(480, 220, 120, 50);  // Enhanced templates data with more options
        default:
        
        break;
    }
    
    saveCanvasState();
    setShowTemplates(false);
  };

  const clearCanvas = () => {
    redrawCanvas();
    saveCanvasState();
  };

  const undo = () => {
    if (historyStep > 0 && history.length > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      restoreCanvasState(newStep);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1 && history.length > 0) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      restoreCanvasState(newStep);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        const maxWidth = 400;
        const maxHeight = 400;
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        context.drawImage(img, 100, 100, width, height);
        saveCanvasState();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const copySelected = () => {
    // Placeholder for copy functionality
    console.log('Copy selected objects');
  };

  const pasteSelected = () => {
    // Placeholder for paste functionality
    console.log('Paste objects');
  };

  const deleteSelected = () => {
    if (selectedObjects.length > 0) {
      // Clear selected area
      clearCanvas();
      setSelectedObjects([]);
    }
  };

  const toggleLayer = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
  };

  const lockLayer = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, locked: !layer.locked }
        : layer
    ));
  };

  const addNewLayer = () => {
    const newLayer = {
      id: Date.now(),
      name: `Layer ${layers.length}`,
      visible: true,
      locked: false
    };
    setLayers([...layers, newLayer]);
    setCurrentLayer(newLayer.id);
  };

  const celebrate = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fill();
        
        setTimeout(() => {
          context.fillStyle = background;
          context.beginPath();
          context.arc(x, y, 6, 0, 2 * Math.PI);
          context.fill();
        }, 1000);
      }, i * 50);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center justify-between px-4 z-50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">W</div>
            <div>
              <h1 className="font-semibold text-gray-900">Web whiteboard</h1>
              <p className="text-xs text-gray-500">Learn/Teach/Present</p>
            </div>
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-gray-600"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            <Clock size={14} className="mr-1" />
            24h left to save your board.
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Sign up for free
          </button>
          
          {/* Collaborators */}
          <div className="flex items-center space-x-1">
            {collaborators.slice(0, 3).map((collab) => (
              <div
                key={collab.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  collab.active ? 'ring-2 ring-green-400' : ''
                }`}
                style={{ backgroundColor: collab.color + '20', color: collab.color }}
                title={collab.name}
              >
                {collab.avatar}
              </div>
            ))}
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">
              <Plus size={14} />
            </button>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
            <Share2 size={14} className="mr-1" />
            Share board
          </button>
        </div>
      </div>

      {/* Enhanced Sidebar */}
      <div className="absolute left-0 top-16 bottom-0 w-12 bg-white shadow-lg flex flex-col items-center py-4 space-y-2 z-40">
        <button
          onClick={() => setTool('select')}
          className={`p-2 rounded-lg ${tool === 'select' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Select (S)"
        >
          <MousePointer size={20} />
        </button>
        
        <button
          onClick={() => setTool('pan')}
          className={`p-2 rounded-lg ${tool === 'pan' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Pan (H)"
        >
          <Hand size={20} />
        </button>
        
        <button
          onClick={() => setTool('brush')}
          className={`p-2 rounded-lg ${tool === 'brush' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Pen (P)"
        >
          <Edit3 size={20} />
        </button>
        
        <button
          onClick={() => setShowShapes(!showShapes)}
          className={`p-2 rounded-lg ${['line', 'rectangle', 'circle', 'arrow', 'triangle', 'star'].includes(tool) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Shapes"
        >
          <Shapes size={20} />
        </button>
        
        <button
          onClick={() => setTool('sticky')}
          className={`p-2 rounded-lg ${tool === 'sticky' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Sticky notes (N)"
        >
          <StickyNote size={20} />
        </button>
        
        <button
          onClick={() => setTool('text')}
          className={`p-2 rounded-lg ${tool === 'text' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Text (T)"
        >
          <Type size={20} />
        </button>

        <button
          onClick={() => setTool('emoji')}
          className={`p-2 rounded-lg ${tool === 'emoji' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          title="Emoji (E)"
        >
          <Smile size={20} />
        </button>
        
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          title="Templates"
        >
          <Grid size={20} />
        </button>

        <button
          onClick={() => setShowLayers(!showLayers)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          title="Layers (L)"
        >
          <Layers size={20} />
        </button>
        
        <div className="flex-1"></div>

        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          title="Quick Actions"
        >
          <Zap size={20} />
        </button>
        
        <button
          onClick={undo}
          disabled={historyStep <= 0}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30"
          title="Undo (Ctrl+Z)"
        >
          <RotateCcw size={20} />
        </button>
        
        <button
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30"
          title="Redo (Ctrl+Shift+Z)"
        >
          <RotateCw size={20} />
        </button>
      </div>

      {/* Enhanced Templates Panel */}
      {showTemplates && (
        <div className="absolute left-12 top-16 w-80 bg-white shadow-xl rounded-r-lg z-30 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Templates</h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-2 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => loadTemplate(template.name)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <span className="text-2xl">{template.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                    <div className="text-xs text-blue-600 mt-1">{template.category}</div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
            
            <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600">
              <Plus size={16} className="mx-auto mb-1" />
              <div className="text-sm">View all templates...</div>
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Shapes Panel */}
      {showShapes && (
        <div className="absolute left-12 top-32 bg-white shadow-xl rounded-lg p-3 z-30">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { setTool('line'); setShowShapes(false); }}
              className={`p-3 rounded ${tool === 'line' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Line"
            >
              <Minus size={18} />
            </button>
            <button
              onClick={() => { setTool('arrow'); setShowShapes(false); }}
              className={`p-3 rounded ${tool === 'arrow' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Arrow"
            >
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => { setTool('rectangle'); setShowShapes(false); }}
              className={`p-3 rounded ${tool === 'rectangle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Rectangle"
            >
              <Square size={18} />
            </button>
            <button
              onClick={() => { setTool('circle'); setShowShapes(false); }}
              className={`p-3 rounded ${tool === 'circle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Circle"
            >
              <Circle size={18} />
            </button>
            <button
              onClick={() => { setTool('triangle'); setShowShapes(false); }}
              className={`p-3 rounded ${tool === 'triangle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Triangle"
            >
              <Triangle size={18} />
            </button>
            <button
              onClick={() => { setTool('star'); setShowShapes(false); }}
              className={`p-3 rounded ${tool === 'star' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              title="Star"
            >
              <Star size={18} />
            </button>
          </div>
          
          <div className="mt-2 pt-2 border-t">
            <button
              onClick={() => setShowMoreShapes(!showMoreShapes)}
              className="w-full text-xs text-gray-600 hover:text-gray-800 flex items-center justify-center"
            >
              More shapes <ChevronRight size={12} className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Emoji Panel */}
      {showEmojis && (
        <div className="absolute left-12 top-80 w-64 bg-white shadow-xl rounded-lg p-3 z-30 max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">Emojis</h4>
            <button
              onClick={() => setShowEmojis(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-8 gap-1">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addEmoji(emoji)}
                className="p-2 text-lg hover:bg-gray-100 rounded"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Layers Panel */}
      {showLayers && (
        <div className="absolute left-12 top-96 w-64 bg-white shadow-xl rounded-lg z-30">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Layers</h4>
              <button
                onClick={() => setShowLayers(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          <div className="p-3 space-y-2">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`flex items-center space-x-2 p-2 rounded ${
                  currentLayer === layer.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => toggleLayer(layer.id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                
                <button
                  onClick={() => lockLayer(layer.id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
                </button>
                
                <button
                  onClick={() => setCurrentLayer(layer.id)}
                  className="flex-1 text-left text-sm"
                >
                  {layer.name}
                </button>
              </div>
            ))}
            
            <button
              onClick={addNewLayer}
              className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-gray-400 hover:text-gray-600 text-sm"
            >
              <Plus size={14} className="inline mr-1" />
              Add Layer
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      {showQuickActions && (
        <div className="absolute left-12 bottom-32 w-48 bg-white shadow-xl rounded-lg p-3 z-30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm">Quick Actions</h4>
            <button
              onClick={() => setShowQuickActions(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={copySelected}
              className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-50 rounded"
            >
              <Copy size={14} />
              <span>Copy (Ctrl+C)</span>
            </button>
            
            <button
              onClick={pasteSelected}
              className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-50 rounded"
            >
              <FileText size={14} />
              <span>Paste (Ctrl+V)</span>
            </button>
            
            <button
              onClick={deleteSelected}
              className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-50 rounded text-red-600"
            >
              <Trash2 size={14} />
              <span>Delete (Del)</span>
            </button>
            
            <div className="border-t pt-2">
              <button
                onClick={() => { setGridVisible(!gridVisible); redrawCanvas(); }}
                className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-50 rounded"
              >
                <Grid size={14} />
                <span>Toggle Grid (G)</span>
              </button>
              
              <button
                onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-50 rounded"
              >
                <Target size={14} />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`absolute top-16 left-12 ${
          tool === 'pan' ? 'cursor-grab' : 
          tool === 'text' ? 'cursor-text' : 
          'cursor-crosshair'
        }`}
        style={{ 
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: '0 0',
          width: 'calc(100vw - 3rem)',
          height: 'calc(100vh - 4rem)'
        }}
      />

      {/* Text Input Modal */}
      {showTextInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add Text</h3>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter text..."
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && addText()}
            />
            <div className="flex space-x-2">
              <button
                onClick={addText}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Text
              </button>
              <button
                onClick={() => setShowTextInput(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Bottom Toolbar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-3 flex items-center space-x-3">
        
        {/* Color Picker */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-10 h-10 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: color }}
            title="Color"
          />
          {showColorPicker && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-4 rounded-lg shadow-xl">
              <div className="grid grid-cols-6 gap-2 mb-3">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => setColor(presetColor)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: presetColor }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-8 rounded"
              />
              <button
                onClick={() => setShowColorPicker(false)}
                className="mt-2 w-full bg-blue-500 text-white rounded p-1 text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Brush Size */}
        <div className="relative">
          <button
            onClick={() => setShowBrushSize(!showBrushSize)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            title="Brush Size"
          >
            <div
              className="bg-black rounded-full"
              style={{ width: `${Math.min(brushSize / 2, 15)}px`, height: `${Math.min(brushSize / 2, 15)}px` }}
            />
          </button>
          {showBrushSize && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-3 rounded-lg shadow-xl">
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-32"
              />
              <div className="text-center mt-1 text-sm">{brushSize}px</div>
              <button
                onClick={() => setShowBrushSize(false)}
                className="mt-2 w-full bg-blue-500 text-white rounded p-1 text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Opacity */}
        <div className="relative">
          <button
            onClick={() => setShowOpacity(!showOpacity)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            title="Opacity"
          >
            <span className="text-xs font-bold">{Math.round(opacity * 100)}</span>
          </button>
          {showOpacity && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-3 rounded-lg shadow-xl">
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-32"
              />
              <div className="text-center mt-1 text-sm">{Math.round(opacity * 100)}%</div>
              <button
                onClick={() => setShowOpacity(false)}
                className="mt-2 w-full bg-blue-500 text-white rounded p-1 text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Eraser */}
        <button
          onClick={() => setAction(action === 'erase' ? 'draw' : 'erase')}
          className={`p-2 rounded-full ${action === 'erase' ? 'bg-red-100 text-red-600' : 'bg-gray-100'}`}
          title="Eraser"
        >
          <Trash2 size={20} />
        </button>

        {/* Background Color */}
        <div className="relative">
          <button
            onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center"
            title="Background"
          >
            <div 
              className="w-8 h-8 rounded" 
              style={{ backgroundColor: background, border: '1px solid #ccc' }} 
            />
          </button>
          {showBackgroundPicker && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-4 rounded-lg shadow-xl">
              <div className="grid grid-cols-6 gap-2 mb-3">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => setBackground(presetColor)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: presetColor }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full h-8 rounded"
              />
              <button
                onClick={() => setShowBackgroundPicker(false)}
                className="mt-2 w-full bg-blue-500 text-white rounded p-1 text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Grid Toggle */}
        <button
          onClick={() => { setGridVisible(!gridVisible); redrawCanvas(); }}
          className={`p-2 rounded-full ${gridVisible ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
          title="Toggle Grid (G)"
        >
          <Grid size={20} />
        </button>

        {/* Clear Canvas */}
        <button
          onClick={clearCanvas}
          className="p-2 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600"
          title="Clear Canvas"
        >
          <Trash2 size={20} />
        </button>

        {/* Upload Image */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full bg-gray-100"
          title="Upload Image"
        >
          <Image size={20} />
        </button>

        {/* Download */}
        <button
          onClick={downloadCanvas}
          className="p-2 rounded-full bg-gray-100"
          title="Download"
        >
          <Download size={20} />
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
            className="p-2 rounded-full bg-gray-100"
            title="Zoom Out (-)"
          >
            <ZoomOut size={20} />
          </button>
          
          <span className="text-sm font-medium px-2">{Math.round(zoom * 100)}%</span>
          
          <button
            onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            className="p-2 rounded-full bg-gray-100"
            title="Zoom In (+)"
          >
            <ZoomIn size={20} />
          </button>
        </div>

        {/* Celebration Button */}
        <button
          onClick={celebrate}
          className="p-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600"
          title="Celebrate!"
        >
          <Sparkles size={20} />
        </button>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-100 flex items-center justify-between px-4 text-xs text-gray-600">
        <div className="flex items-center space-x-4">
          <span>Tool: {tool}</span>
          <span>Zoom: {Math.round(zoom * 100)}%</span>
          <span>Layer: {layers.find(l => l.id === currentLayer)?.name}</span>
          {gridVisible && <span>Grid: ON</span>}
        </div>
        
        <div className="flex items-center space-x-4">
          <span>Objects: {selectedObjects.length} selected</span>
          <span>History: {historyStep + 1}/{history.length}</span>
          <div className="flex items-center space-x-1">
            {collaborators.filter(c => c.active).map(c => (
              <div key={c.id} className="w-2 h-2 rounded-full bg-green-400" title={`${c.name} is online`} />
            ))}
            <span>{collaborators.filter(c => c.active).length} online</span>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="hidden"
      />

      {/* Keyboard Shortcuts Help */}
      <div className="fixed top-20 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600 max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h4 className="font-semibold mb-2">Keyboard Shortcuts</h4>
        <div className="space-y-1">
          <div>P - Pen tool</div>
          <div>S - Select tool</div>
          <div>H - Hand/Pan tool</div>
          <div>T - Text tool</div>
          <div>N - Sticky notes</div>
          <div>E - Emoji panel</div>
          <div>L - Layers panel</div>
          <div>G - Toggle grid</div>
          <div>Ctrl+Z - Undo</div>
          <div>Ctrl+S - Save/Download</div>
          <div>+/- - Zoom in/out</div>
          <div>Ctrl+0 - Reset zoom</div>
          <div>Del - Delete selected</div>
          <div>Esc - Close panels</div>
        </div>
      </div>

      {/* Loading Indicator */}
      {history.length === 0 && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="flex items-center space-x-3">
            <RefreshCw className="animate-spin" size={24} />
            <span className="text-lg">Initializing Whiteboard...</span>
          </div>
        </div>
      )}

      {/* Connection Status */}
      <div className="fixed top-20 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
        Connected
      </div>

      {/* Auto-save Indicator */}
      <div className="fixed top-32 left-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center opacity-0 transition-opacity duration-300" id="autosave-indicator">
        <Save size={14} className="mr-1" />
        Auto-saved
      </div>
    </div>
  );
};

export default WebWhiteboard;