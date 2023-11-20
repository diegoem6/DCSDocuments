// ModalCard.js
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SunEditor,{buttonList} from 'suneditor-react';
const ModalCard = ({ isOpen, toggle, tagdescriptor }) => {
    //console.log(tagdescriptor)
    const {description} = tagdescriptor;
  return (
    
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} ><h3>Tag Descriptor: {tagdescriptor.tagname}</h3> </ModalHeader>
      <ModalBody>
        <SunEditor 
            placeholder="descripción del tag"
            name="description"
            setOptions={{
                height: 300,
                buttonList: buttonList.complex 
            }}
            disable={true}
            setContents ={description}
            showToolbar={false}
        />
        {/*tagdescriptor.description*/}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
    
  );
};

export default ModalCard;