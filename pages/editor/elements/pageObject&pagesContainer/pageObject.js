import {
    fontColorInput,
    fontThickness,
    fontOpacity,
    erasingFontSlider,
    fontGradientColor1Input,
    fontGradientColor2Input,
    fontGradientWheel,
    fontColorInputDiv
}
    from "../fontSettings/fontSettings.js";

import {
    textColorInput,
    textGradientColor1Input,
    textGradientColor2Input,
    textGradientWheel,
    textColorInputDiv
} from "../textInputPanel/textInputPanel.js";

import {mode} from "../../../../global/global.js";
import {drawwingSound} from "../drawwingsound/drawwingSound.js";

export class Page {
    #width = window.innerWidth - 1;
    #height = screen.height;
    #pageContainer = document.createElement("div");
    #backgroundCanvas = document.createElement("canvas");
    #backgroundContext  = this.#backgroundCanvas.getContext("2d");
    #drawwingCanvas  = document.createElement("canvas");
    #drawwingContext = this.#drawwingCanvas.getContext("2d");
    #drawwingStatus = false;
    #drawwingShapeStatus = false;
    #fontJoinStyle = "round";
    #fontCapStyle = "round";
    #fontChoosed = false;
    #erasingColor = "#ffffff";
    #shapeOffsets = undefined;
    #drawwingSnapShot = null;

    // Background States
    #pageBackgroundColor = mode === "dark" ? "#000000" : "#ffffff";
    #pageBackgroundImage = null;
    #gradientColor1 = "#ff0000";
    #gradientColor2 = "#0000ff";
    #gradientAngle = 0;
    #backgroundType = "color"; // "color", "gradient", "image"

    #drawwingColor = null;


    constructor(id) {
        this.id = `Page ${id}`;
        this.#createPageStructure();
        this.#configureCanvasDimensions();
        this.#configureBackground();
        this.#attachInitialEventListeners();
    }

    #createPageStructure() {
        this.#pageContainer.id = this.id;
        this.#pageContainer.style.width = `${this.#width}px`;
        this.#pageContainer.style.height = `${this.#height}px`;
        this.#pageContainer.className = `relative border-x-2 border-x-solid shrink-0 snap-center `;
        mode === "light" ? this.#pageContainer.classList.add("border-x-black") : this.#pageContainer.classList.add("border-x-white");
        this.#pageContainer.append(this.#backgroundCanvas, this.#drawwingCanvas);

