/*Dibuja la arquitectura*/ 

/*Agregado*/
const initBgColor = '#1A192B';

const resx=1800
const resy=1000

//El area la utiliza para ver como los voy a dibujar:
//Equipos A:
//area=1 - backbone (en el centro de la imagen - x=200 y=100)
//area=2 - recovery (arriba del bnackbone - x=varía desde 0,200,400 y=0)
//area=3 - rackroom (abajo del backbone - x=varía desde 0,400 y=200)
//area=4 - secado1 (abajo del rackrrom - x=200 y=300)
//area=5 - secado2 (abajo de secado1 - x=varía desde 100,300 y=400)
//area=6 - fibra (a la derecha del backbone - x=600 y=varia desde 0,100,200)
//Equipos B:
//area=21 - backbone (en el centro de la imagen - x=200 y=100)
//area=22 - recovery (arriba del bnackbone - x=varía desde 0,200,400 y=0)
//area=23 - rackroom (abajo del backbone - x=varía desde 0,400 y=200)
//area=24 - secado1 (abajo del rackrrom - x=200 y=300)
//area=25 - secado2 (abajo de secado1 - x=varía desde 100,300 y=400)
//area=26 - fibra (a la derecha del backbone - x=600 y=varia desde 0,100,200)


//{id:2, equipo: "PMSWSY001B", area: 2},  //backbone B
//{ids:1, idt:2, desc: "Puerto 1-1"}, //conexion con backbone B
const equipos=[{id: 1, equipo: "PMSWSY001A", area: 1}, {id:3, equipo: "PMSWSY011A", area: 3}, {id:4, equipo: "PMSWSY021A", area: 3}, {id:5, equipo: "PMSWSY031A", area: 4}, {id:6, equipo: "PMSWSY111A", area: 6}, {id:7, equipo: "PMSWSY211A", area: 6}, {id:8, equipo: "PMSWSY121A", area: 2}, {id:9, equipo: "PMSWSY221A", area: 2}, {id:10, equipo: "PMSWSY251A", area: 2}, {id:11, equipo: "PMSWSY402A", area: 6}, {id:12, equipo: "PMSWSE231A", area: 5}, {id:13, equipo: "PMSWSE131A", area: 5}, 
     {id: 21, equipo: "PMSWSY001B", area: 21}, {id:23, equipo: "PMSWSY011B", area: 23}, {id:24, equipo: "PMSWSY021B", area: 23}, {id:25, equipo: "PMSWSY031B", area: 24}, {id:26, equipo: "PMSWSY111B", area: 26}, {id:27, equipo: "PMSWSY211B", area: 26}, {id:28, equipo: "PMSWSY121B", area: 22}, {id:29, equipo: "PMSWSY221B", area: 22}, {id:30, equipo: "PMSWSY251B", area: 22}, {id:31, equipo: "PMSWSY402B", area: 26}, {id:32, equipo: "PMSWSE231B", area: 25}, {id:33, equipo: "PMSWSE131B", area: 25}]
const conexiones=[{ids:1, idt:3, desc: "Puerto 2-1"},{ids:1, idt:4, desc: "Puerto 3-1"},{ids:1, idt:5, desc: "Puerto 4-1"},{ids:1, idt:6, desc: "Puerto 5-1"},{ids:1, idt:7, desc: "Puerto 6-1"},{ids:1, idt:8, desc: "Puerto 7-1"},{ids:1, idt:9, desc: "Puerto 8-1"},{ids:1, idt:10, desc: "Puerto 9-1"},{ids:1, idt:11, desc: "Puerto 10-1"}, {ids:5, idt:12, desc: "Puerto 1-1"}, {ids:5, idt:13, desc: "Puerto 2-1"},
    {ids:1, idt:21, desc: "Puerto TBD"},{ids:21, idt:23, desc: "Puerto 2-1"},{ids:21, idt:24, desc: "Puerto 3-1"},{ids:21, idt:25, desc: "Puerto 4-1"},{ids:21, idt:26, desc: "Puerto 5-1"},{ids:21, idt:27, desc: "Puerto 6-1"},{ids:21, idt:28, desc: "Puerto 7-1"},{ids:21, idt:29, desc: "Puerto 8-1"},{ids:21, idt:30, desc: "Puerto 9-1"},{ids:21, idt:31, desc: "Puerto 10-1"}, {ids:25, idt:32, desc: "Puerto 1-1"}, {ids:25, idt:33, desc: "Puerto 2-1"}]
let draweq=[]
let posy=0
let posx=0

let color='#FFFFF'
let posin='left'
let posout=''

let cant_area=[]
let i=1
while (i<27) { //inicializo el contador de equipos por area
  cant_area[i]=0
  i=i+1
}

