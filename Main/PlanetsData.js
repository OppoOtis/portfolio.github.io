const planetsData = [];
let planetOveralSpeed = 1;
const projects = [
    {
      name: 'Project1',
      imagePath: './Projects/Project1/image.png',
      textPath: './Projects/Project1/text.txt'
    },
    {
      name: 'Project2',
      imagePath: './Projects/Project2/image.png',
      textPath: './Projects/Project2/text.txt'
    },
    //add more projects
  ];

class Planet{
    constructor(index, radius, color, offset, positionX, positionY, angle, rotationSpeed, thumbnail, description) {
        this.index = index;
        this.radius = radius;
        this.color = color;
        this.offset = offset;
        this.positionX = positionX;
        this.positionY = positionY;
        this.angle = angle;
        this.rotationSpeed = rotationSpeed;
        this.thumbnail = thumbnail;
        this.description = description;
        this.SetPopupData();
    }

    SetPopupData(){
        const img = new Image();
        img.src = projects[this.index].imagePath;
        this.thumbnail = img;
        
    }
}