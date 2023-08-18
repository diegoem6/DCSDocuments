const createArchitectureDevices = (arquitectura=[])=>{
  //const arquitectura =[]
  let equipos=[]
  let conexiones=[]
  if (arquitectura.nodes){
      equipos = arquitectura.nodes
      conexiones = arquitectura.connections
  }
  else{   
      //console.log("No Tiene nodos")
      return null
  }
  let draweq=[]
  let posy=0
  let posx=0

  let cName='#FFFFF'
  let posin='left'
  let posout=''

  let cant_area=[]
  let i=0
  let max_areas = -1
  equipos.forEach((eq)=>{
      if (max_areas < eq.area){
            max_areas = eq.area
      }
  })

  while (i<=max_areas) { //inicializo el contador de equipos por area
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
  
  // eslint-disable-next-line
  let color;
  //Definiendo ubicaciones de equipos A
  let xlevel0=600
  let ylevel1=0

  equipos.forEach((eq, i)=>{

      posin='right' //right si los backbone van al medio
      posout=''
      
      if(eq.level!== null){ //si tiene el campo level es porque estoy dibujando devices
            //console.log('El nivel es---: ',eq.level)
            switch (eq.level){ //elementos conectados al switch: CF9, Thin Clients, servidores 
                  case 0:     posx=xlevel0
                              xlevel0=xlevel0+250
                              posy=ylevel1 - 150
                              posin='top' // no se por que no le da bola al top
                              cName = ''
                    break;
                  case 1:     posx=400 // los devices (conexiones al CF9: C300, PGM, etc)
                              posy=ylevel1
                              ylevel1=ylevel1+230
                              xlevel0=600
                              posin='left'
                              posout='right'
                              cName = ''
                    break;
                  case 2:     posx=100 // el switch
                              posy=0 //ver si lo ubicamos en el medio (contando la cantidad de equipos de level1)
                              posout='right'
                              cName = ''
                    break;
                  default:
                    
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
            default: color='#D5B048'
      }

      //console.log("El equipo es: ", eq.node, " y El tipo es: ",eq.devicetype, " y el level es: ", eq.level)
      //Nodos
      draweq.push({
      id: eq.id, type: 'Botones', sourcePosition: 'right', targetPosition: 'left',data: { idMongo: eq.idMongo, cName: cName, equipo: eq.node, posin: posin, posout: posout, devicetype: eq.devicetype, area:eq.area, img:eq.url},position: { x: posx, y: posy }, style: { background: ''}
      })
  })

  //Conexiones
  conexiones.forEach((con, i)=>{
  draweq.push({ id: con.ids+'-'+con.idt, source: con.ids, target: con.idt, type: 'smoothstep'}) // cambiar color a la edge: , style:{stroke:'green'} 
  })

  arquitectura=[] //vacío para que la proxima vez que se vuelva a llamar desde el menu, muestre la arquitectura
  return(draweq)

}


 

 export default createArchitectureDevices;