import React, {useEffect} from 'react';
import { Box } from '@material-ui/core';
import LeidenPopup from './LeidenPopup'

import convert from './convert'

const LeidenViewer = ({tei, showInterpreted, overridingRules}) => { 
    let referenceToEpidocDiv;
    const [openPopup, setOpenPopup] = React.useState(false);
    const [popupBody, setPopupBody] = React.useState();

    const handleOpenPopup = (body) => {
        setPopupBody(body)
        setOpenPopup(true);
    };

    const handleClose = () => {
        setOpenPopup(false);
      };

    useEffect(() => {
        if (tei) {
            referenceToEpidocDiv.childNodes.forEach(child=>referenceToEpidocDiv.removeChild(child))
            const leiden = convert(tei, handleOpenPopup, showInterpreted, overridingRules)
            referenceToEpidocDiv.appendChild(leiden)
        }
      }, [tei, showInterpreted]);

    return (
        <Box m={4} textAlign="left" >
            <div ref={theElem=>referenceToEpidocDiv=theElem}/>  
            <LeidenPopup body={popupBody} open={openPopup} handleClose={handleClose}  />
        </Box>
)};

export default LeidenViewer