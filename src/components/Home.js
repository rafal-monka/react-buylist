import React from "react";

const Home = () => {
    return (
        <div>
            <h4>Be prepared, do the shopping.</h4>
            <pre>{JSON.stringify(process.env, null, 3)}</pre>
        </div>
    )
}

export default Home;