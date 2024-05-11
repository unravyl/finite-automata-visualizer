'use client'

import React, { useState } from 'react'
import RegularExpression from '../classes/RegularExpression'

export default function Page() {
  const [regex, setRegex] = useState<string>('')

  const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegex(e.target.value)
  }

  const handleGenerateSyntaxTreeButton = (regex_value: string) => {
    const regex = new RegularExpression(regex_value)
    console.log(regex.value)
    const tree = regex.generateSyntaxTree()
    console.log(tree)
  }

  return <div>
    <input type="text" value={regex} onChange={e => handleRegexInputChange(e)}/>
    <button onClick={() => handleGenerateSyntaxTreeButton(regex)}>Generate</button>
  </div>
  }