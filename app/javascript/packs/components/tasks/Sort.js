import React, {useState} from 'react'

const SortTitle = (props) => {
  const {current, sortHandle, label, setLabel} = props
  let currentLabel = ''
  if (current === 'title') {currentLabel=label}
  return (
    <button onClick={()=>sortHandle('title')}>Title ({currentLabel})</button>
  )
}

const SortPriority = (props) => {
  const {current, sortHandle, label, setLabel} = props
  let currentLabel = ''
  if (current === 'priority') {currentLabel=label}
  return (
    <button onClick={()=>sortHandle('priority')}>Priority ({currentLabel})</button>
  )
}

const SortDue = (props) => {
  const {current, sortHandle, label, setLabel} = props
  let currentLabel = ''
  if (current === 'due') {currentLabel=label}
  return (
    <button onClick={()=>sortHandle('due')}>Due ({currentLabel})</button>
  )
}

export { SortTitle, SortPriority, SortDue }
