import React,{Fragment} from 'react';
import iocardsContext  from '../../context/iocards/iocardsContext';


const ConectionC300 = ({iocardcontroller}) => {
   
  return (
           <Fragment>
            <div className="device_div" >
                <table className="device_table">
                    <tbody className="device_table">
                        <tr>
                            <th width="25%">Nombre</th>
                            <th width="25%">Tipo</th>
                            <th width="25%">Gabinete</th>
                            <th width="25%">iO Link</th>
                        </tr>
                        <tr>
                            <td width="25%"><b>{iocardcontroller.tagname}</b></td>
                            <td width="25%">{iocardcontroller.typeDesc}</td>
                            <td width="25%">{iocardcontroller.cabinetDesc}</td>
                            <td width="25%">    {iocardcontroller.iolink === 1 ?
                                    <img alt="icon_green" src = "/img/icon_grey.svg.png" className="img_status_interface"/>
                                    : <img alt="icon_red" src = "/img/icon_yellow.svg.png" className="img_status_interface"/>
                                }
                            </td>                               
                        </tr>
                    </tbody>
                </table>
            </div>
           </Fragment>
       
  )
}

export default ConectionC300;
