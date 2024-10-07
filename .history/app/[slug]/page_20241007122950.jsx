import React from 'react'
import EditTask from './task-edit/EditTask'

export default function page({ params ,}) {
  return (
   <>
   <EditTask params={params}/>
   </>
  )
}
