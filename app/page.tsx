'use client'

import React, { useState } from 'react'
import Parser from '../classes/Parser'
import { computeFunctions, calculateFollowpos } from '../utils/dfa'

export default function Page() {
  const [regex, setRegex] = useState<string>('')
  const [followPos, setFollowPos] = useState(new Map)

  const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegex(e.target.value)
  }

  const generateDFA = (inputString: string) => {
    const parser = new Parser()
    const ast = parser.produceAST(inputString)
    computeFunctions(ast.body)
    setFollowPos(calculateFollowpos(ast.body))
  }

  return <div>
    <input type="text" value={regex} onChange={e => handleRegexInputChange(e)}/>
    <button onClick={() => generateDFA(regex)}>Generate</button>
    <h2>Nodes:</h2>
      <ul>
        {Array.from(followPos).map(([key, values]) => (
          <li key={key}>
            {key}: {values.join(", ")}
          </li>
        ))}
      </ul>
  </div>
  }