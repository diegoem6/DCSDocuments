const snmp = require ("net-snmp");
const et = require("expect-telnet");
const fs = require('fs'); 


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

  console.log('El hostname es:', hostname, ' y la ip es ', ip)
  let comando=""
  if (tipo==="RUN"){
    comando="show run\r"
  }else if(tipo==="TECH"){
    comando="show tech\r"
  }
  //  et(`${ip}#:23`, [  
  et(`${ip}:23`, [
      //{expect: "Password", send: "hw.mdp.2014\r"},
      {expect: "Password", send: "Honeywell1\r"},
      {expect: ">", send: "enable\r"},
      //{expect: "Password", send: "hw.mdp.2014\r"},
      {expect: "Password", send: "Honeywell1\r"},
      {expect: "#" , send: "terminal length 0\r"}, //para que no compagine y no aparezca el --More--
      {expect: "#" , send: comando},
      //{expect: "#" , send: "show run\r"},
      {expect: `${hostname}#`, out: function(output) {
        fs.writeFile(`../tagsdescriptions/public/files/${hostname}-show_${tipo}.txt`, output, function (err) {
          if (err) return console.log(err);
          console.log('Terminó SHOW ', comando, '---');
          return(`${hostname}-show_${tipo}.txt`) // devuelvo el nombre del archivo
        });
        //console.log(output);
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
          console.log('Terminó SHOW TECH...');
        });
        console.log(output);
      }, send: "exit\r"},

    ], function(err) {
      if (err) console.error(err);
    });
  
}