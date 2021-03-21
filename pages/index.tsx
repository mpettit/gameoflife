import React from "react"
import { useRouter } from 'next/router'
import { Button } from "antd";

export default function StartMenu(): JSX.Element {

    const router = useRouter();

    function startGame() {
        router.push("/gameoflife");
    }

    return (<div>
        <h1>Start Menu</h1>
        <Button type="primary" shape="round" onClick={() => startGame()}>
          Start
        </Button>
    </div>)
}