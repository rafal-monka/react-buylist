import React from "react";

const Home = () => {
    return (
        <div>
            <h4>Prepare and buy reasonably</h4>
            <span>{JSON.stringify(process.env, null, 3)}</span>
        </div>
    )
}

export default Home;