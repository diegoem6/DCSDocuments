/*Dibuja la arquitectura*/ 

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



const createArchitectureDevices = ()=>{

  
  const equipos=[{id: 1, equipo: "PMSWSY011A", area: 1}, {id:3, equipo: "FX2HOST1", area: 2}, {id:4, equipo: "FX2HOST2", area: 2}, {id:5, equipo: "354CF01A", area: 2}, {id:6, equipo: "403CF01A", area: 2}, {id:7, equipo: "406CF01A", area: 2}, {id:8, equipo: "600CF01A", area: 2}, {id:9, equipo: "HEAT TRACING 600", area: 2}, {id:10, equipo: "FLEX STATION", area: 2}, {id:11, equipo: "FLEX STATION", area: 2}, {id:12, equipo: "EVA", area: 2}, {id:13, equipo: "FLEX STATION", area: 2}, 
  {id:14, equipo: "HEAT TRACING 401", area: 2}, {id:15, equipo: "AAM - PMCLS014", area: 2}]

  const conexiones=[{ids:1, idt:3, desc: "Puerto 2-1"},{ids:1, idt:4, desc: "Puerto 3-1"},{ids:1, idt:5, desc: "Puerto 4-1"},{ids:1, idt:6, desc: "Puerto 5-1"},{ids:1, idt:7, desc: "Puerto 6-1"},{ids:1, idt:8, desc: "Puerto 7-1"},{ids:1, idt:9, desc: "Puerto 8-1"},{ids:1, idt:10, desc: "Puerto 9-1"},{ids:1, idt:11, desc: "Puerto 10-1"}, {ids:1, idt:12, desc: "Puerto 1-1"}, {ids:1, idt:13, desc: "Puerto 2-1"}, {ids:1, idt:14, desc: "Puerto 2-1"}, {ids:1, idt:15, desc: "Puerto 2-1"}]

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

  // console.log(area2y, ' ',area3y, ' ',area4y, ' ',area5y, ' ',area6y, ' ',)
  // console.log(area2yB, ' ',area3yB, ' ',area4yB, ' ',area5yB, ' ',area6yB, ' ',)
  // console.log(cant_area[1], ' ', cant_area[2], ' ', cant_area[3], ' ', cant_area[4], ' ', cant_area[5], ' ', cant_area[6])
  // console.log(cant_area[21], ' ', cant_area[22], ' ', cant_area[23], ' ', cant_area[24], ' ', cant_area[25], ' ', cant_area[26])

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

  return(draweq)

}



//console.log(draweq)

 

 export default createArchitectureDevices;