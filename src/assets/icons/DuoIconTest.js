import React from "react";
import DuoIcon from '../IconLibrary/DuoIcon';
import Icon from "../IconLibrary/Icon";

class DuoIconTest extends React.Component {

    constructor() {
        super();
        this.state = {
            DuoIconItemList: ['image_folder', 'audio_folder', 'audio_open_folder', 'image_open_folder', 'image', 'audio', 'audio1','training','testing','validation'],
            IconList: ['audio_play', 'speaker','playback_speed','audio_download','kafka','arithmetic_plus','upload_image','drop_image','drop_audio','audio','audio_preprocessing']
        }
    }

    render() {
        return (
            <div style={{margin: '100px', columnGap: '30px', display: 'flex'}}>
                {
                    this.state.DuoIconItemList.map(Colors =>
                        <button style={{
                            display: 'flex',
                            justifyContents: 'center',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            padding: '5px'
                        }}>
                            <DuoIcon name={Colors} size={24}/>
                        </button>
                    )
                }
                {
                    this.state.IconList.map(list =>
                        <button style={{
                            display: 'flex',
                            justifyContents: 'center',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            padding: '5px',
                            fill:'var(--primary-color)'
                        }}>
                            <Icon icon={list} size={24}/>
                        </button>
                    )
                }

            </div>
        )
    }
}

export default DuoIconTest;

{/*<div style={{margin:'100px',columnGap:'30px',display:'flex'}}>*/
}
{/*    {*/
}
{/*        this.state.DuoIconItemList.map(Colors=>*/
}
{/*                    <DuoIcon name={Colors} size={70}/>*/
}
{/*        )*/
}
{/*    }*/
}
{/*    /!*{*!/*/
}
{/*    /!*    this.state.IconList.map(list=>*!/*/
}
{/*    /!*        <Icon icon={list} size={18}/>*!/*/
}
{/*    /!*    )*!/*/
}
{/*    /!*}*!/*/
}
{/*    */
}
{/*</div>*/
}