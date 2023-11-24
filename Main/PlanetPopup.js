class PlanetPopup {
    constructor(x, y, planetX, planetY,width, height, titel, thumbnail, thWidth, thHeight, description, open) {
        this.x = x;
        this.y = y;
        this.planetX = planetX;
        this.planetY = planetY;
        this.width = width;
        this.height = height;
        this.titel = titel;
        this.thumbnail = thumbnail;
        this.thWidth = thWidth;
        this.thHeight = thHeight;
        this.description = description;
        this.open = open;
    };

    Start(){
        StartPopup();
    }

    SetData(planet){
        SetPopupData(planet);
    }

    Update(planet) {
        UpdatePopup(planet);
    }

    Draw() {
        DrawPopups();
    }
}

function StartPopup(){
    planetsPopup.width = canvas.width/5;
}

function SetPopupData(planet){
    planetsPopup.thumbnail = planet.thumbnail;
    console.log(planetsPopup.thumbnail);
    planetsPopup.thWidth = planetsPopup.width - 20;
    planetsPopup.thHeight = planetsPopup.thumbnail.naturalHeight*(planetsPopup.thWidth/planetsPopup.thumbnail.naturalWidth);
    planetsPopup.description ="Hier een kleine omschrijving van hoe een omschrijving er uit gaat zien. Het zal waarschijnlijk max 2 zinnen bevatten";
    var textHeight = CalculateText(context, planetsPopup.description, planetsPopup.planetX, planetsPopup.y+10+planetsPopup.thHeight+5+20, planetsPopup.thWidth, 20,"Arial");
    planetsPopup.height = planetsPopup.thHeight+textHeight+45;
}

function UpdatePopup(planet) {
    planetsPopup.planetX = planet.positionX;
    planetsPopup.planetY = planet.positionY;
    planetsPopup.x = planetsPopup.planetX-(planetsPopup.width/2);
    planetsPopup.y = planetsPopup.planetY-planetsPopup.height;
    
}

function DrawPopups() {
    if(planetsPopup.open){
        context.fillStyle = 'brown';
        context.beginPath();
        context.roundRect(planetsPopup.x, planetsPopup.y, planetsPopup.width, planetsPopup.height, 10);
        context.fill();

        context.drawImage(planetsPopup.thumbnail, planetsPopup.x+10, planetsPopup.y+10, planetsPopup.thWidth, planetsPopup.thHeight)

        context.fillStyle = 'white';
        DrawText(context, planetsPopup.description, planetsPopup.planetX, planetsPopup.y+planetsPopup.thHeight+35, planetsPopup.thWidth, 20,"Arial");
    }
}

function CalculateText(context, text, x, y, maxWidth, fontSize,fontFace){
    var words = text.split(' ');
    var line = '';
    var lineHeight = fontSize+2;
    var beginHeight = y;

    context.textAlign = "center";
    context.fontSize
    context.font = fontSize + "px " + fontFace;

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    return y - beginHeight;
}

function DrawText(context, text, x, y, maxWidth, fontSize,fontFace) {
    var words = text.split(' ');
    var line = '';
    var lineHeight = fontSize+2;

    context.textAlign = "center";
    context.fontSize
    context.font = fontSize + "px " + fontFace;

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}