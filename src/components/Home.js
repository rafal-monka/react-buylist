import React from "react";

const Home = () => {
    return (
        <div>
            <h4>Do the shopping being prepared</h4>
            <pre>{JSON.stringify(process.env, null, 3)}</pre>
        </div>
    )
}

export default Home;