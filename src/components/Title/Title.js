import React from 'react'
import classes from './Title.module.css'
import AuxContainer from '../../hoc/AuxContainer/AuxContainer'
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const title = (props) => {
    return (
        <AuxContainer>
            <div className={classes.Logo}>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
            <div className={classes.LogoTitle}>
                Quiz App
            </div>
            <div className={classes.Title}>
                {props.children}
            </div>
        </AuxContainer>

    )
}

export default title
