
exports.findServer=(TAG) => {
    const area=parseInt(TAG.substring(0, 3),10);
    //let servidor;
    if ((area<200) || (area==403) || (area==402) || (area==600)){
        //console.log('PMCLS001');
        return ('10.11.2.101');
    }
    else if ((area<250) && (area>=200)){
        //console.log('PMCLS005');
        return ('10.11.2.114');
    }
    else if (area>250){
        //console.log('PMCLS006');
        return ('10.11.2.109');        
    }
    else{
        return;    
    }
}
