const createArchitecture = (arquitectura=[])=>{
  //const arquitectura =[]
  let equipos=[]
  let conexiones=[]
  let item = {}
  if (arquitectura.nodes){
      //console.log("Tiene nodos")
      equipos = arquitectura.nodes
      conexiones = arquitectura.connections
  }
  else{   
      console.log("NO Tiene nodos")
      //equipos = arquitectura.nodes
      //conexiones = arquitectura.connections
      /*equipos=[{id: 1, node: "PMSWSY001A", area: 1}, {id:3, node: "PMSWSY011A", area: 3}, {id:4, node: "PMSWSY021A", area: 3}, {id:5, node: "PMSWSE031A", area: 4}, {id:6, node: "PMSWSE111A", area: 6}, {id:7, node: "PMSWSE211A", area: 6}, {id:8, node: "PMSWSE221A", area: 2}, {id:9, node: "PMSWSE221A", area: 2}, {id:10, node: "PMSWSY251A", area: 2}, {id:11, node: "PMSWSY402A", area: 6}, {id:12, node: "PMSWSE231A", area: 5}, {id:13, node: "PMSWSE131A", area: 5}, 
               {id: 21, node: "PMSWSY001B", area: 21}, {id:23, node: "PMSWSY011B", area: 23}, {id:24, node: "PMSWSY021B", area: 23}, {id:25, node: "PMSWSE031B", area: 24}, {id:26, node: "PMSWSE111B", area: 26}, {id:27, node: "PMSWSE211B", area: 26}, {id:28, node: "PMSWSE121B", area: 22}, {id:29, node: "PMSWSE221B", area: 22}, {id:30, node: "PMSWSY251B", area: 22}, {id:31, node: "PMSWSY402B", area: 26}, {id:32, node: "PMSWSE231B", area: 25}, {id:33, node: "PMSWSE131B", area: 25}]
      conexiones=[{ids:1, idt:3, desc: "Puerto 2-1"},{ids:1, idt:4, desc: "Puerto 3-1"},{ids:1, idt:5, desc: "Puerto 4-1"},{ids:1, idt:6, desc: "Puerto 5-1"},{ids:1, idt:7, desc: "Puerto 6-1"},{ids:1, idt:8, desc: "Puerto 7-1"},{ids:1, idt:9, desc: "Puerto 8-1"},{ids:1, idt:10, desc: "Puerto 9-1"},{ids:1, idt:11, desc: "Puerto 10-1"}, {ids:5, idt:12, desc: "Puerto 1-1"}, {ids:5, idt:13, desc: "Puerto 2-1"},
                  {ids:1, idt:21, desc: "Puerto TBD"},{ids:21, idt:23, desc: "Puerto 2-1"},{ids:21, idt:24, desc: "Puerto 3-1"},{ids:21, idt:25, desc: "Puerto 4-1"},{ids:21, idt:26, desc: "Puerto 5-1"},{ids:21, idt:27, desc: "Puerto 6-1"},{ids:21, idt:28, desc: "Puerto 7-1"},{ids:21, idt:29, desc: "Puerto 8-1"},{ids:21, idt:30, desc: "Puerto 9-1"},{ids:21, idt:31, desc: "Puerto 10-1"}, {ids:25, idt:32, desc: "Puerto 1-1"}, {ids:25, idt:33, desc: "Puerto 2-1"}]*/
      return null
  }
  let draweq=[]
  let posy=0
  let posx=0

  let color='#FFFFF'

  let cName='#FFFFF'
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

  const pasoy=120
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

  let xlevel0=600
  let pasolevelx=200
  let ylevel1=0
  
  //console.log(equipos)
  equipos.forEach((eq, i)=>{

  posin='right' //right si los backbone van al medio
  posout=''
  
  //console.log("El area es ", eq.area)
  switch (eq.area){
  case 1: posx=700
        posy=250
        //color='#6C6F11'
        posin='right' //entre backbones
        posout='left'
        cName = 'architecture_node_rackroom'
  break;
  case 2: posx=400
        posy=area2y  
        area2y=area2y+pasoy
       // color='#2494A4'
       cName = 'architecture_node_recovery'

  break;  
  case 3: posx=400
        posy=area3y
        area3y=area3y+pasoy 
       // color='#00A800'
       cName = 'architecture_node_rackroom'
  break;  
  case 4: posx=400
        posy=area4y
        area4y=area4y+pasoy 
        //color='#FF4848'
        posout='left'
        cName = 'architecture_node_dryer'
  break;  
  case 5: posx=100
        posy=area5y
        area5y=area5y+pasoy 
        //color='#FF4848'
        cName = 'architecture_node_dryer'
  break;  
  case 6: posx=400
        posy=area6y
        area6y=area6y+pasoy 
        //color='#FF8000' 
        cName = 'architecture_node_fiber'
  break;  
  case 21:  posx=1000
          posy=250
          //color='#6C6F11'
          posin='left' //entre backbones
          posout='right'
          cName = 'architecture_node_rackroom'
  break;
  case 22:  posx=1300
          posy=area2yB  
          area2yB=area2yB+pasoy
          //color='#2494A4'
          posin='left'
          //posout='right' //agregue
          cName = 'architecture_node_recovery'
  break;  
  case 23:  posx=1300
          posy=area3yB
          area3yB=area3yB+pasoy 
          //color='#00A800'
          posin='left'
          //posout='right' //agregue
          cName = 'architecture_node_rackroom'
  break;  
  case 24:  posx=1300
          posy=area4yB
          area4yB=area4yB+pasoy 
          //color='#FF4848'
          posin='left'
          posout='right'
          cName = 'architecture_node_dryer'
  break;  
  case 25:  posx=1600
          posy=area5yB
          area5yB=area5yB+pasoy 
          //color='#FF4848'
          posin='left'
          //posout='right' //agregue
          cName = 'architecture_node_dryer'
  break;  
  case 26:  posx=1300
          posy=area6yB
          area6yB=area6yB+pasoy 
          //color='#FF8000' 
          posin='left'
          cName = 'architecture_node_fiber'
          //posout='right' //agregue
  break;
  default: console.log('No esta definida el area para realizar el dibujo')  
  }
  
  if(eq.level!== null){ //si tiene el campo level es porque estoy dibujando devices
      //console.log('El nivel es---: ',eq.level)
      switch (eq.level){ //el switch:
            case 0:     posx=xlevel0
                        xlevel0=xlevel0+200
                        posy=ylevel1 - 100
                        posin='top' // no se por que no le da bola al top
                        cName = ''
            break;
            case 1:     posx=400
                        posy=ylevel1
                        ylevel1=ylevel1+180
                        xlevel0=600
                        posin='left'
                        posout='right'
                        cName = ''
            break;
            case 2:     posx=100
                        posy=0 //ver si lo ubicamos en el medio (contando la cantidad de equipos de level1)
                        posout='right'
                        cName = ''
            break;
      }
  }

  switch (eq.devicetype){
      case 'CF9': color='#4EA235'
      break;
      case 'C300': color='#1862CC'
      break;  
      case 'PGM': color='#7974CC'
      break;
      case 'FDAP': color='#D5B048'
      break;
      //default: color='#D5B048'
  }

  //console.log("El equipo es: ", eq.node, " y El tipo es: ",eq.devicetype, " y el level es: ", eq.level)
  //Nodos
  draweq.push({
  id: eq.id, type: 'Botones', sourcePosition: 'right', targetPosition: 'left',data: { cName: cName, equipo: eq.node, posin: posin, posout: posout, devicetype: eq.devicetype, area:eq.area, img:eq.url},position: { x: posx, y: posy }, style: { background: ''}
  })
  })

  //Conexiones
  conexiones.forEach((con, i)=>{
  draweq.push({ id: con.ids+'-'+con.idt, source: con.ids, target: con.idt, type: 'smoothstep' }) //type: 'smoothstep' , label: con.desc
  })

  arquitectura=[] //vacío para que la proxima vez que se vuelva a llamar desde el menu, muestre la arquitectura
  return(draweq)

}



//console.log(draweq)

 

 export default createArchitecture;