        this.#backgroundCanvas.className = "absolute top-0 left-0";
        this.#drawwingCanvas.className = "absolute top-0 left-0";
    }

    #configureCanvasDimensions() {
        this.#drawwingCanvas.height = this.#height;
        this.#drawwingCanvas.width = this.#width - 4;

        this.#backgroundCanvas.height = this.#height;
        this.#backgroundCanvas.width = this.#width - 4;
    }

    #configureBackground() {
        this.renderBackground();
    }

    #attachInitialEventListeners() {
        this.#drawwingCanvas.onmousedown = (e) => this.startDrawing(e);
        this.#drawwingCanvas.onmousemove = (event) => this.performDraw(event);
        this.#drawwingCanvas.onmouseup = () => this.endDrawingState();
        document.onmouseleave = () => this.endDrawingState();
        this.#drawwingCanvas.ontouchstart = (event) => {
            event.preventDefault();
            this.startDrawing(event.touches[0]);
        };
        this.#drawwingCanvas.ontouchmove = (event) => {
            event.preventDefault();
            if (event.touches.length > 0) {
                this.performDraw(event.touches[0]);
            }
        };
        this.#drawwingCanvas.ontouchend = () => this.endDrawingState();
    }

    get backgroundType() {
        return this.#backgroundType;
    }

    set backgroundType(type) {
        this.#backgroundType = type;
        this.renderBackground();
    }

    get width(){
        return this.#width;
    }

    get height(){
        return this.#height
    }

    get pageContainer() {
        return this.#pageContainer;
    }

    get backgroundCanvas() {
        return this.#backgroundCanvas;
    }

    get drawwingCanvas() {
        return this.#drawwingCanvas;
    }

    get pageBackgroundColor() {
        return this.#pageBackgroundColor;
    }

    get pageBackgroundImage(){
        return this.#pageBackgroundImage
    }

    data() {
        return{
            background: this.#backgroundCanvas.toDataURL(),
            drawwing: this.#backgroundCanvas.toDataURL()
        };
    }

    // --- Background Rendering Algorithm ---

    renderBackground() {
        const canvasWidth = this.#width - 4;
        const canvasHeight = this.#height;
        this.#backgroundContext.clearRect(0, 0, canvasWidth, canvasHeight);

        if (this.#backgroundType === "color") {
            this.#backgroundContext.fillStyle = this.#pageBackgroundColor;
            this.#backgroundContext.fillRect(0, 0, canvasWidth, canvasHeight);
        } 
        else if (this.#backgroundType === "gradient") {
            this.#backgroundContext.save();
            this.#backgroundContext.translate(canvasWidth / 2, canvasHeight / 2);
            // turning the paper
            this.#backgroundContext.rotate((this.#gradientAngle - 90) * Math.PI / 180);
            
            const size = Math.max(canvasWidth, canvasHeight) * 2;
            const grad = this.#backgroundContext.createLinearGradient(-size/2, 0, size/2, 0);
            grad.addColorStop(0, this.#gradientColor1);
            grad.addColorStop(1, this.#gradientColor2);
            
            this.#backgroundContext.fillStyle = grad;
            this.#backgroundContext.fillRect(-size/2, -size/2, size, size);
            this.#backgroundContext.restore();
        } 
        else if (this.#backgroundType === "image") {
            if (this.#pageBackgroundImage) {
                this.#drawCoverImage(this.#pageBackgroundImage);
            } else {
                this.#backgroundContext.fillStyle = this.#pageBackgroundColor;
                this.#backgroundContext.fillRect(0, 0, canvasWidth, canvasHeight);
            }
        }
    }

    #drawCoverImage(img) {
        const canvasWidth = this.#width - 4;
        const canvasHeight = this.#height;
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let renderableWidth, renderableHeight, xStart, yStart;

        if (imageAspectRatio > canvasAspectRatio) {
            renderableHeight = canvasHeight;
            renderableWidth = canvasHeight * imageAspectRatio;
            xStart = (canvasWidth - renderableWidth) / 2;
            yStart = 0;
        } else {
            renderableWidth = canvasWidth;
            renderableHeight = canvasWidth / imageAspectRatio;
            xStart = 0;
            yStart = (canvasHeight - renderableHeight) / 2;
        }

        this.#backgroundContext.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
    }

    // --- Drawing Methods ---

    #hexToRgba(hex, opacity) {
        let r = 0, g = 0, b = 0;
        hex = hex.replace("#", "");

        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }

        return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }

    startDrawing(event) {
        if (!this.#fontChoosed) return;
        this.#drawwingStatus = true;
        this.#drawwingSnapShot = this.#drawwingContext.getImageData(0,0,this.#width,this.#height);
        this.#configureContextForDrawing(event);
        this.#toggleUI(true);
        drawwingSound.play();
    }

    #getFontBrush() {
        const opacity = fontOpacity.value;
        const isGradient = fontColorInputDiv.classList.contains("hidden");

        if (!isGradient) {
            return this.#hexToRgba(fontColorInput.value, opacity);
        } else {
            // Font Gradient Brush
            const angle = parseInt(fontGradientWheel.dataset.angle);
            const color1 = fontGradientColor1Input.value;
            const color2 = fontGradientColor2Input.value;
            
            // For simple drawing, we use a global linear gradient across the canvas 
            // or we could use one relative to the line. A global one is easier to sync.
            const grad = this.#drawwingContext.createLinearGradient(0, 0, this.#width, this.#height);
            grad.addColorStop(0, color1);
            grad.addColorStop(1, color2);
            return grad;
        }
    }

    #configureContextForDrawing(event) {
        this.#drawwingContext.lineJoin = this.#fontJoinStyle;
        this.#drawwingContext.lineCap = this.#fontCapStyle;
        this.#drawwingContext.strokeStyle = this.#getFontBrush();
        this.#drawwingContext.lineWidth = parseInt(fontThickness.value) / 2;
        this.#drawwingContext.beginPath();
        this.#drawwingContext.moveTo(event.clientX, event.clientY);
    }

    performDraw(event) {
        if (!this.#drawwingStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);
        this.#drawwingContext.lineTo(event.clientX, event.clientY);
        this.#drawwingContext.stroke();
    }

    startShapeDrawing(event) {
        this.#drawwingShapeStatus = true;
        this.#toggleUI(true);
        this.#shapeOffsets = [event.clientX,event.clientY];
        this.#drawwingSnapShot = this.#drawwingContext.getImageData(0,0,this.#width,this.#height);
        this.#configureContextForShapeDrawwing(event);
    }

    #configureContextForShapeDrawwing() {
        const brush = this.#getFontBrush();
        this.#drawwingContext.fillStyle = brush;
        this.#drawwingContext.strokeStyle = brush;
        this.#drawwingContext.lineWidth = parseInt(fontThickness.value);
        this.#drawwingContext.lineJoin = "miter";
    }


    performRectDraw(event, isFilled) {
        if(!this.#drawwingShapeStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);
        const width = event.clientX - this.#shapeOffsets[0];
        const height = event.clientY - this.#shapeOffsets[1];

        if (isFilled)
            this.#drawwingContext.fillRect(this.#shapeOffsets[0], this.#shapeOffsets[1], width, height);
        else
            this.#drawwingContext.strokeRect(this.#shapeOffsets[0], this.#shapeOffsets[1], width, height);
    }

    performCircleDraw(event, isFilled) {
        if(!this.#drawwingShapeStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);
        this.#drawwingContext.beginPath()

        const raduisX = Math.abs(event.clientX - this.#shapeOffsets[0]);
        const raduisY = Math.abs(event.clientY - this.#shapeOffsets[1]);

        this.#drawwingContext.ellipse(this.#shapeOffsets[0], this.#shapeOffsets[1], raduisX, raduisY, 0, 0, 2 * Math.PI);

        if (isFilled)
            this.#drawwingContext.fill()
        else
            this.#drawwingContext.stroke();
    }

    performTriangleDraw(event, isFilled) {
        if(!this.#drawwingShapeStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);
        this.#drawwingContext.beginPath()


        this.#drawwingContext.moveTo(this.#shapeOffsets[0],this.#shapeOffsets[1]);
        this.#drawwingContext.lineTo(event.clientX,event.clientY);
        this.#drawwingContext.lineTo(this.#shapeOffsets[0] * 2 - event.clientX,event.clientY)
        this.#drawwingContext.closePath()

        if (isFilled)
            this.#drawwingContext.fill()
        else
            this.#drawwingContext.stroke();

    }

    performImageDraw(event,image) {
        if(!this.#drawwingShapeStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);

        const width = event.clientX - this.#shapeOffsets[0];
        const height = event.clientY - this.#shapeOffsets[1];

        image.width = width;
        image.height = height;

        this.#drawwingContext.drawImage(image, this.#shapeOffsets[0], this.#shapeOffsets[1], width, height);
    }
    performLineDraw(event){
        if(!this.#drawwingShapeStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);
        this.#drawwingContext.beginPath();
        this.#drawwingContext.moveTo(this.#shapeOffsets[0],this.#shapeOffsets[1]);
        this.#drawwingContext.lineTo(event.clientX,event.clientY);
        this.#drawwingContext.stroke()
    }

    startTextDrawwing(event,fontFamily,fontSize,color){
        this.#drawwingShapeStatus = true;
        this.#shapeOffsets = [event.clientX,event.clientY];
        this.#drawwingSnapShot = this.#drawwingContext.getImageData(0,0,this.#width,this.#height);
        this.#configureContextForText(color,fontSize,fontFamily);
        this.#toggleUI(true);
    }

    #getTextBrush(color) {
        const isGradient = textColorInputDiv.classList.contains("hidden");
        if (!isGradient) {
            return color;
        } else {
            const color1 = textGradientColor1Input.value;
            const color2 = textGradientColor2Input.value;
            const grad = this.#drawwingContext.createLinearGradient(0, 0, this.#width, this.#height);
            grad.addColorStop(0, color1);
            grad.addColorStop(1, color2);
            return grad;
        }
    }

    #configureContextForText(color,fontSize,fontFamily){
        const brush = this.#getTextBrush(color);
        this.#drawwingContext.fillStyle = brush;
        this.#drawwingContext.strokeStyle = brush;
        this.#drawwingContext.font = `${fontSize}px ${fontFamily}`;
        this.#drawwingContext.textBaseline = "top";
    }

    #getLines(text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = this.#drawwingContext.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    performTextDraw(event,text,isStroke, alignment, direction){
        if(!this.#drawwingShapeStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);
        
        const targetWidth = event.clientX - this.#shapeOffsets[0];
        const targetHeight = event.clientY - this.#shapeOffsets[1];

        if (Math.abs(targetWidth) < 1 || Math.abs(targetHeight) < 1) return;

        // Use absolute width for wrapping logic
        const wrapWidth = Math.abs(targetWidth);
        const lines = this.#getLines(text, wrapWidth);
        
        const baseFontSize = parseInt(this.#drawwingContext.font);
        const totalBaseHeight = lines.length * baseFontSize;

        // Calculate max width actually used by lines
        let maxLineWidth = 0;
        lines.forEach(l => {
            const w = this.#drawwingContext.measureText(l).width;
            if (w > maxLineWidth) maxLineWidth = w;
        });

        this.#drawwingContext.save();
        this.#drawwingContext.translate(this.#shapeOffsets[0], this.#shapeOffsets[1]);
        this.#drawwingContext.direction = direction || 'ltr';
        
        // Scale the entire block to fit the target box
        const scaleX = targetWidth / maxLineWidth;
        const scaleY = targetHeight / totalBaseHeight;
        
        this.#drawwingContext.scale(scaleX, scaleY);

        lines.forEach((line, index) => {
            const lineWidth = this.#drawwingContext.measureText(line).width;
            let x = 0;
            if (alignment === 'center') {
                x = (maxLineWidth - lineWidth) / 2;
            } else if (alignment === 'right') {
                x = maxLineWidth - lineWidth;
            }

            if(!isStroke)
                this.#drawwingContext.fillText(line, x, index * baseFontSize);
            else
                this.#drawwingContext.strokeText(line, x, index * baseFontSize);
        });
            
        this.#drawwingContext.restore();
    }

    // --- Stop Drawing Methods ---

    endDrawingState() {
        this.#drawwingStatus = false;
        this.#drawwingShapeStatus = false;
        this.#drawwingContext.globalCompositeOperation = 'source-over';
        this.#toggleUI(false);
        drawwingSound.currentTime = 0;
        drawwingSound.pause();
    }


    startErasing(event) {
        this.#drawwingStatus = true;
        this.#drawwingSnapShot = this.#drawwingContext.getImageData(0,0,this.#width,this.#height);
        this.#configureContextForErasing(event);
        this.#toggleUI(true);
    }

    #configureContextForErasing(event) {
        this.#drawwingContext.globalCompositeOperation = 'destination-out';
        this.#drawwingContext.beginPath();
        this.#drawwingContext.lineWidth = parseInt(erasingFontSlider.value);
        this.#drawwingContext.moveTo(event.clientX, event.clientY);
    }

    performErase(event) {
        if (!this.#drawwingStatus) return;
        this.#drawwingContext.putImageData(this.#drawwingSnapShot,0,0);
        this.#drawwingContext.lineJoin = "round";
        this.#drawwingContext.lineCap = "round";
        this.#drawwingContext.lineTo(event.clientX, event.clientY);
        this.#drawwingContext.stroke();
    }

    attachEventListenersForShape(shape,fill) {
            this.#drawwingCanvas.onmousedown = (event) => this.startShapeDrawing(event);
            this.#drawwingCanvas.ontouchstart = (event) => this.startShapeDrawing(event.touches[0]);
            this.#drawwingCanvas.onmouseup = () => this.endDrawingState();
        if(shape === "rectangle"){
            this.#drawwingCanvas.onmousemove = (event) => this.performRectDraw(event,fill);
            this.#drawwingCanvas.ontouchmove = (event) =>{
                event.preventDefault();
                this.performRectDraw(event.touches[0],fill);
            }
        }
        else if (shape === "circle"){
            this.#drawwingCanvas.onmousemove = (event) => this.performCircleDraw(event,fill);
            this.#drawwingCanvas.ontouchmove = (event) => {
                event.preventDefault();
                this.performCircleDraw(event.touches[0], fill);
            }
        }
        else if (shape === "triangle"){
            this.#drawwingCanvas.onmousemove = (event) => this.performTriangleDraw(event,fill);
            this.#drawwingCanvas.ontouchmove = (event) => {
                event.preventDefault();
                this.performTriangleDraw(event.touches[0], fill);
            }
        }
        else if (shape === "line"){
            this.#drawwingCanvas.onmousemove = (event) => this.performLineDraw(event);
            this.#drawwingCanvas.ontouchmove = (event) => {
                event.preventDefault()
                this.performLineDraw(event.touches[0]);
            }
        }
        else {
            throw new Error("invalid shape type in pageObject&pagesContainer.attachEventListenersForShape")
        }
    }

    attachEventListenersForImage(image){
        this.drawwingCanvas.onmousedown = (event) => this.startShapeDrawing(event);
        this.drawwingCanvas.onmousemove = (event) => this.performImageDraw(event,image);

        this.drawwingCanvas.ontouchstart = (event) => this.startShapeDrawing(event.touches[0]);
        this.drawwingCanvas.ontouchmove = (event) => {
            event.preventDefault()
            this.performImageDraw(event.touches[0], image);
        }
    }

    attachEventListenersForText(text,fontFamily,fontSize,fill,color, alignment, direction){
        this.drawwingCanvas.onmousedown = (event) => this.startTextDrawwing(event,fontFamily,fontSize,color);
        this.drawwingCanvas.onmousemove = (event) => this.performTextDraw(event,text,fill, alignment, direction);

        this.drawwingCanvas.ontouchstart = (event) => this.startTextDrawwing(event.touches[0],fontFamily,fontSize,color);
        this.drawwingCanvas.ontouchmove = (event) => {
            event.preventDefault()
            this.performTextDraw(event.touches[0],text,fill, alignment, direction);
        }
    }
    // --- Rectangle Drawing Methods ---


    #toggleUI(hide) {
        const uiElements = document.querySelectorAll(".panel, .container, .dropDown");
        
        uiElements.forEach(element => {
            if (hide) {
                if (!element.classList.contains("hidden")) {
                    element.classList.add("hidden");
                    element.dataset.wasVisible = "true";
                }
            } else {
                if (element.dataset.wasVisible === "true") {
                    element.classList.remove("hidden");
                    delete element.dataset.wasVisible;
                }
            }
        });
    }

    // --- Settings Methods ---

    changeFontSettings(cap, join) {
        this.#fontCapStyle = cap;
        this.#fontJoinStyle = join;
    }

    applyFontType(fontType) {
        if (fontType) {
            this.#fontChoosed = true;
            if (fontType === "pencil") {
                this.changeFontSettings("round", "round");
            } else if (fontType === "marker") {
                this.changeFontSettings("butt", "bevel");
            }
        } else {
            this.#fontChoosed = false;
        }
    }

    changeBackgroundColor(color) {
        let hexColor = color;
        if (color === "light") hexColor = "#ffffff";
        else if (color === "dark") hexColor = "#000000";

        this.#pageBackgroundColor = hexColor;
        this.#backgroundType = "color";
        this.renderBackground();
    }

    changeBackgroundGradient(color1, color2, angle) {
        this.#gradientColor1 = color1;
        this.#gradientColor2 = color2;
        this.#gradientAngle = angle;
        this.#backgroundType = "gradient";
        this.renderBackground();
    }

    changeBackgroundImage(img) {
        this.#pageBackgroundImage = img;
        this.#backgroundType = "image";
        this.renderBackground();
    }

    // --- Canvas Event Listener Methods ---

    setErasingMode() {
        this.#drawwingCanvas.onmousedown = (e) => this.startErasing(e);
        this.#drawwingCanvas.onmousemove = (event) => this.performErase(event);
        this.#drawwingCanvas.ontouchstart = (e) => this.startErasing(e.touches[0]);
        this.#drawwingCanvas.ontouchmove = (event) => {
            event.preventDefault();
            if (event.touches.length > 0) {
                this.performErase(event.touches[0]);
            }
        };
    }

    setDrawingMode() {
        this.#drawwingContext.globalCompositeOperation = 'source-over';
        if (this.#fontChoosed) {
            this.#drawwingCanvas.onmousedown = (e) => this.startDrawing(e);
            this.#drawwingCanvas.onmousemove = (event) => this.performDraw(event);
            this.#drawwingCanvas.ontouchstart = (event) => {
                event.preventDefault();
                this.startDrawing(event.touches[0]);
            };
            this.#drawwingCanvas.ontouchmove = (event) => {
                event.preventDefault();
                if (event.touches.length > 0) {
                    this.performDraw(event.touches[0]);
                }
            };
        } else {
            this.#drawwingCanvas.onmousedown = undefined;
            this.#drawwingCanvas.onmousemove = undefined;
            this.#drawwingCanvas.ontouchstart = undefined;
            this.#drawwingCanvas.ontouchmove = undefined;
        }
    }
}