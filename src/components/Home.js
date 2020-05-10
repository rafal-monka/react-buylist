import React from "react";

const Home = () => {
    return (
        <div>
            <h4>Prepare and buy reasonably</h4>
            <pre>{JSON.stringify(process.env, null, 3)}</pre>
        </div>
    )
}

export default Home;