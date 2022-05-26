import React from 'react'
import { imgPath } from '../utils/environments'

const Actors = ({actors}) => {

    // console.log(actors);

  return (
    <div className='actors-scroll'>
        <h1 className='actors-header'>Actors</h1>
        <ol className='actors'>
        {
            actors && actors.map((actor, i) => (
                <li key={actor.cast_id} 
                className="actors_card border-r shadow mx-2 my-4">
                    <div>
                        <img src={actor?.profile_path !== null ?
                        `${imgPath}w1280${actor?.profile_path}`
                        : 
                        'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                    } 
                        className="actors_img" alt="" />
                        <p className='actor-name px-2'>
                            {
                                actor.name
                            }
                        </p>
                        <p className='px-2'>
                            {
                                actor.character
                            }
                        </p>
                    </div>
                </li>
            ))
        }
    </ol>
    </div>
  )
}

export default Actors