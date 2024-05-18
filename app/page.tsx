'use client'

import React, { useState } from 'react'
import Parser from '../classes/Parser'
import { computeFunctions, calculateFollowpos } from '../utils/dfa'
import DFADiagram from '../components/DFADiagram'

export default function Page() {
  const [regex, setRegex] = useState<string>('')
  const [followPos, setFollowPos] = useState<Map<number,number[]> | null>(new Map([
    [1,[1,2,3]],
    [2,[1,2,3]],
    [3,[4]],
    [4,[5]],
    [5,[6]]
  ]))

  const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegex(e.target.value)
  }

  const generateDFA = (inputString: string) => {
    const parser = new Parser()
    const ast = parser.produceAST(inputString)
    computeFunctions(ast.body)
    setFollowPos(calculateFollowpos(ast.body))
  }

  return (
    <div>
      <input type="text" value={regex} onChange={e => handleRegexInputChange(e)}/>
      <button onClick={() => generateDFA(regex)}>Generate</button>
      {followPos && <div>
        <h2>Nodes:</h2>
        <ul>
          {Array.from(followPos).map(([key, values]) => (
            <li key={key}>
              {key}: {values.join(", ")}
            </li>
          ))}
        </ul>

        <DFADiagram followpos={followPos}/>
        </div>}
    </div>
  )
}