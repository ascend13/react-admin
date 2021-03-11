import React, { useEffect } from 'react';
import api from '../api/api'

const Test = () => {
    useEffect(() => {
        api.test()
    }, [])
    return (
        <div>测试一下1111111</div>
    )
}

export default Test;