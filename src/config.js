import React from 'react'
let env = 'prod';

let config = {
    prod: {
        base_url: 'https://smart-driver.herokuapp.com'
    },
    local: {
        base_url: 'http://localhost:3000'
    },
   
}

if(env === 'prod'){
    config = config.prod

}

else if(env ==='local'){
    config = config.local
}

export default config;







