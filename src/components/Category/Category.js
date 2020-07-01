import React from 'react'
import classes from './Category.module.css'
import {    faBrain, faFilm, faTheaterMasks, faMask, faTv, faGamepad, 
            faChess, faDragon, faPencilAlt, faLeaf, faLaptopCode, 
            faSquareRootAlt, faTabletAlt, faFutbol, faGlobeEurope, 
            faLandmark, faFeatherAlt, faPalette, faStar, 
            faPaw, faCarSide, faMusic, faBook, faBookDead} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Categories from './Categories/Categories'

const category = (props) => {
    let icon = null
    switch(decodeURIComponent(props.category)){
        case Categories.GENERAL_KNOWLEDGE: icon = faBrain; break;
        case Categories.ENTERTAINMENT_BOOKS: icon = faBook; break;
        case Categories.ENTERTAINMENT_FILM: icon = faFilm; break;
        case Categories.ENTERTAINMENT_MUSIC: icon = faMusic; break;
        case Categories.ENTERTAINMENT_MUSICALS_THEATRES: icon = faTheaterMasks; break;
        case Categories.ENTERTAINMENT_TELEVISION: icon = faTv; break;
        case Categories.ENTERTAINMENT_VIDEO_GAMES: icon = faGamepad; break;
        case Categories.ENTERTAINMENT_BOARD_GAMES: icon = faChess; break;
        case Categories.ENTERTAINMENT_COMICS: icon = faMask; break;
        case Categories.ENTERTAINMENT_ANIME_MANGA: icon = faBookDead; break;
        case Categories.ENTERTAINMENT_CARTOON: icon = faPencilAlt; break;
        case Categories.SCIENCE_NATURE: icon = faLeaf; break;
        case Categories.SCIENCE_COMPUTERS: icon = faLaptopCode; break;
        case Categories.SCIENCE_MATH: icon = faSquareRootAlt; break;
        case Categories.SCIENCE_GADGETS: icon = faTabletAlt; break;
        case Categories.MYTHOLOGY: icon = faDragon; break;
        case Categories.SPORTS: icon = faFutbol; break;
        case Categories.GEOGRAPHY: icon = faGlobeEurope; break;
        case Categories.HISTORY: icon = faFeatherAlt; break;
        case Categories.POLITICS: icon = faLandmark; break;
        case Categories.ART: icon = faPalette; break;
        case Categories.CELEBRITIES: icon = faStar; break;
        case Categories.ANIMALS: icon = faPaw; break;
        case Categories.VEHICLES: icon = faCarSide; break;
        default: icon = faBrain; break;
    }



    return (
        <div className={classes.Category}>
            {decodeURIComponent(props.category)}
                <div className={classes.Icon}>
                    <FontAwesomeIcon icon={icon} />
                </div>
        </div>

    )
}

export default category
