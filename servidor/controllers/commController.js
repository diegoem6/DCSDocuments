const snmp = require ("net-snmp");
const et = require("expect-telnet");
const fs = require('fs'); 
const opc = require('node-opc-da');


exports.getSNPM_Sync = async (ip, commmunity, oids) =>{
  
  function parseVarbinds(varbinds){
    let answer;

    // Parse the bvarbinds returned from the SNMP session
    if (!varbinds){
      return ""
    }
    for (var i = 0; i < varbinds.length; i++) {
      if (snmp.isVarbindError (varbinds[i])) {
          console.error (snmp.varbindError (varbinds[i]));
          
      }else {
        answer = varbinds[i].value.toString()
        session.close ();
        return answer;
      }  
    }
    
    session.close ();

    return answer;
  }  
  var session = snmp.createSession (ip, commmunity);
  // Wrapper for the SNMP Request        
  let wrapper = (oids) => {
      return new Promise(
          (resolve) => {
          session.get(oids, function ( error, varbinds ) {
              if(error){
                  response = {code:1, message: error};
              }
              resolve(varbinds);
          })
  })};

  //Calling the wrapper and parsing the varbinds received from the SNMP call
  await wrapper(oids).then(
      data => response = parseVarbinds(data)
  ).catch(
      error => {
          console.log(error);
          response = {code: 1, message: error};
      }
  );

  return response;
}

exports.getSNMP = async (ip, commmunity, oids, res)=>{
  
      //console.log(ip,"--", commmunity, "--", oids)
      //var session = snmp.createSession ("192.168.0.254", "public");
      var session = snmp.createSession (ip, commmunity);
      //session.getBulk(oids, function (error, varbinds) {
      
      session.get (oids, function (error, varbinds) {
          if (error) { 
              console.error (error);
          } else {
              for (var i = 0; i < varbinds.length; i++) {
                  if (snmp.isVarbindError (varbinds[i])) {
                      console.error (snmp.varbindError (varbinds[i]));
                  }else {
                    res.clave = "variable"
                    res.valor = varbinds[i].value.toString()
                    return res;
                  }
              }
          }
          session.close ();
      });
  }

exports.connectTelnetShow = (hostname, ip, tipo)=>{

  let comando=""
  if (tipo==="RUN"){
    comando="show run\r"
  }else if(tipo==="TECH"){
    comando="show tech\r"
  }
  
  //  et(`${ip}#:23`, [  
  et(`${ip}:23`, [
      //{expect: "Password", send: "hw.mdp.2014\r"},
      //{expect: "Username:", send: "epksadmin\r"},
      {expect: "Password:", send: "hw.mdp.2014\r"},
      {expect: `>`, send: "enable\r"},
      //{expect: "Password", send: "hw.mdp.2014\r"},
      {expect: "Password:", send: "hw.mdp.2014\r"},
      {expect: `${hostname}#` , send: "terminal length 0\r"}, //para que no compagine y no aparezca el --More--
      {expect: `${hostname}#` , send: comando},
      //{expect: "#" , send: "show run\r"},
      {expect: `${hostname}#`, out: function(output) {
        fs.writeFile(`../tagsdescriptions/public/files/${hostname}-show_${tipo}.txt`, output, function (err) {
          if (err) return console.log("ERROR: ", err);
        });
      }, send: "\r"},
      
    ], function(err) {
      if (err) console.error(err);
    });
}
exports.connectTelnetShowTech = (hostname, ip)=>{
 
  et(`${ip}:23`, [
      {expect: "#" , send: "show tech\r"},
      {expect: `${hostname}#`, out: function(output) {
        fs.writeFile('../tagsdescriptions/public/files/show_tech.txt', output, function (err) {
          if (err) return console.log(err);
        
        });
        
      }, send: "exit\r"},

    ], function(err) {
      if (err) console.error(err);
    });
  
}

exports.getOPC = async(ip, domain, user, pass, clsid, opc_route)=>{
  //const clsid='6031BF75-9CF2-11d1-A97B-00C04FC01389' 
   //variables = await opc.createServer('192.168.217.130', 'WORKGROUP', 'mngr', 'HoneywellMNGR', '6031BF75-9CF2-11d1-A97B-00C04FC01389', '')
    const variables = await opc.createServer(ip, domain, user, pass, clsid, '')
    const {comServer, opcServer} = variables 

    let opcBrowser = await opcServer.getBrowser();

    let opcGroup = await opcServer.addGroup('GRUPO_OPC', '')

    let opcItemManager = await opcGroup.getItemManager();
    //console.log(opcItemManager)
    let clientHandle=1
    
    //const listaItem=['ASSETS/PRUEBA/POIANA1.PV','ASSETS/PRUEBA/ALTURA.PV']
    const listaItem = opc_route
    //console.log (listaItem)
    let itemsList=[]
    for (let i = 0; i < listaItem.length; i++) {
      itemsList[i]={
        itemID: listaItem[i],
        clientHandle: i+1
      }
    }

    let resAddItems = await opcItemManager.add(itemsList);
    //console.log(resAddItems)
    
    opcItemManager.validate(itemsList);

    //LEO EL GRUPPO:
    let serverHandles=[]
    for (let i = 0; i < resAddItems.length; i++) {
      const resItem = resAddItems[i];
      const item = itemsList[i];

      if (resItem[0] !== 0) {
          return null
          //node.error(`Error adding item '${itemsList[i].itemID}': ${errorMessage(resItem[0])}`);
      } else {
          serverHandles.push(resItem[1].serverHandle);
      }
    }
    
    
    let opcSyncIO = await opcGroup.getSyncIO();
    
    let resultado=await opcSyncIO.read(opc.constants.opc.dataSource.DEVICE, serverHandles)//.then(cycleCallback).catch(cycleError);
    
    for (let i = 0; i < resAddItems.length; i++) {
      const resItem = resAddItems[i];
      if (resItem[0] !== 0) {
        //console.log ("El resitem es: ",resItem)
        return null //node.error(`Error adding item '${itemsList[i].itemID}': ${errorMessage(resItem[0])}`);
      } else {
        resultado[i].itemID = resItem[1].itemID
      }
    }
    //console.log("El resultado es", resultado)
    return resultado

}