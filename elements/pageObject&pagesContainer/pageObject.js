import {fontSettings,fontColorInput,fontThickness,fontOpacity,erasingFontSlider,erasingFontSliderDiv}
    from "../fontSettings/fontSettings.js";

import {mode} from "../../global/globals.js";
import {eraser,bottomTools} from "../bottomTools/bottomTools.js";
import {pageToolsContainer} from "../pageTools/pageTools.js";
import {addShapesPanel} from "../addShapesPanel/addShapesPanel.js";
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
    #pageBackgroundColor = null;
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
        if(mode === "light"){
            this.#backgroundContext.fillStyle = "#ffffff";
            this.#pageBackgroundColor = "#ffffff";
        }
        else if(mode === "dark"){
            this.#backgroundContext.fillStyle = "#000000";
            this.#pageBackgroundColor = "#000000";
        }
        this.#backgroundContext.fillRect(0, 0, this.#width, this.#height);
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
        this.#drawwingColor = this.#hexToRgba(fontColorInput.value, fontOpacity.value);
        this.#drawwingSnapShot = this.#drawwingContext.getImageData(0,0,this.#width,this.#height);
        this.#configureContextForDrawing(event);
        this.#toggleUI(true);
        drawwingSound.play();
    }

    #configureContextForDrawing(event) {
        this.#drawwingContext.lineJoin = this.#fontJoinStyle;
        this.#drawwingContext.lineCap = this.#fontCapStyle;
        this.#drawwingContext.strokeStyle = this.#drawwingColor;
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
        this.#drawwingColor = this.#hexToRgba(fontColorInput.value, fontOpacity.value);
        this.#drawwingShapeStatus = true;
        this.#toggleUI(true);
        this.#shapeOffsets = [event.clientX,event.clientY];
        this.#drawwingSnapShot = this.#drawwingContext.getImageData(0,0,this.#width,this.#height);
        this.#drawwingColor = this.#hexToRgba(fontColorInput.value, fontOpacity.value);
        this.#configureContextForShapeDrawwing(event);
    }

    #configureContextForShapeDrawwing() {
        this.#drawwingContext.fillStyle = this.#drawwingColor;
        this.#drawwingContext.strokeStyle = this.#drawwingColor;
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

    #configureContextForText(color,fontSize,fontFamily){
        this.#drawwingContext.fillStyle = color;
        this.#drawwingContext.strokeStyle = color;
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

    performTextDraw(event,text,isStroke){
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
        
        // Scale the entire block to fit the target box
        const scaleX = targetWidth / maxLineWidth;
        const scaleY = targetHeight / totalBaseHeight;
        
        this.#drawwingContext.scale(scaleX, scaleY);

        lines.forEach((line, index) => {
            if(!isStroke)
                this.#drawwingContext.fillText(line, 0, index * baseFontSize);
            else
                this.#drawwingContext.strokeText(line, 0, index * baseFontSize);
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

    attachEventListenersForText(text,fontFamily,fontSize,fill,color){
        this.drawwingCanvas.onmousedown = (event) => this.startTextDrawwing(event,fontFamily,fontSize,color);
        this.drawwingCanvas.onmousemove = (event) => this.performTextDraw(event,text,fill);

        this.drawwingCanvas.ontouchstart = (event) => this.startTextDrawwing(event.touches[0],fontFamily,fontSize,color);
        this.drawwingCanvas.ontouchmove = (event) => {
            event.preventDefault()
            this.performTextDraw(event.touches[0],text,fill);
        }
    }
    // --- Rectangle Drawing Methods ---


    #toggleUI(hide) {
        const isEraserActive = !eraser.classList.contains("bg-transparent");
        const isAddShapesPanelActive = !addShapesPanel.classList.contains("hidden")

        const elementsToToggle = [
            pageToolsContainer,
            bottomTools,
            !isEraserActive ? fontSettings : null,
            isEraserActive ? erasingFontSliderDiv : null,
            isAddShapesPanelActive ? addShapesPanel : null
        ].filter(element => element !== null); // Remove nulls

        elementsToToggle.forEach(container => {
            if (hide) {
                container.classList.add("hidden");
            } else {
                container.classList.remove("hidden");
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
            if (fontType === "pencill") {
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
        if (color === "light") {
            hexColor = "#ffffff";
        } else if (color === "dark") {
            hexColor = "#000000";
        }

        this.#backgroundContext.fillStyle = hexColor;
        this.#erasingColor = hexColor;
        this.#backgroundContext.fillRect(0, 0, this.#width, this.#height);
        this.#pageBackgroundColor = hexColor;
    }

    changeBackgroundImage(img) {
        this.#backgroundContext.fillStyle = this.#pageBackgroundColor;
        this.#backgroundContext.fillRect(0, 0, this.#width, this.#height);

        const canvasWidth = this.#width - 2;
        const canvasHeight = this.#height;

        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let renderableWidth, renderableHeight, xStart, yStart;

        if (imageAspectRatio < canvasAspectRatio) {
            renderableHeight = canvasHeight;
            renderableWidth = renderableHeight * imageAspectRatio;
            xStart = (canvasWidth - renderableWidth) / 2;
            yStart = 0;
        } else if (imageAspectRatio > canvasAspectRatio) {
            renderableWidth = canvasWidth;
            renderableHeight = renderableWidth / imageAspectRatio;
            xStart = 0;
            yStart = (canvasHeight - renderableHeight) / 2;
        } else {
            renderableWidth = canvasWidth;
            renderableHeight = canvasHeight;
            xStart = 0;
            yStart = 0;
        }

        this.#backgroundContext.drawImage(img, xStart, yStart, this.#width, this.#height);
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