equipos.forEach((eq)=>{ //cuento la cantidad de equipos por area
  switch (eq.area){
      //Equipos A
      case 1: cant_area[1]=cant_area[1] + 1; break;
      case 2: cant_area[2]=cant_area[2] + 1; break;
      case 3: cant_area[3]=cant_area[3] + 1; break;
      case 4: cant_area[4]=cant_area[4] + 1; break;
      case 5: cant_area[5]=cant_area[5] + 1; break;
      case 6: cant_area[6]=cant_area[6] + 1; break;
      //Equipos B
      case 21: cant_area[21]=cant_area[21] + 1; break;
      case 22: cant_area[22]=cant_area[22] + 1; break;
      case 23: cant_area[23]=cant_area[23] + 1; break;
      case 24: cant_area[24]=cant_area[24] + 1; break;
      case 25: cant_area[25]=cant_area[25] + 1; break;
      case 26: cant_area[26]=cant_area[26] + 1; break;
    
      default: console.log('Area no definida')
  }
})

const pasoy=80
//Definiendo ubicaciones de equipos A
let area2y=-0
let area3y=cant_area[2]*pasoy + area2y
let area4y=(cant_area[2]+cant_area[3])*pasoy + area2y
let area5y = area4y -40 + area2y
let area6y=(cant_area[2]+cant_area[3]+cant_area[4])*pasoy + area2y
//Definiendo ubicaciones de equipos B
let area2yB=-0
let area3yB=cant_area[22]*pasoy + area2yB
let area4yB=(cant_area[22]+cant_area[23])*pasoy + area2yB
let area5yB = area4yB -40 + area2yB
let area6yB=(cant_area[22]+cant_area[23]+cant_area[24])*pasoy + area2yB

console.log(area2y, ' ',area3y, ' ',area4y, ' ',area5y, ' ',area6y, ' ',)
console.log(area2yB, ' ',area3yB, ' ',area4yB, ' ',area5yB, ' ',area6yB, ' ',)
console.log(cant_area[1], ' ', cant_area[2], ' ', cant_area[3], ' ', cant_area[4], ' ', cant_area[5], ' ', cant_area[6])
console.log(cant_area[21], ' ', cant_area[22], ' ', cant_area[23], ' ', cant_area[24], ' ', cant_area[25], ' ', cant_area[26])

equipos.forEach((eq, i)=>{
  
  posin='right' //right si los backbone van al medio
  posout=''

  switch (eq.area){
    case 1: posx=700
            posy=250
            color='#6C6F11'
            posin='right' //entre backbones
            posout='left'
    break;
    case 2: posx=400
            posy=area2y  
            area2y=area2y+pasoy
            color='#2494A4'

    break;  
    case 3: posx=400
            posy=area3y
            area3y=area3y+pasoy 
            color='#00A800'
    break;  
    case 4: posx=400
            posy=area4y
            area4y=area4y+pasoy 
            color='#FF4848'
            posout='left'
    break;  
    case 5: posx=100
            posy=area5y
            area5y=area5y+pasoy 
            color='#FF4848'
    break;  
    case 6: posx=400
            posy=area6y
            area6y=area6y+pasoy 
            color='#FF8000' 
    break;  
    case 21:  posx=1000
              posy=250
              color='#6C6F11'
              posin='left' //entre backbones
              posout='right'
    break;
    case 22:  posx=1300
              posy=area2yB  
              area2yB=area2yB+pasoy
              color='#2494A4'
              posin='left'
    break;  
    case 23:  posx=1300
              posy=area3yB
              area3yB=area3yB+pasoy 
              color='#00A800'
              posin='left'
    break;  
    case 24:  posx=1300
              posy=area4yB
              area4yB=area4yB+pasoy 
              color='#FF4848'
              posin='left'
              posout='right'
    break;  
    case 25:  posx=1600
              posy=area5yB
              area5yB=area5yB+pasoy 
              color='#FF4848'
              posin='left'
    break;  
    case 26:  posx=1300
              posy=area6yB
              area6yB=area6yB+pasoy 
              color='#FF8000' 
              posin='left'
    break;
    default: console.log('No esta definida el area para realizar el dibujo')  
    
  }

  console.log(draweq)

draweq.push({
    id: eq.id, type: 'Botones', sourcePosition: 'right', targetPosition: 'left',data: { color: color, equipo: eq.equipo, posin: posin, posout: posout},position: { x: posx, y: posy }, style: { background: color}
  })
})

conexiones.forEach((con, i)=>{
  draweq.push({ id: con.ids+'-'+con.idt, source: con.ids, target: con.idt, type: 'smoothstep' }) //type: 'smoothstep' , label: con.desc
})

//console.log(draweq)

 

 export default (
  draweq
  //display
);