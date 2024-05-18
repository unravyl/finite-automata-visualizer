'use client'

import React, { useState } from 'react'
import SyntaxTree from '../classes/SyntaxTree'

export default function Page() {
  const [regex, setRegex] = useState<string>('')

  const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegex(e.target.value)
  }

  const handleGenerateSyntaxTreeButton = (inputString: string) => {
    const syntaxTree = new SyntaxTree(inputString)
    console.log(syntaxTree.generateSyntaxTree())
  }

  return <div>
    <input type="text" value={regex} onChange={e => handleRegexInputChange(e)}/>
    <button onClick={() => handleGenerateSyntaxTreeButton(regex)}>Generate</button>
  </div>
  }