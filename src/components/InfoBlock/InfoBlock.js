import React, { useState } from 'react';

const InfoBlock = ({text='sey Hello World!', classIs}) =>{

    const [value, setValue] = useState('sey Hello World!');

    return (
        <h1 className={classIs}>{text}</h1>
    )

}

export default InfoBlock;